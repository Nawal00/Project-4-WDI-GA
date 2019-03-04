import React from 'react'
import MapboxAutocomplete from 'react-mapbox-autocomplete'
import ReactFilestack from 'react-filestack'
import Auth from '../../lib/Auth'

const fileStack = process.env.FILESTACK_API_KEY
const mapboxAutoComplete = process.env.MAP_BOX_TOKEN

// name, image, category, date, time, duration, lat, lng, description, max attendees, clubs(owners)

const EventsForm = ({ data, handleChange, handleSubmit, handleClubChange, errors, suggestionSelect, clubs  }) => {
  return (
    <div className="container">
      <div className="column is-6 is-offset-3 ">
        <h3 className="title has-text-centered">Organise Event</h3>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name || ''}
                />
                {errors.name && <small className="help is-danger">{errors.name}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <ReactFilestack
                  apikey={`${fileStack}`}
                  mode={'pick'}
                  onSuccess={(res) => {
                    handleChange({
                      target: {
                        name: 'image',
                        value: res.filesUploaded[0].url
                      }})
                  }}
                  onError={(err) => console.log(err)}
                  buttonText={'Upload Image'}
                  buttonClass={'button is-dark is-rounded'}
                />
                {data.image &&<small> Imaged Uploaded</small>}
                <br/>
                {errors.image && <small className="help is-danger">{errors.image}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={data.description || ''}
                />
                {errors.description && <small className="help is-danger">{errors.description}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Date"
                  name="date"
                  onChange={handleChange}
                  value={data.date || ''}
                />
                {errors.date && <small className="help is-danger">{errors.date}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Time</label>
              <div className="control">
                <input
                  className="input"
                  type="time"
                  step="2"
                  placeholder="Time"
                  name="time"
                  onChange={handleChange}
                  value={data.time || ''}
                />
                {errors.time && <small className="help is-danger">{errors.time}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Duration (Min)</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Duration"
                  name="duration"
                  onChange={handleChange}
                  value={data.duration || ''}
                />
                {errors.duration && <small className="help is-danger">{errors.duration}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Max Attendees</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Max Attendees"
                  name="max_attendees"
                  onChange={handleChange}
                  value={data.max_attendees || ''}
                />
                {errors.max_attendees && <small className="help is-danger">{errors.max_attendees}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="category"
                    defaultValue="Please Choose..."
                    onChange={handleChange}
                    value={data.category}
                  >
                    <option disabled>Please Choose...</option>
                    <option value="" > Search All </option>
                    <option> Sport </option>
                    <option> Photography </option>
                    <option> Gaming </option>
                  </select>
                </div>
                {errors.category && <small className="help is-danger">{errors.category}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Club</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="club"
                    defaultValue="Please Choose..."
                    onChange={handleClubChange}
                  >
                    <option disabled>Please Choose...</option>
                    {clubs.map((club, i) =>
                      <option key={i} value={`${club.value},${club.label}`} > {club.label} </option>
                    )}
                    <option value="" > Search All </option>
                  </select>
                </div>
                {errors.club && <small className="help is-danger">{errors.club}</small>}
              </div>
            </div>
            <label className="label">Location</label>
            <div className="control">
              <MapboxAutocomplete
                publicKey= {mapboxAutoComplete}
                inputClass="input"
                onSuggestionSelect={suggestionSelect}
                resetSearch={false}
                onchange={handleChange}
                name="location"
                value={data.address}
              />
              {errors.location && <small>{errors.location}</small>}
            </div>
            <div>
              <button className="button is-rounded is-medium is-fullwidth is-info">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventsForm
