import {R, H, React} from 'common'

const

/**
 * @description adds onClick and onEnt
 */
addOnClick = C => (props) => {
  const

  {topic, form, fields} = props,

  /* eslint-disable no-shadow */
  addOnClick = field => ({currentTarget: {textContent: t}}) => {
    form.setValue (fields[field], t)
  },

  onClick = R.map (addOnClick) (fields),

  onEnt = H.navto (`/t/${topic}`),
  forwardProps = R.merge ({onClick, onEnt}) (props)

  return <C {...forwardProps} />
}

export default addOnClick