import {
  React, useState, Route, Link, H
} from 'common'

import {Dropdown_} from './dropdown.sc.js'

const Dropdown = ({results}) => {
  const renderResult = (result) => {
    const {name,text} = result
    console.log(result)
    return (
      <Link to={`/t/${name}`}>
        <label className="option">
          <span className="dropdown-title fadeIn">
            {text}
          </span>
        </label>
      </Link>
    )
  }

  return (
    <Dropdown_>
      <div className='aoyue-select zoomIn'>
        {H.mapIfNotNil (renderResult) (results)}
      </div>
    </Dropdown_>
  )
}

export default Dropdown
