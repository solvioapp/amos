import {
  React, R, Switch, Route
} from 'common'
import Guest from './guest'
import Links from './links'
import Topics from './topics'
import Prerequisites from './prerequisites'
import Confirm from './confirm'
import Thanks from './thanks'

const redirect = R.both(
  R.propEq(`isAuthenticated`, true),
  R.pathEq([`location`, `pathname`], `/review`)
)

// const createGuest = props => 

const Review = (props) => (
  <Switch>
    <Route path='/review' exact component={Guest} />
    <Route path='/review/links' component={Links} />
    <Route path='/review/topics' component={Topics} />
    <Route path='/review/prerequisites' component={Prerequisites} />
    <Route path='/review/confirm' component={Confirm} />
    <Route path='/review/thanks' component={Thanks} />
  </Switch>
)

export default (Review)
