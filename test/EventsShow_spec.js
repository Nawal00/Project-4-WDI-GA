/* global describe, it, before, after, beforeEach */
import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import EventsShow from '../src/components/EventsShow'

describe('EventsShow tests', () => {
  let wrapper, response

  before(done => {
    response = Promise.resolve({
      data: {
        id: 1,
        name: 'badminton',
        owner: 'Ed',
        date: '24/08/2018',
        image: 'badminton.png',
        duration: '300',
        lat: '-50',
        lng: '-2',
        time: '14:00:00',
        attendees: '4',
        max_attendees: '8',
        club: 'badmin club',
        travelTime: ''
      }
    })

    sinon.stub(axios, 'get').returns(response)
    done()
  })

  after(done => {
    axios.get.restore()
    done()
  })

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/events/1']}>
        <Route path="/events/:id" component={EventsShow} />
      </MemoryRouter>
    )
    done()
  })

  it('should create the correct state', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('EventsShow').state().event).to.be.an('object')
      expect(wrapper.find('EventsShow').state().event.id).to.eq(1)
      done()
    })
  })

  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('.section .container h1.title').text()).to.eq('Cheddar')
      expect(wrapper.find('.section .container h2.subtitle').text()).to.eq('England')
      expect(wrapper.find('figure.image img').prop('src')).to.eq('cheddar.png')
      expect(wrapper.find('div.column:last-child').contains(<p>Fairly bland</p>))
      done()
    })
  })
})
