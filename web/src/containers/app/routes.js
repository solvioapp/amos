import {
  React, Redirect, Route, Switch,
  NotFound
} from 'common'
import Login from 'containers/login'
import Profile from 'containers/profile'
import Review from 'containers/review'
import Search from 'containers/search'
import Signup from 'containers/signup'
import Topic from 'containers/topic'
import PublicRoute from './public-route'
import PrivateRoute from './private-route'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Search}/>
    <Route path='/review' component={Review}/>
    <Route path='/t' component={Topic}/>
    <PublicRoute path='/login' component={Login}/>
    <PublicRoute path='/signup' component={Signup}/>
    {/* <Route path='/forgot-password' component={NotFound}/> */}
    <PrivateRoute path='/profile' component={Profile}/>
    <Route component={NotFound}/>
  </Switch>
)

export default Routes
