import {R, H, flatten} from 'common'

const

/* eslint-disable indent */
/**
 * @description Hydrates inputs on mount
 */
hydrate = (props) => {

  const

  {review, form} = props

  H.useMount(() => {
    review && (review |> flatten |> R.mapObjIndexed ((val, key) => {
      H.isNotNilOrEmpty (val) && form.setValue (key, val)
    }) (#))
  })

  return R.merge ({review}) (props)
}

export default hydrate