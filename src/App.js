import React from 'react';
import Map from './components/map';
import Submitted from './components/submitted';
import Layout from './components/layout';
import firebase from './utils/firebase';
import Resizer from 'react-image-file-resizer';

// Material UI imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

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

      // Fields in charge of editing.
      editing: false,
      panorama: {},
      editPanorama: false,
      editDocId: '',
    };

    this.fileInput = React.createRef();

    this.db = firebase.firestore();
    this.storage = firebase.storage();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.updateMyLocation = this.updateMyLocation.bind(this);
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

    // If user is editing submission and does not choose to reupload panorama
    if (this.state.edit && !this.state.editPanorama) {
      const doc = this.db
        .collection('userSubmissions')
        // Set doc name to user uid
        .doc(this.props.currentUser.uid);

      doc
        .collection('submissions')
        .doc()
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
          name: this.state.name.trim(),

          // Use old panorama.
          panorama: this.state.panorama,
          date: new Date(Date.now()),
          status: 'pending',
        })
        .then(() => {
          // Delete old version.
          this.db
            .collection('userSubmissions')
            // Set doc name to user uid
            .doc(this.props.currentUser.uid)
            .collection('submissions')
            .doc(this.state.editDocId)
            .delete();
        })
        .then(() => window.location.reload());
    } else {
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
        // image will be uploaded and firestore storage entry would be created.
        Resizer.imageFileResizer(
          this.fileInput.current.files[0],
          4096,
          4096,
          'JPEG',
          70,
          0,
          blob => {
            // Show submission progress.
            this.setState({progressShown: true});

            // Sets file name, file name appended with a unique id to prevent
            // overwrites.
            const fileName = `${this.state.name} - ${uniqid()}.jpeg`;

            // Uploads image to firebase storage
            let uploadTask = this.storage
              .ref()
              .child(fileName)
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
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                  const doc = this.db
                    .collection('userSubmissions')
                    // Set doc name to user uid
                    .doc(this.props.currentUser.uid);

                  // To get the document does not exist message away
                  doc.set({
                    currentUser: {
                      name: this.props.currentUser.displayName,
                      email: this.props.currentUser.email,
                      photoURL: this.props.currentUser.photoURL,
                      uid: this.props.currentUser.uid,
                    },
                  });

                  doc
                    .collection('submissions')
                    .doc()
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
                      name: this.state.name.trim(),
                      panorama: {url, fileName},
                      date: new Date(Date.now()),
                      status: 'pending',
                    })
                    .then(() => {
                      // If is editing submission, delete old version and old
                      // panorama
                      if (this.state.edit) {
                        this.db
                          .collection('userSubmissions')
                          // Set doc name to user uid
                          .doc(this.props.currentUser.uid)
                          .collection('submissions')
                          .doc(this.state.editDocId)
                          .delete();

                        // Delete old panorama
                        this.storage
                          .ref()
                          .child(this.state.panorama.fileName)
                          .delete();
                      }
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
  }

  // Handle the editing of user submitted toilets. Meant to be passed as a prop
  // into <Submitted /> component.
  handleEdit(submission, submissionId) {
    window.scrollTo(0, 0);
    this.setState({
      edit: true,
      female: submission.facilities.female,
      male: submission.facilities.male,
      handicapped: submission.facilities.handicapped,
      separateHandicapped: submission.facilities.separateHandicapped,
      showerHeads: submission.facilities.showerHeads,
      waterCooler: submission.facilities.waterCooler,
      hose: submission.facilities.hose,
      lat: submission.lat,
      lon: submission.lon,
      name: submission.name,
      panorama: submission.panorama,
      editDocId: submissionId,
    });
  }

  render() {
    // console.log(this.state);
    return (
      <Layout>
        {this.state.edit && <h6>Editing submission</h6>}
        {/* Main form */}
        <form onSubmit={this.handleSubmit}>
          {/* Toilet name input*/}
          <TextField
            label="Name"
            placeholder="Enter toilet name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="name"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
          {/* Set Lat Lon to current location button */}
          <Button onClick={this.setToCurrentLocation} variant="contained">
            Set Lat Lon to current location
          </Button>
          <br />
          {/* Lat input */}
          <TextField
            style={{marginRight: '1em'}}
            label="Latitude"
            margin="normal"
            variant="outlined"
            name="lat"
            onChange={this.handleInputChange}
            value={this.state.lat}
          />
          {/* Lon input */}
          <TextField
            label="Longitude"
            margin="normal"
            variant="outlined"
            name="lon"
            onChange={this.handleInputChange}
            value={this.state.lon}
          />
          {/* Map component, takes in 2 functions that are needed to set local
        state from child component */}
          <Map
            handleMapClick={this.handleMapClick}
            updateMyLocation={this.updateMyLocation}
          />
          <br />
          {/* Checkboxes */}
          <FormLabel component="legend">Facilities</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.male}
                  onChange={this.handleInputChange}
                  name="male"
                />
              }
              label="Male"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.female}
                  onChange={this.handleInputChange}
                  name="female"
                />
              }
              label="Female"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.handicapped}
                  onChange={this.handleInputChange}
                  name="handicapped"
                />
              }
              label="Handicapped"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.separateHandicapped}
                  onChange={this.handleInputChange}
                  name="separateHandicapped"
                  disabled={!this.state.handicapped}
                />
              }
              label="Separate Handicapped"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.hose}
                  onChange={this.handleInputChange}
                  name="hose"
                />
              }
              label="Hose"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.showerHeads}
                  onChange={this.handleInputChange}
                  name="showerHeads"
                />
              }
              label="Shower Heads"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.waterCooler}
                  onChange={this.handleInputChange}
                  name="waterCooler"
                />
              }
              label="Water Cooler"
            />
          </FormGroup>
          <br />

          {/* Present user with choice to edit Panorama image if edit 
          mode is on */}
          {this.state.edit && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editPanorama}
                    onChange={this.handleInputChange}
                    name="editPanorama"
                  />
                }
                label="Edit Panorama image"
              />
              <br />
            </div>
          )}

          <input
            type="file"
            name="paranomaPath"
            accept="image/*"
            ref={this.fileInput}
            id="contained-button-file"
            style={{display: 'none'}}
          />

          {/* Do not show upload Panorama button if in edit mode and 
          edit panorama is not chosen */}
          {(!this.state.edit || this.state.editPanorama) && (
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Select panorama image
              </Button>
              {this.fileInput.current != null &&
                this.fileInput.current.files[0] != null &&
                ` ${this.fileInput.current.files[0].name}`}
            </label>
          )}
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              this.state.name === '' ||
              this.state.lat === 0 ||
              this.state.lon === 0
            }>
            Submit
          </Button>
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

        <Submitted
          uid={this.props.currentUser.uid}
          db={this.db}
          handleEdit={this.handleEdit}
        />
      </Layout>
    );
  }
}

export default App;
