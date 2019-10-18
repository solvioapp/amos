import {R, H, React} from 'common'

const

/**
 * @description adds onSelect and onEnt
 */
addOnSelect = C => (props) => {
  const

  {topic, form, fields} = props,

  /* eslint-disable no-shadow */
  addOnSelect = field => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
  },

  onSelect = R.map (addOnSelect) (fields),

  onEnt = H.navto (`/t/${topic}`),
  forwardProps = R.merge ({onSelect, onEnt}) (props)

  return <C {...forwardProps} />
}

export default addOnSelect