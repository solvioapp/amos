import {R, H, React} from 'common'

const

/**
 * @description adds onChange and valid
 */
onChange = (props) => {
  const

  {schema, review} = props,

  [valid, setValid] = React.useState (false),

  /* eslint-disable no-shadow */
  onChange = async ({target: {name, value}}) => {
    (await schema.isValid ({link: [value]}))
      |> setValid
  },

  /* We are loading from store */
  [] = [review?.link && do {
    onChange ({target: {
      name: `link`,
      value: review.link[0]
    }})
  }]

  return R.merge ({onChange, valid}) (props)
}

export default onChange