/* global describe, it, beforeEach */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import EventCard from '../src/components/events/EventCard'

describe('EventCard tests', () => {

  let wrapper

  beforeEach(done => {
    const props = {
      id: 1,
      name: 'Badminton Club',
      image: 'badminton.png',
      address: 'London',
      date: '2019-03-15',
      time: '14:00:00'
    }
    wrapper = shallow(<EventCard {...props} />)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('Link').length).to.eq(1)
    expect(wrapper.find('.card').length).to.eq(1)
    expect(wrapper.find('.card-image').length).to.eq(1)
    expect(wrapper.find('.image').length).to.eq(1)
    expect(wrapper.find('.eventImage').length).to.eq(1)
    expect(wrapper.find('.card-content').length).to.eq(1)
    expect(wrapper.find('.media-left').length).to.eq(1)
    expect(wrapper.find('.media-right').length).to.eq(1)
    expect(wrapper.find('.index-span').length).to.eq(2)
    expect(wrapper.find('.index-span-p').length).to.eq(1)
    done()
  })

  it('should render the correct data', done => {
    expect(wrapper.find({ to: '/events/1' }).length).to.eq(1)
    expect(wrapper.find('img').prop('src')).to.eq('badminton.png')
    expect(wrapper.find('.card-content .media-left').contains(<p> MAR </p>))
    expect(wrapper.find('.card-content .media-left').contains(<p> 15 </p>))
    expect(wrapper.find('.card-content .media-right').contains(<h6><strong>Badminton Club</strong></h6>))
    expect(wrapper.find('.card-content .media-right').contains(<span> Monday, February 11th 2019 </span>))
    expect(wrapper.find('.card-content .media-right').contains(<span> 14:00 </span>))
    expect(wrapper.find('.index-span-p').contains(<p>London</p>))
    done()
  })
})
