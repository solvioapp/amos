import {R} from 'common'

const addProps = propsToBeAdded => C => (props) => {
  const
  forwardProps = R.merge (propsToBeAdded) (props)
  return <C {...forwardProps} />
}

export default addProps