import {
  React, CookiesProvider, H, Router, ApolloProvider
} from 'common'
import PageLayout from './page-layout'
import Routes from './routes'
import client from 'apollo/client'

const App = () => (
  <CookiesProvider>
    <ApolloProvider client={client}>
      <Router history={H.history}>
        <PageLayout>
          <Routes/>
        </PageLayout>
      </Router>
    </ApolloProvider>
  </CookiesProvider>
)

export default App
