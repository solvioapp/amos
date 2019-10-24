import {
  React, H, gql, useMutation, Switch, Route
} from 'common'
import Guest from './guest'
import Links from './links'
import Topics from './topics'
import Prerequisites from './prerequisites'
import Confirm from './confirm'
import Thanks from './thanks'

const RESET_REVIEW_GQL = gql`
  mutation ResetReview {
    resetReview @client
  }
`

const Review = () => {
  const [resetReview] = useMutation (RESET_REVIEW_GQL)

  H.useUnmount(() => resetReview())

  return <Switch>
    <Route path='/review' exact component={Guest} />
    <Route path='/review/links' component={Links} />
    <Route path='/review/topics' component={Topics} />
    <Route path='/review/prerequisites' component={Prerequisites} />
    <Route path='/review/confirm' component={Confirm} />
    <Route path='/review/thanks' component={Thanks} />
  </Switch>
}

export default (Review)
