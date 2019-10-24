import {R, H, React, CONST} from 'common'

const VALIDATE = [`next`, `finish`]
const DONT_VALIDATE = [`previous`]

const setErrors = form => fields => () => R.map (field => form.setError (field, ``, CONST.err_topics)) (fields)

const isValid = (props) => {

  const

  {results, loading, review, name, form} = props,
  [valid, setValid] = React.useState ([]),

  /*
    Set valid on hydration
    Here we're assuming that anything that was in review was in store
    and anything that is in store is valid
  */
  [] = [review?.[name]
    && (R.length (review[name]) > R.length (valid))
    && (setValid (R.repeat (true) (R.length (review[name]))))],

  /* eslint-disable no-shadow */
  setOneValid = key => isValid => {
    setValid (H.update (key) (isValid) (valid))
  },

  createOnChange = (fn, key) => (e) => {
    const {target: {value}} = e,
    res = results[name][key],
    /* to be valid, value must be among results */
    isValid = res && (!loading) && R.includes (value) (R.pluck (`text`) (res))
    /* Set validity in state */
    isValid ? setOneValid (key) (true) : setOneValid (key) (false)
    /* In any case run parent (which updates queryConfig) */
    fn (e)
  },

  onChange = H.map (createOnChange) (props.onChange),

  fields = form.watch (name, []),

  // TODO: generalize
  getInvalidField = (acc, val, i) => {
    /* Empty is considered vallid */
    const test = !val && H.isNotNilOrEmpty (fields[i])
    return test ? R.append (`${name}[${i}]`) (acc) : acc
  },
  invalidFields = H.reduce (getInvalidField) ([]) (valid),

  isAllValid = R.length (invalidFields) === 0,

  /* After submission */
  [] = [form.formState.isSubmitted && (() => {
    isAllValid
      ? R.not (form.formState.isValid) && form.clearError ()
      : setErrors (form) (invalidFields)
  })()],

  addValidation = cb => (
    isAllValid
      ? cb
      : form.handleSubmit (setErrors (form) (invalidFields))
  ),

  previousValidation = cb => (...args) => do {
    form.unregister (invalidFields)
    // invalidFields |> console.log ('invalidFields', #)
    // const defValues = R.repeat (``) (R.length (invalidFields))
    //   |> R.zipObj (invalidFields) (#)
    // defValues |> console.log ('defValues', #)
    // form.reset (defValues)
    // form.getValues() |> console.log ('form.getValues()', #)
    cb (...args)
  },

  // validate = R.pipe (
  //   R.pick (VALIDATE),
  //   R.map 
  // ) (props.onSubmit)
  
  // onSubmit = R.merge (validate) (dontValidate)

  // onSubmit = R.converge (
  //   R.merge,
  //   [R.pipe , ]
  // )

  // partition = (val, key) => R.includes (VALIDATE) (key)

  // part = R.partition (R.flip (R.includes) (VALIDATE)) (R.keys (props.onSubmit)),

  // onSubmit = R.map (_addValidation) (props.onSubmit)

  // onSubmit |> console.log ('onSubmit', #)

  // valid |> console.log ('valid2', #)

  onSubmit = {}

  onSubmit.previous = previousValidation (props.onSubmit.previous)
  onSubmit.next = addValidation (props.onSubmit.next)
  onSubmit.finish = addValidation (props.onSubmit.finish)

  /* Override valid, onChange and onSubmit */
  return R.mergeAll ([{setOneValid, setValid}, props, {valid, onChange, onSubmit}])
}

export default isValid