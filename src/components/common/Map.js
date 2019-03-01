import React from 'react'
import mapboxgl from 'mapbox-gl'
// import { Link, withRouter } from 'react-router-dom'

mapboxgl.accessToken = process.env.MAP_BOX_TOKEN
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {

  componentDidMount() {
    console.log('props there on Mount', this.props)

    // Creates bounds
    const bounds = new mapboxgl.LngLatBounds()

    // MAP Component new map made
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/light-v9'
    })


    this.markers = this.props.events.map(event => {
      const { lat, lng } = event
      // const type = event.category

      bounds.extend([lng, lat])

      // Added type to be category so can be diffrent colors for Category
      const markerElement = document.createElement('DIV')
      markerElement.className = 'custom-marker'

      return new mapboxgl.Marker(markerElement)
        .setLngLat({ lat: lat, lng: lng })
        .addTo(this.map)
    })

    if(this.props.type !== 'event'){
      this.map.fitBounds(bounds, { padding: 50 })
    } else {
      const { lat, lng } = this.props.events[0]
      this.map.flyTo({
        center: { lat: lat, lng: lng },
        zoom: 15
      })
    }
    this.generatePopups()
  }

  generatePopups() {
    if(!this.props.userLocation) return false
    this.popupsGenerated = true

    this.props.events.map((event, index) => {

      const { name, image, lat, lng} = event

      //add a popup
      // NOTE: view event Link needs to be updated for heroku
      this.markers[index].setPopup(
        this.popup = new mapboxgl.Popup({offset: 20})
          .setHTML(
            `
              <div class="event-image image is-128x128">
              <img src="${image}" alt="${name}" />
              </div>
              <h4>${name}</h4>
              <a href="https://www.google.com/maps/dir/?api=1&origin=${this.props.userLocation.lat},${this.props.userLocation.lng}&destination=${lat},${lng}" target="_blank" > Directions </a>
            `)
      )
    })
  }

  render() {
    return (
      <div>
        <div className='map' ref={mapDiv => this.mapDiv = mapDiv}></div>
      </div>
    )
  }
}

export default Map
