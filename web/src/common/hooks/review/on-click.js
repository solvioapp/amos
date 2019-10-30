import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, fields, setOneValid} = props,

  addOnClick = (field, key) => (e, _key) => {
    /* It's a dropdown */
    const {currentTarget: {textContent: t}} = e
    form.setValue (field, t)
    H.isNotNilOrEmpty (_key)
      ? do {
        /* it's a prerequisite */
        const {prerequisite: {strength, level}} = form.getValues ({nest: true})
        H.isNotNilOrEmpty (strength) && H.isNotNilOrEmpty (level)
          && setOneValid (_key) (true)
      }
      : do {
        /* it's a topic */
        setOneValid (key) (true)
      }
  },

  /* eslint-disable no-shadow */
  onClick = H.map (addOnClick) (fields)

  return R.merge ({onClick}) (props)
}

export default onClick