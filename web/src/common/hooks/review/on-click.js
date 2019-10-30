import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, fields, setOneValid} = props,

  addOnClick = (field, key) => (e, _key, name) => {
    const {currentTarget: {textContent: t}} = e
    H.isNilOrEmpty (t)
      ? do {
        /* It's a checkbox */
        name === `strength`
          ? do {
            const {prerequisite: {level}} = form.getValues ({nest: true})
            H.isNotNilOrEmpty (level) && setOneValid (_key) (true)
          }
          : do {
            const {prerequisite: {strength}} = form.getValues ({nest: true})
            H.isNotNilOrEmpty (strength) && setOneValid (_key) (true)
          }
      }
      : do {
        /* It's a dropdown */
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
      }
  },

  /* eslint-disable no-shadow */
  onClick = H.map (addOnClick) (fields)

  return R.merge ({onClick}) (props)
}

export default onClick