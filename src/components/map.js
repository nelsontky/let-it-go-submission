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
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      // Browser doesn't support Geolocation
      console.log('No permission');
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

    // Location button
    const self = this;
    function CenterControl(controlDiv, map) {
      // Set CSS for the control border.
      let controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.textAlign = 'center';
      controlUI.style.marginBottom = '22px';
      controlUI.style.height = '31px';
      controlUI.title = 'Click to recenter the map to location';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      let controlText = document.createElement('div');
      controlText.innerHTML = "<img src='https://i.imgur.com/raFRca2.png' />";
      controlUI.appendChild(controlText);

      // Setup the click event listeners
      controlUI.addEventListener('click', function() {
        map.setCenter(self.myLocation.getPosition());
      });
    }

    // Render the button
    let centerControlDiv = document.createElement('div');
    new CenterControl(centerControlDiv, this.map);

    centerControlDiv.index = 1;
    this.map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(
      centerControlDiv,
    );

    this.watchLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.id);
  }

  render() {
    return <div id="map" style={{width: '100%', height: '300px'}}></div>;
  }
}

export default Map;
