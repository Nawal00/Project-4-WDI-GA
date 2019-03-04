/* global describe, it, beforeEach, before, after */
import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import UserShow from '../src/components/users/UserShow'
import { MemoryRouter, Route } from 'react-router-dom'



describe('User Show tests', () => {
  let wrapper, response

  before(done => {
    response = Promise.resolve({
      data: {
        clubs_created: [],
        clubs_following: [
          {
            category: 'Photography',
            id: 5,
            image: 'https://tinyurl.com/j2lwsjz',
            name: 'London Photography Group'
          },
          {
            category: 'Sports',
            id: 7,
            image: 'https://tinyurl.com/y5s8wns5',
            name: 'East London Five-a-Side'
          }
        ],
        created_at: '2019-03-04 11:36:48',
        email: 'mark@gmail.com',
        events_attending: [
          {
            attendees: [
              {id: 1, username: 'Mark'},
              {id: 2, username: 'Wendy'}
            ],
            category: 'Sports',
            club: {
              description: 'Friendly club to play weekly badminton on a Wednesday',
              events: [
                {
                  attendees: [
                    {id: 1, username: 'Mark'}

                  ],
                  date: '2019-02-11',
                  id: 1,
                  max_attendees: '20',
                  name: 'Badminton Club',
                  time: '14:00:00'
                },
                {
                  attendees: [
                    { id: 4, username: 'Nawal'}
                  ],
                  date: '2019-03-10',
                  id: 2,
                  max_attendees: '4',
                  name: 'Badminton Doubles',
                  time: '19:00:00'
                }
              ],
              id: 1,
              image: 'https://tinyurl.com/y2zjeusz',
              name: 'North London Badminton Club'
            },
            date: '2019-02-11',
            id: 1,
            image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F55930430%2F3256470838%2F1%2Foriginal.jpg?w=800&auto=compress&rect=258%2C0%2C2180%2C1090&s=dff8d8034e2a483f7524662d89f5e58f',
            max_attendees: '20',
            name: 'Badminton Club',
            time: '14:00:00'
          }
        ],
        events_created: [
          {
            category: 'Sports',
            date: '2019-03-15',
            id: 5,
            image: 'https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            name: 'February Five-a-Side',
            time: '14:00:00'
          },
          {
            category: 'Sports',
            date: '2019-03-18',
            id: 6,
            image: 'https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            name: 'January Five-a-Side',
            time: '14:00:00'
          }
        ],
        id: 1,
        image: 'nawal.png',
        username: 'Mark'
      }

    })

    sinon.stub(axios, 'get').returns(response)
    done()
  })

  after(done => {
    axios.get.restore()
    done()
  })


  //usersDetail
  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/users/1']}>
        <Route  path="/users/:id" component={UserShow}  />
      </MemoryRouter>

    )
    done()
  })

  it('should create the correct state', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('UserShow').state().user).to.be.an('object')
      expect(wrapper.find('UserShow').state().user.id).to.eq(1)
      done()
    })
  })

  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('Link').length).to.eq(5)
      expect(wrapper.find('figure.image img.image-cropper').prop('src')).to.eq('nawal.png')
      expect(wrapper.find('.section .container h3.title').text()).to.eq(' Mark ')
      expect(wrapper.find('.section .container h6.title').text()).to.eq('Member since: 2019 ')
      expect(wrapper.find('h4.title.is-4.has-text-dark').text()).to.eq('Clubs')
      expect(wrapper.find('.clubImage').at(0).prop('src')).to.eq('https://tinyurl.com/j2lwsjz')
      expect(wrapper.find('.clubImage').at(1).prop('src')).to.eq('https://tinyurl.com/y5s8wns5')
      expect(wrapper.find('.middle .text').at(0).text()).to.eq('London Photography Group')
      expect(wrapper.find('.middle .text').at(1).text()).to.eq('East London Five-a-Side')
      expect(wrapper.find('.section .container .title').contains(<h4>Manage Your Events</h4>))
      expect(wrapper.find('.section .container').contains(<span>Events</span>))
      expect(wrapper.find('.section .container').contains(<span>Clubs</span>))
      expect(wrapper.find('.user-club-img .image img').at(0).prop('src')).to.eq('https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
      expect(wrapper.find('.user-club-img .image img').at(1).prop('src')).to.eq('https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
      expect(wrapper.find('.text').at(0).contains(<div>February Five-a-Side</div>))
      expect(wrapper.find('.column.is-3 .user-club-img .image img').at(2).prop('src')).to.eq('/assets/images/add.png')
      expect(wrapper.find('.text').last().contains(<div>Add +</div>))

      done()
    })
  })

})
