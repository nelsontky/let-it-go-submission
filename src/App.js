import React from 'react';
import Map from './components/map';
import Layout from './components/layout';
import firebase from './utils/firebase';
import Resizer from 'react-image-file-resizer';

const uniqid = require('uniqid');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lat: 0,
      lon: 0,
      myLat: 0,
      myLon: 0,
      handicapped: false,
      separateHandicapped: false,
      hose: false,
      showerHeads: false,
      male: false,
      female: false,
      waterCooler: false,
      progress: 0,
      progressShown: false,
      error: false,
    };

    this.fileInput = React.createRef();

    this.db = firebase.firestore();
    this.storage = firebase.storage();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.updateMyLocation = this.updateMyLocation.bind(this);
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles state of input forms
  handleInputChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    if (event.target.name !== 'handicapped') {
      // Any checkbox/input that is not the handicapped checkbox, set state
      // normally.
      this.setState({
        [event.target.name]: value,
      });
    } else {
      // For handicapped checkbox, have to make sure that separateHandicapped
      // checkbox is unticked when handicapped checkbox is unticked.
      this.setState({
        [event.target.name]: value,
        separateHandicapped: value && this.state.separateHandicapped,
      });
    }
  }

  // Handles map clicks, will update lat lon field to clicked lat lon.
  handleMapClick(lat, lon) {
    this.setState({
      lat,
      lon,
    });
  }

  // Whenever geolocation code in Map component runs, myLat and myLon in local
  // state will be updated.
  updateMyLocation(myLat, myLon) {
    this.setState({
      myLat,
      myLon,
    });
  }

  // Handles click on "Set Lat Lon to current location button". Does what
  // the button says, sets Lat Lon state to that of current location.
  // (if available)
  setToCurrentLocation(event) {
    event.preventDefault();
    this.setState({
      lat: this.state.myLat,
      lon: this.state.myLon,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Ensures that file uploaded is an image. Does not work if file format
    // was changed manually but submit will still not work, just that this
    // warning will not show too.
    if (
      this.fileInput.current.files[0] == null ||
      !/image\/*/g.test(this.fileInput.current.files[0].type)
    ) {
      alert('Please make sure file uploaded is an image');
    } else {
      // Resize images to max width of 4096 to support mobile, after resizing,
      // image will be uploaded and firestore entry would be created
      Resizer.imageFileResizer(
        this.fileInput.current.files[0],
        4096,
        4096,
        'JPEG',
        70,
        0,
        blob => {
          // Show submission progress
          this.setState({progressShown: true});

          // Uploads image to firebase storage
          let uploadTask = this.storage
            .ref()
            // Names file appended with a unique id so as to prevent overwrites
            .child(uniqid(this.state.name + '-'))
            .put(blob);

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              this.setState({progress});
            },
            err => {
              this.setState({error: true});
            },
            () => {
              // Upload completed successfully
              uploadTask.snapshot.ref.getDownloadURL().then(paranomaUrl => {
                const doc = this.db
                  .collection('users')
                  // Set doc name to user uid
                  .doc(this.props.uid);

                // To get the document does not exist message away
                doc.set({uid: this.props.uid});

                doc
                  .collection('submissions')
                  .doc(this.state.name)
                  .set({
                    facilities: {
                      female: this.state.female,
                      handicapped: this.state.handicapped,
                      hose: this.state.hose,
                      male: this.state.male,
                      separateHandicapped: this.state.separateHandicapped,
                      showerHeads: this.state.showerHeads,
                      waterCooler: this.state.waterCooler,
                    },
                    lat: this.state.lat,
                    lon: this.state.lon,
                    name: this.state.name,
                    paranomaUrl,
                  })
                  .then(() => window.location.reload());
                // Should {merge: true}??? KIV
              });
            },
          );
        },
        'blob',
      );
    }
  }

  render() {
    return (
      <Layout>
        {/* Main form */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <br />

          <button onClick={this.setToCurrentLocation}>
            Set Lat Lon to current location
          </button>
          <br />

          <label>
            Lat
            <br />
            <input
              type="text"
              name="lat"
              value={this.state.lat}
              onChange={this.handleInputChange}
              style={{width: '50%'}}
            />
          </label>
          <br />

          <label>
            Lon
            <br />
            <input
              type="text"
              name="lon"
              value={this.state.lon}
              onChange={this.handleInputChange}
              style={{width: '50%'}}
            />
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="male"
              checked={this.state.male}
              onChange={this.handleInputChange}
            />
            Male{' '}
          </label>

          <label>
            <input
              type="checkbox"
              name="female"
              checked={this.state.female}
              onChange={this.handleInputChange}
            />
            Female{' '}
          </label>

          <label>
            <input
              type="checkbox"
              name="handicapped"
              checked={this.state.handicapped}
              onChange={this.handleInputChange}
            />
            Handicapped{' '}
          </label>

          {/* Show only if handicapped is selected */}
          {this.state.handicapped && (
            <label>
              <input
                type="checkbox"
                name="separateHandicapped"
                checked={this.state.separateHandicapped}
                onChange={this.handleInputChange}
              />
              Seperate Handicapped{' '}
            </label>
          )}
          <br />

          <label>
            <input
              type="checkbox"
              name="hose"
              checked={this.state.hose}
              onChange={this.handleInputChange}
            />
            Hose{' '}
          </label>

          <label>
            <input
              type="checkbox"
              name="showerHeads"
              checked={this.state.showerHeads}
              onChange={this.handleInputChange}
            />
            Shower Heads{' '}
          </label>

          <label>
            <input
              type="checkbox"
              name="waterCooler"
              checked={this.state.waterCooler}
              onChange={this.handleInputChange}
            />
            Water Cooler{' '}
          </label>
          <br />

          <br />
          <label>
            Select a paranoma image:
            <br />
            <input
              type="file"
              name="paranomaPath"
              accept="image/*"
              ref={this.fileInput}
            />
          </label>
          <br />

          <br />
          <input
            type="submit"
            disabled={
              this.state.name === '' ||
              this.state.lat === 0 ||
              this.state.lon === 0
            }
            value="Submit"
          />

          {/* Progress indicator */}
          <span>
            {this.state.progressShown &&
              ' ' + Math.floor(this.state.progress) + '%'}
          </span>

          {/* Error indicator */}
          <p>
            {this.state.error &&
              'An error occured, please refresh the page and try again'}
          </p>
        </form>

        {/* Map component, takes in 2 functions that are needed to set local
        state from child component */}
        <Map
          handleMapClick={this.handleMapClick}
          updateMyLocation={this.updateMyLocation}
        />
      </Layout>
    );
  }
}

export default App;
