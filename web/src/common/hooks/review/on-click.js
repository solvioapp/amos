import {R, H, React} from 'common'

const

/**
 * @description adds onClick and onEnt
 */
addOnClick = (props) => {
  const

  {topic, form, fields, setOneValid} = props,

  /* eslint-disable no-shadow */
  addOnClick = (field, key) => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
    setOneValid (key) (true)
  },

  onClick = H.mapIndexed (addOnClick) (fields),

  onEnt = H.navto (`/t/${topic}`)
  return R.merge ({onClick, onEnt}) (props)
}

export default addOnClick