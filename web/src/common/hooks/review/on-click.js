import {R, H} from 'common'

const

/**
 * @description adds onClick and onEnt
 */
addOnClick = (props) => {
  const

  {form, fields, setOneValid, onSubmit} = props,

  /* eslint-disable no-shadow */
  addOnClick = (field, key) => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
    setOneValid (key) (true)
  },

  onClick = H.map (addOnClick) (fields),

  // onEnt = H.navto (`/t/${topic}`)
  onEnt = (field) => (key) => (t) => {
    const val = form.getValues (field)
    R.isEmpty (val[field])
      ? onSubmit.next
        ? onSubmit.next()
        : onSubmit.finish()
      : form.setValue (field, t) || setOneValid (key) (true)
  }
  return R.merge ({onClick, onEnt}) (props)
}

export default addOnClick