// import PageLayout from './page-layout'
// import React from 'react'
// import Routes from './routes'
// import store from 'store'
// import {Provider} from 'react-redux'
// import {Router} from 'react-router-dom'
// import {history} from 'common/history'

import React from 'react'
import ApolloClient, {gql} from 'apollo-boost'
import {ApolloProvider, useQuery, useMutation} from '@apollo/react-hooks'

const QUERY_TOPIC = gql`
  query {
    Topic(name: "S") {
      _id
    }
  }
`

const CREATE_TOPIC = gql`
  mutation {
    createTopic(name: "P") {
      _id
    }
  }
`
const uri = `${window._env_.CUSTOM_API_URL}/graphql`
const client = new ApolloClient({
  uri,
})


const Foo = () => {
  `I am working!12` |> console.log
  window |> console.log('window', #)
  uri |> console.log('uri', #)
  const {loading, error, data: dataQ} = useQuery(QUERY_TOPIC)
  const [createTopic, {data: dataM}] = useMutation(CREATE_TOPIC)
  loading |> console.log('loading', #)
  error |> console.log('error', #)
  dataQ |> console.log('dataQ', #)
  createTopic |> console.log('createTopic', #)
  dataM |> console.log('dataM', #)

  client |> console.log('client', #)
  client
  .query({
    query: QUERY_TOPIC
  })
  .then(r => console.log(`query`, r));

  client
  .mutate({
    mutation: CREATE_TOPIC
  })
  .then(r => console.log(`mutation`, r))

  // // return data.Topic.map(({_id}) => (
  // //   <div>
  // //     <p>
  // //       {_id}
  // //     </p>
  // //   </div>
  // // ))

  return (
    <button onClick={() => createTopic()}>Click me!</button>
  )
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Foo></Foo>
    </div>
  </ApolloProvider>
)

// // const App = () => (
// //   <Provider store={store}>
// //     <Router history={history}>
// //       <PageLayout>
// //         <Routes/>
// //       </PageLayout>
// //     </Router>
// //   </Provider>
// // )

export default App
