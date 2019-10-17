import {R, H, React} from 'common'

const times = C => (props) => {
  const

  /* eslint-disable no-shadow */
  [times, setTimes] = React.useState (1),
  {isValid} = props,

  lastIndex = R.findLastIndex (R.identity) (isValid),

  [] = [lastIndex + 2 > times && setTimes (lastIndex + 2)],
  forwardProps = R.merge ({times}) (props)

  return <C {...forwardProps} />
}

export default times