import React from 'react'

const EventsForm = ({ handleChange }) => {

  return (

    <div className="columns is-multiline">
      <div className="column is-3 eventFormDiv-1">
        <div className="field">
          <div className="control">

            <label className="label"> <strong className="has-text-white"> Explore by category </strong> </label>

            <select
              className="select"
              name="category"
              onChange={handleChange}
            >
              <option> All </option>
              <option> Mums </option>
              <option> Sports </option>
              <option> Music </option>
              <option> Computer Games </option>
              <option> Photography </option>
            </select>

          </div>
        </div>
      </div>

      <div className="column is-3 eventFormDiv-2">
        <div className="field">
          <div className="control">
            <label className="label"> <strong className="has-text-white"> Search By City </strong> </label>
            <form>
              <input name="location" type="text" placeholder="Location" onChange={handleChange} />
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventsForm
