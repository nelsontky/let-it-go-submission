import React from 'react';
import Map from './map';
import Layout from './components/layout';

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
      hose: false,
      showerHeads: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.updateMyLocation = this.updateMyLocation.bind(this);
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this);
  }

  handleInputChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  }

  handleMapClick(lat, lon) {
    this.setState({
      lat,
      lon,
    });
  }

  updateMyLocation(myLat, myLon) {
    this.setState({
      myLat,
      myLon,
    });
  }

  setToCurrentLocation(e) {
    e.preventDefault();
    this.setState({
      lat: this.state.myLat,
      lon: this.state.myLon,
    });
  }

  render() {
    return (
      <Layout>
        <form>
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
              name="handicapped"
              checked={this.state.handicapped}
              onChange={this.handleInputChange}
            />
            Handicapped{' '}
          </label>

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
        <Map
          handleMapClick={this.handleMapClick}
          updateMyLocation={this.updateMyLocation}
        />
      </Layout>
    );
  }
}

export default App;
