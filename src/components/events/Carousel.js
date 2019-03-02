import React from 'react'
import Carousel from 'nuka-carousel'

// 1200 × 600
class Carousels extends React.Component {

  render() {
    return (
      <Carousel autoplay={true} wrapAround={true} withoutControls={true} heightMode={'first'}>
        <img src="../../assets/images/cooking.jpg" />
        <img src="../../assets/images/run.jpeg" />
        <img src="../../assets/images/together.jpg" />
      </Carousel>
    )
  }
}


export default Carousels
