import {
  H, React,
  NavMenu, Footer
} from 'common'
import Content_ from './content.sc'
import Top_ from './top.sc'

const PageLayout = ({isAuthenticated, children, ...rest}) => (
  <div {...rest}>
    <NavMenu isAuthenticated={isAuthenticated}/>
    <Content_>{children}</Content_>
    <Footer/>
  </div>
)

export default H.style (PageLayout) (Top_)
