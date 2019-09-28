import {
  React, useState, useMemo, useContext, useEffect, useRef, R, Switch, Redirect, Route
} from 'common'
import Guest from './guest'
import Prerequisites from './prerequisites'
import Links from './links'
import Thanks from './thanks'
import Topics from './topics'
import connect from './connect'

const initReview = {
  links: [],
  topics: [],
  prerequisites: [],
  done: false,
}
const ReviewContext = React.createContext(initReview)

export const useReviewCtx = (mapping = R.identity) => mapping(useContext(ReviewContext))

const redirect = R.both(
  R.propEq(`isAuthenticated`, true),
  R.pathEq([`location`, `pathname`], `/review`)
)

const makeSetterF = ({prop, setReview, unmounted}) => (val, done = false) => {
  if (unmounted.current) return
  setReview(state => {
    const newState = {...state, [prop]: val, done}
    // TODO: remove logs
    if (done) console.log(`Finished review`, newState)
    return newState
  })
}

const Review = props => {

  const [review, setReview] = useState(initReview)

  const unmounted = useRef(false)

  useEffect(() => () => unmounted.current = true, [])

  const contextValue = useMemo(() => ({
    setLinks: makeSetterF({prop: `links`, setReview, unmounted}),
    setTopics: makeSetterF({prop: `topics`, setReview, unmounted}),
    setPrerequisites: makeSetterF({prop: `prerequisites`, setReview, unmounted}),
    submitReview: () => {
      // TODO: change alert for fetch-like logic
      alert(`Submitting review: ${JSON.stringify(review, null, 2)}`)
      if (unmounted.current) return
      setReview(initReview)
    },
    ...review,
  }), [review])

  if (redirect(props)) {
    return <Redirect to='/review/links' />
  }

  return (
    <ReviewContext.Provider value={contextValue}>
      <Switch>
        <Route path='/review' component={Guest} exact />
        <Route path='/review/links' component={Links} />
        <Route path='/review/topics' component={Topics} />
        <Route path='/review/prerequisites' component={Prerequisites} />
        <Route path='/review/thanks' component={Thanks} />
      </Switch>
    </ReviewContext.Provider>
  )
}

export default connect(Review)
