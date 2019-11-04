import {H, React} from 'common'
import _SplitButton from '@zippytech/react-toolkit/SplitButton'
import '@zippytech/react-toolkit/SplitButton/index.css'
import top from './split-button-top.sc'

const SplitButton = ({children, ...rest}) => {
  return (
    <_SplitButton css={top}
      {...rest}
    >
      {children}
    </_SplitButton>
  )
}

export default H.styled (SplitButton) ``