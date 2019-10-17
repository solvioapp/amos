import {R, H, React} from 'common'

const

/**
 * @description adds onClick and onEnt
 */
addOnClick = C => (props) => {
  const

  {topic, form, fields} = props,

  onClick = ({currentTarget: {textContent: t}}) => {
    form.setValue (fields[0], t)
  },
  onEnt = H.navto (`/t/${topic}`),
  forwardProps = R.merge ({onClick, onEnt}) (props)

  return <C {...forwardProps} />
}

export default addOnClick