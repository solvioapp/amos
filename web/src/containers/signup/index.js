import {React, Switch, Route} from 'common'
import Email from './email'
import Username from './username'
import Success from './success'
import Guest from './guest'

const SignUp = () => (
  <Switch>
    <Route path='/signup' exact component={Guest}/>
    <Route path='/signup/username' component={Username}/>
    <Route path='/signup/email' component={Email}/>
    <Route path='/signup/success' component={Success}/>
  </Switch>
)

export default SignUp
