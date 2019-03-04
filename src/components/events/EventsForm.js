import React from 'react'
import MapboxAutocomplete from 'react-mapbox-autocomplete'
import ReactFilestack from 'react-filestack'
import Auth from '../../lib/Auth'

const fileStack = process.env.FILESTACK_API_KEY
const mapboxAutoComplete = process.env.MAP_BOX_TOKEN

// name, image, category, date, time, duration, lat, lng, description, max attendees, clubs(owners)

const EventsForm = ({ data, handleChange, handleSubmit, handleClubChange, errors, suggestionSelect, clubs  }) => {
  console.log(data.address)
  return (
    <div className="container">
      <div className="column is-8 is-offset-2">
        <h3 className="title has-text-centered">Organise Event</h3>
        <div className="box">
          <form onSubmit={handleSubmit}>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-info"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      result={data.name || ''}
                    />
                  </div>
                  {errors.name && <small className="help is-danger">{errors.name}</small>}
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Image</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control is-info">
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
                      buttonClass={'button is-info'}
                    />
                  </div>
                  {data.image &&<span> Imaged Uploaded</span>}

                  {errors.image && <small className="help is-danger">{errors.image}</small>}
                </div>
              </div>
            </div>





            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <textarea
                      name="description"
                      onChange={handleChange}
                      value={data.description || ''}
                      className="textarea input is-info"
                      placeholder="Let us a little bit about the club...">
                    </textarea>
                  </div>
                </div>
              </div>
            </div>





            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Date</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input is-info"
                      type="date"
                      placeholder="Date"
                      name="date"
                      onChange={handleChange}
                      value={data.date || ''}
                    />
                  </p>
                </div>
                {errors.date && <small className="help is-danger">{errors.date}</small>}
              </div>
            </div>


            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Time</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input is-info"
                      type="number"
                      name="hours"
                      value={data.hours || ''}
                      onChange={handleChange}
                      placeholder="Hours"/>
                  </p>
                </div>
                {errors.hours && <small className="help is-danger">{errors.hours}</small>}

                <div className="field">
                  <p className="control is-expanded has-icons-left has-icons-right">
                    <input
                      className="input is-info"
                      type="number"
                      name="minutes"
                      value={data.minutes || ''}
                      onChange={handleChange}
                      placeholder="Minutes" />
                  </p>
                </div>
                {errors.minutes && <small className="help is-danger">{errors.minutes}</small>}

                <div className="field">
                  <p className="control is-expanded has-icons-left has-icons-right">
                    <input
                      className="input is-info"
                      type="number"
                      placeholder="Duration"
                      name="duration"
                      onChange={handleChange}
                      value={data.duration || ''}
                    />
                  </p>
                </div>
                {errors.duration && <small className="help is-danger">{errors.duration}</small>}
              </div>
            </div>



            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Category</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="select is-fullwidth">
                    <select
                      name="category"
                      defaultValue="Please Choose..."
                      onChange={handleChange}
                      value={data.category}
                      className="input is-info"
                    >
                      <option disabled>Please Choose...</option>
                      <option value="" > Search All </option>
                      <option> Sports </option>
                      <option> Photography </option>
                      <option> Gaming </option>
                    </select>
                  </div>
                </div>
                {errors.category && <small className="help is-danger">{errors.category}</small>}
                <div className="field-label is-normal">
                  <label className="label">Club</label>
                </div>
                <div className="select is-fullwidth">
                  <select
                    name="club"
                    defaultValue="Please Choose..."
                    onChange={handleClubChange}
                    className="input is-info"
                    value={`${data.club.id},${data.club.name}`}
                  >
                    <option disabled>Please Choose...</option>
                    {clubs.map((club, i) =>
                      <option key={i} value={`${club.value},${club.label}`} > {club.label} </option>
                    )}
                  </select>
                </div>
                {errors.club && <small className="help is-danger">{errors.club}</small>}

              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Max Attendees</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input is-info"
                      type="number"
                      placeholder="Max Attendees"
                      name="max_attendees"
                      onChange={handleChange}
                      value={data.max_attendees || ''}
                    />
                  </p>
                </div>
                {errors.max_attendees && <small className="help is-danger">{errors.max_attendees}</small>}
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Location</label>
              </div>
              <div className="field-body">
                <div className="field">
                  {data.address && (
                    <MapboxAutocomplete
                      publicKey= {mapboxAutoComplete}
                      inputClass="input is-info"
                      onSuggestionSelect={suggestionSelect}
                      onchange={handleChange}
                      name="location"
                      query={`${data.address}`}
                    />
                  )}
                </div>
                {errors.address && <small>{errors.address}</small>}
              </div>
            </div>

            <div>
              <button className="button is-medium is-fullwidth is-info">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventsForm
