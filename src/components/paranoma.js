import React from "react"

class Paranoma extends React.Component {
  componentDidMount() {
    window.pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: this.props.paranomaUrl,
      vaov: 45,
      maxPitch: 0,
      minPitch: 0,
      autoLoad: true,
    })
  }

  render() {
    return (
      <div>
        <div id="panorama" style={{ width: "100%", height: 200 }} />
      </div>
    )
  }
}

export default Paranoma
