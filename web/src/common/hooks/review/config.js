import {R, H, React} from 'common'

const

/**
 * @description adds onChange
 */
onChange = (props) => {
  const

  {fields} = props,

  [config, setConfig] = React.useState ({skip: true})
  const createOnChange = (field, key) => ({target: {name, value}}) => {
    value |> H.isNotNilOrEmpty
      ? setConfig ({
        key,
        field: name,
        variables: {input: {str: value, first: 3}},
        skip: false
      })
      : setConfig ({skip: true})
  },

  /* eslint-disable no-shadow */
  onChange = H.map (createOnChange) (fields)
  return R.merge ({config, onChange}) (props)
}

export default onChange