import {R, H, React} from 'common'

const

/**
 * @description adds config and onChange
 */
onChange = (props) => {
  const

  {schema, review} = props,

  [valid, setValid] = React.useState (false),

  /* eslint-disable no-shadow */
  onChange = async ({target: {name, value}}) => {
    (await schema.isValid ({[name]: value}))
      |> setValid
  },

  /* We are loading from store */
  [] = [review?.links && do {
    review |> console.log ('review2', #)
    onChange ({target: {
      name: `links`,
      value: review.links
    }})
  }]

  return R.merge ({onChange, valid}) (props)
}

export default onChange