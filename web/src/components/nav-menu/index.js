import {H, React, R, withRouter} from 'common'
import Top_ from './top.sc'
import Link_ from './link.sc'

const isLogin = R.pathEq([`history`, `location`, `pathname`], `/login`)

const NavMenu = ({isAuthenticated, className, ...rest}) => (
  <div className={className}>
    <Link_ to='/review'>
      Review
    </Link_>
    <Link_ to='/' exact>
      Search
    </Link_>
    <Link_ to='/notifications' hidden={true}>
      Notifications
    </Link_>
    <Link_ to='/profile' hidden={!isAuthenticated}>
      Profile
    </Link_>
    <Link_ to='/signup' hidden={isAuthenticated || isLogin (rest)}>
      Sign up
    </Link_>
    <Link_ to='/login' hidden={isAuthenticated || !isLogin (rest)}>
      Log in
    </Link_>
  </div>
)

export default NavMenu
  |> H.style (#) (Top_)
  |> withRouter
