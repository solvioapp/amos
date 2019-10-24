import {
  H, React, useQuery, useMutation, gql,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const goRoot = H.navto (`/review`)

const messages = [
  `Thanks for the review!`,
  `This is the last chance to get Reputation for this fantastic review by signing up. 🤟`,
],

ADD_REVIEW_GQL = gql`
  mutation AddReview ($input: AddReviewInput!) {
    addReview (input: $input) {
      success
      message
    }
  }
`,

GET_REVIEW_CLIENT_GQL = gql`
  query {
    review @client
  }
`,

Guest = ({...rest}) => {
  // const {submitReview} = useReviewCtx()

  // const submitAndGo = useCallback(() => {
  //   submitReview()
  //   goRoot()
  // }, [submitReview])

  const {data} = useQuery (GET_REVIEW_CLIENT_GQL)

  data |> console.log ('data', #)

  const onCompleted = () => {}

  const [submitReview] = useMutation (ADD_REVIEW_GQL, {variables: {input: {data}}, onCompleted})

  return <div css={Top_} columns='two' {...rest}>
    <div css={Top_} columns='left'>
      <AmosChat callToAction={
        <Button primary onClick={submitReview}>
          Submit anonymously
        </Button>
      }>{messages}</AmosChat>
    </div>
    <AuthBox/>
  </div>
}

export default Guest
