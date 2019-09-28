import {
  React, useState, Route, Link
} from 'common'

import {Dropdown_, Select_} from './dropdown.sc.js'

const Dropdown = ({results}) => {
  const renderDropdownResources = () => {
    if (!results) return
    return results.map((result) => {
      const {name,text} = result
      console.log(result)
      return (
        <Link to={`/t/${name}`}>
          <label className="option">
            <span className="dropdown-title animated fadeIn">
              {/* <span className="label-bordered">
                <i className={faicon}></i> {(result.type == "topic") ? "Learn" : "Inspect Resource" }
              </span> */}
              {text}
            </span>
          </label>
        </Link>
      )
    })
  }

  // results =
  return (
    <Dropdown_>
      <div className='aoyue-select animated zoomIn'>
        {renderDropdownResources ()}
      </div>
    </Dropdown_>
  )
}

export default Dropdown
