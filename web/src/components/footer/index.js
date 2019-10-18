import {H, React} from 'common'
import Top_ from './top.sc'
import Link from './link.sc'

const Footer = ({...rest}) => (
  <footer  {...rest}>
    Built with ❤️ and ☕️ by
    {` `}
    <Link target='_blank' href='http://solvio.org'>
      Solvio Foundation
    </Link>.
    {` `}
    <Link target='_blank' href='https://github.com/solviofoundation/amos/wiki'>
      Help.
    </Link>
  </footer>
)

export default H.style (Footer) (Top_)
