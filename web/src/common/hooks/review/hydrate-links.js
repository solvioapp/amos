import {R, H, React, flatten} from 'common'

const

/**
 * @description adds hydration, onChange and valid
 */
hydrateLinks = (props) => {
  const

  {schema, review, form} = props,
  
  [valid, setValid] = React.useState (false),

  onChange = async ({target: {value}}) => {
    // See https://github.com/babel/babel/issues/10481
    return (await schema.isValid ({link: [value]}))
      |> setValid
  }

  H.useMount(() => {
    review && (review |> flatten |> R.mapObjIndexed ((val, key) => {
      H.isNotNilOrEmpty (val) && form.setValue (key, val)
      setValid (true)
    }) (#))
  })

  /* We are loading from store */
  // link = form.getValue (`link`),
  // [] = [review?.link && H.isNilOrEmpty () && setValid (true)]

  // valid |> console.log ('valid later', #)

  /* This doesn't work bc it fires on every change! */
  // do {
  //   onChange ({target: {
  //     name: `link`,
  //     value: review.link[0]
  //   }})
  // }]

  return R.merge ({onChange, valid}) (props)
}

export default hydrateLinks