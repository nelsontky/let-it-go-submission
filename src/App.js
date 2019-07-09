import React from 'react';
import Map from './map';
import Layout from './components/layout';
import firebase from './utils/firebase';

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
      seperateHandicapped: false,
      hose: false,
      showerHeads: false,
      male: false,
      female: false,
      waterCooler: false,
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
      // For handicapped checkbox, have to make sure that seperateHandicapped
      // checkbox is unticked when handicapped checkbox is ticked.
      this.setState({
        [event.target.name]: value,
        seperateHandicapped: value && this.state.seperateHandicapped,
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
    // console.log(this.fileInput.current.files[0]);
    const chosenFile = this.fileInput.current.files[0];
    const picRef = this.storage.ref().child(chosenFile.name);
    picRef
      .put(chosenFile)
      .then(s => console.log('Uploaded'));
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
                name="seperateHandicapped"
                checked={this.state.seperateHandicapped}
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
            Select a paranoma image:{' '}
            <input
              type="file"
              name="paranomaPath"
              accept="image/*"
              ref={this.fileInput}
            />
          </label>
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
