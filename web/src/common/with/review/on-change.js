import {R, H, React} from 'common'

const

/**
 * @description adds onChange
 */
onChange = C => (props) => {
  const

  {fields} = props,

  /* Returns an array of values */
  // topics = form.watch (`topic`, [])
  /* First time using let in 2 months :) */
  // let config = {skip: true}
  [config, setConfig] = React.useState ({skip: true})
  const createOnChange = (field, key) => results => ({target: {name, value}}) => {
    [name, value] |> console.log ('onChange Fired [name,value]', #)
    setConfig ({
      key,
      field: name,
      variables: {input: [{str: value, first: 3}]},
      skip: false
    })
  },

  /* eslint-disable no-shadow */
  onChange = H.mapIndexed (createOnChange) (fields),
  forwardProps = R.merge ({config, onChange}) (props)

  return <C {...forwardProps} />

  // {topic, form, fields} = props,

  // /* eslint-disable no-shadow */
  // onChange = field => ({currentTarget: {textContent: t}}) => {
  //   form.setValue (field, t)
  // },

  // onClick = R.map (onChange) (fields),

  // onEnt = H.navto (`/t/${topic}`),
  // forwardProps = R.merge ({onClick, onEnt}) (props)

  // return <C {...forwardProps} />
}

export default onChange