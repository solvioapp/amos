import {H, R, React} from 'common'
import Top_ from './top.sc'
import gif from './amos.gif'
import image from './amos-frame-0.png'

const Avatar = ({size, timeout, ...rest}) => {
  const [src, setSrc] = React.useState (gif)

  setTimeout(() => {
    R.equals (src) (gif) && setSrc (image)
  }, timeout)

  return <img size={size} src={src} {...rest}/>
}

export default H.style (Avatar) (Top_)