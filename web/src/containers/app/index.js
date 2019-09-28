import {
  React, store, Provider, Router, ApolloClient, ApolloProvider
} from 'common'
import PageLayout from './page-layout'
import Routes from './routes'
import {history} from 'common/history'

const uri = `${window._env_.CUSTOM_API_URL}`
const client = new ApolloClient({uri})

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <PageLayout>
          <Routes/>
        </PageLayout>
      </Router>
    </Provider>
  </ApolloProvider>
)

export default App
