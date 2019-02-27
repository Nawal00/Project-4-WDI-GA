import React from 'react'

const EventsForm = ({ handleChange }) => {

  return (

    <div className="field">
      <div className="control eventFormDiv is-flex">
        <label className="label is-searchform"> <strong> Explore by category </strong> </label>
        <div className="select is-rounded">
          <select
            name="category"
            onChange={handleChange}
          >
            <option> All </option>
            <option> Mums Club </option>
            <option> Sports Club </option>
            <option> Music Club </option>
            <option> Photography Club </option>
          </select>
        </div>
        <div className="field">
          <div className="control is-flex">
            <label className="label is-searchform"> <strong> Search By City </strong> </label>
            <form>
              <input name="location" className="input searchBar is-rounded" type="text" placeholder="Location" onChange={handleChange} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsForm
