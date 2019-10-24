import {R, H, React} from 'common'

const times = (props) => {
  const

  /* eslint-disable no-shadow */
  [times, setTimes] = React.useState (1),
  {valid, review, name} = props,

  /* Set times on hydration */
  [] = [review?.[name]
    && (R.length (review[name]) > times)
    && (R.length (review[name]) |> setTimes)],

  /* Find last valid index */
  lastIndex = R.findLastIndex (R.identity) (valid),

  /* times should always be lastIndex + 2 */
  [] = [lastIndex + 2 > times && setTimes (lastIndex + 2)]
  return R.merge ({times}) (props)
}

export default times