import {R, H, React} from 'common'

const

/**
 * @description adds onChange
 */
onChange = (props) => {
  const

  {fields} = props,

  /* Returns an array of values */
  // topics = form.watch (`topic`, [])
  /* First time using let in 2 months :) */
  // let config = {skip: true}
  [config, setConfig] = React.useState ({skip: true})
  const createOnChange = (field, key) => results => ({target: {name, value}}) => {
    value |> H.isNotNilOrEmpty
      ? setConfig ({
        key,
        field: name,
        variables: {input: [{str: value, first: 3}]},
        skip: false
      })
      : setConfig ({skip: true})
  },

  /* eslint-disable no-shadow */
  onChange = H.map (createOnChange) (fields)
  return R.merge ({config, onChange}) (props)

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