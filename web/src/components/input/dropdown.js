import {
  React, useState, useEffect, Link, H
} from 'common'

import {Dropdown_} from './dropdown.sc.js'

export default ({results, onClick, link, active}) => {
  const [_active, _setActive] = useState (active)

  useEffect (() => {
    H.neq (_active) (active) && _setActive (active)
  }, [active])

  const renderResults = (result, key) => {
    const {name, text} = result

    const label = (
      /*
       * Using onMouseDown here, otherwise onBlur interferes
       * See https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
      */
      <label className='dropdown' onMouseDown={onClick} key={key}>
        <span className={_active === key && `active`}
          onMouseEnter={() => H.neq (_active) (key) && _setActive (key)}
          onMouseLeave={() => H.neq (_active) (active) && _setActive (active)}
        >
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
        {H.safeMap (renderResults) (results)}
      </div>
    </Dropdown_>
  )
}
