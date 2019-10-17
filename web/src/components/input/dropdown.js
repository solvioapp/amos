import {
  React, useState, Route, Link, H
} from 'common'

import {Dropdown_} from './dropdown.sc.js'

const Dropdown = ({results, onClick, link}) => {
  const renderResult = (result) => {
    const {name, text} = result
    console.log(result)

    const label = (
      <label className='dropdown' onClick={onClick}>
        <span>
          {text}
        </span>
      </label>
    )

    const optionallyWrap = (wrap) => (
      wrap ? <Link to={`/t/${name}`}> {label} </Link> : label
    )

    return (
      <>
        {optionallyWrap (link)}
      </>
    )
  }

  return (
    <Dropdown_>
      <div className='dropdown'>
        {H.mapIfNotNil (renderResult) (results)}
      </div>
    </Dropdown_>
  )
}

export default Dropdown
