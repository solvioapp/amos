import {R, H, React} from 'common'

const

/**
 * @description adds onChange
 */
onChange = C => (props) => {
  const

  {topic, form, fields} = props,

  /* eslint-disable no-shadow */
  onChange = field => ({currentTarget: {textContent: t}}) => {
    form.setValue (field, t)
  },

  onClick = R.map (onChange) (fields),

  onEnt = H.navto (`/t/${topic}`),
  forwardProps = R.merge ({onClick, onEnt}) (props)

  return <C {...forwardProps} />
}

export default onChange