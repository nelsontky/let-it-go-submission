import React from 'react';

class Map extends React.Component {
  watchLocation() {
    if (navigator.geolocation) {
      this.id = navigator.geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.props.updateMyLocation(lat, lon);

          this.myLocation.setPosition({lat: lat, lng: lon});
          this.accuracyRadius.setCenter({lat: lat, lng: lon});
          this.accuracyRadius.setRadius(position.coords.accuracy);
        },
        () => console.log('No permission'),
      );
    } else {
      // Browser doesn't support Geolocation
      console.log('no permission');
    }
  }

  componentDidMount() {
    const NUS = {lat: 1.296675, lng: 103.776396};
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: NUS,
    });

    this.myLocation = new window.google.maps.Marker({
      position: NUS,
      map: this.map,
      icon:
        'https://raw.githubusercontent.com/nelsontky/let-it-go/master/assets/icons/locationMarker.png',
    });

    this.accuracyRadius = new window.google.maps.Circle({
      map: this.map,
      center: NUS,
      radius: 0,
      fillColor: '#00F',
      fillOpacity: 0.2,
      strokeWeight: 0,
    });

    // Click listeners
    this.map.addListener('click', e => {
      this.props.handleMapClick(e.latLng.lat(), e.latLng.lng());
      if (this.marker != null) {
        this.marker.setMap(null);
      }
      this.marker = new window.google.maps.Marker({
        position: e.latLng,
        map: this.map,
      });
    });
    this.accuracyRadius.addListener('click', e => {
      this.props.handleMapClick(e.latLng.lat(), e.latLng.lng());
      if (this.marker != null) {
        this.marker.setMap(null);
      }
      this.marker = new window.google.maps.Marker({
        position: e.latLng,
        map: this.map,
      });
    });
    this.myLocation.addListener('click', () => {
      this.props.handleMapClick(
        this.myLocation.getPosition().lat(),
        this.myLocation.getPosition().lng(),
      );
      if (this.marker != null) {
        this.marker.setMap(null);
      }
      this.marker = new window.google.maps.Marker({
        position: this.myLocation.getPosition(),
        map: this.map,
      });
    });

    this.watchLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.id);
  }

  render() {
    return <div id="map" style={{width: '100%', height: '400px'}}></div>;
  }
}

export default Map;
