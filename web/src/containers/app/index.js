import {
  React, CookiesProvider, history, Router, ApolloProvider
} from 'common'
import PageLayout from './page-layout'
import Routes from './routes'
import client from './client'

const App = () => (
  <CookiesProvider>
    <ApolloProvider client={client}>
      <Router history={history}>
        <PageLayout>
          <Routes/>
        </PageLayout>
      </Router>
    </ApolloProvider>
  </CookiesProvider>
)

export default App
