import {
  React, R, Switch, Route
} from 'common'
import Guest from './guest'
import Prerequisites from './prerequisites'
import Links from './links'
import Thanks from './thanks'
import Topics from './topics'

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
    <Route path='/review/thanks' component={Thanks} />
  </Switch>
)

export default (Review)
