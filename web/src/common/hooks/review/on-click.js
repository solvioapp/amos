import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, fields, setOneValid} = props,

  addOnClick = (field, key) => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
    setOneValid (key) (true)
  },

  /* eslint-disable no-shadow */
  onClick = H.map (addOnClick) (fields)

  return R.merge ({onClick}) (props)
}

export default onClick