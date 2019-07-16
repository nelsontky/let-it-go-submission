import React from 'react';

class Panorama extends React.Component {
  componentDidMount() {
    this.viewer = window.pannellum.viewer('panorama', {
      type: 'equirectangular',
      panorama: this.props.url,
      vaov: 45,
      maxPitch: 0,
      minPitch: 0,
      autoLoad: true,
    });
  }

  componentWillUnmount() {
    this.viewer.destroy();
  }

  render() {
    return (
      <div>
        <div id="panorama" style={{width: '100%', height: 200}} />
      </div>
    );
  }
}

export default Panorama;
