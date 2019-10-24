import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, setOneValid, onSubmit} = props,

  // onEnt = H.navto (`/t/${topic}`)
  onEnt = (field) => (key) => (t) => {
    const val = form && form.getValues (field)
    t === `SUBMIT` || R.isEmpty (val[field])
      ? onSubmit.next
        ? onSubmit.next()
        : onSubmit.finish()
      : form.setValue (field, t) || setOneValid (key) (true)
  }

  return R.merge ({onEnt}) (props)
}

export default onClick