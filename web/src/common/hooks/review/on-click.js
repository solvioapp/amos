import {R, H} from 'common'

const

/**
 * @description adds onClick and onEnt
 */
addOnClick = (props) => {
  const

  {form, fields, setOneValid} = props,

  /* eslint-disable no-shadow */
  addOnClick = (field, key) => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
    setOneValid (key) (true)
  },

  onClick = H.map (addOnClick) (fields),

  // onEnt = H.navto (`/t/${topic}`)
  onEnt = (field) => (value) => {
    form.setValue (field, value)
    setOneValid (field) (true)
  }
  return R.merge ({onClick, onEnt}) (props)
}

export default addOnClick