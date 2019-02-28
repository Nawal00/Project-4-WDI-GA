// import React from 'react'
// import mapboxgl from 'mapbox-gl'
// mapboxgl.accessToken = process.env.MAP_BOX_TOKEN
// import 'mapbox-gl/dist/mapbox-gl.css'
//
//
//
// class RegMap extends React.Component {
//
//   componentDidMount() {
//     this.map = new mapboxgl.Map({
//       container: this.mapDiv,
//       style: 'mapbox://styles/mapbox/light-v9',
//       zoom: 13
//     })
//
//     const markerElement = document.createElement('div')
//     markerElement.className = 'All picgems'
//
//     this.marker = new mapboxgl.Marker(markerElement,{
//       draggable: true
//     })
//
//     this.marker.on('dragend', () => {
//       const [lng, lat] = this.marker.getLngLat().toArray()
//       this.props.onChange({ target: { name: 'location', value: { lng, lat } } })
//     })
//   }
//
//   componentDidUpdate() {
//
//     this.map.setCenter({
//       lng: this.props.location.lng,
//       lat: this.props.location.lat
//     })
//
//     this.marker.setLngLat({
//       lng: this.props.location.lng,
//       lat: this.props.location.lat
//     })
//       .addTo(this.map)
//
//   }
//
//
//   render() {
//     return (
//       <div>
//         <div className="map" ref={el => this.mapDiv = el}/>
//       </div>
//
//     )
//   }
// }
//
// export default RegMap
