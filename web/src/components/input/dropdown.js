import {
  React, useState, Route, Link, H
} from 'common'

import {Dropdown_} from './dropdown.sc.js'

export default ({results, onClick, link}) => {
  const renderResult = (result) => {
    const {name, text} = result
    console.log(result)

    const label = (
      /*
       * Using onMouseDown here, otherwise onBlur interferes
       * See https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
      */
      <label className='dropdown' onMouseDown={onClick}>
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
