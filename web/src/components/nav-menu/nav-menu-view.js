import {H, React, R, withRouter} from 'common'
import Top_ from './nav-menu-top.sc'
import Link from './link'

const isActive = (_, {pathname: p}) => (
  R.either
  (R.equals (`/learn`))
  (R.startsWith (`/topic/`)) (p)
)

const isLogin = R.pathEq([`history`, `location`, `pathname`], `/login`)

const NavMenu = ({isAuthenticated, className, ...rest}) => (
  <div className={className}>
    <Link to='/review'>
      Review
    </Link>
    <Link to='/learn' {...{isActive}}>
      Learn
    </Link>
    <Link to='/about'>
      About
    </Link>
    {/* <Link to='/notifications' hidden={true}>
      Notifications
    </Link> */}
    <Link to='/profile' hidden={!isAuthenticated}>
      Profile
    </Link>
    <Link to='/signup' hidden={isAuthenticated || isLogin (rest)}>
      Sign up
    </Link>
    <Link to='/login' hidden={isAuthenticated || !isLogin (rest)}>
      Log in
    </Link>
  </div>
)

export default NavMenu
  |> H.style (#) (Top_)
  |> withRouter
