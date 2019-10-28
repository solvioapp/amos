import {
  H, React, withRouter,
  NavMenu, Footer
} from 'common'
import Content_ from './content.sc'
import top from './top.sc'

const PageLayout = ({isAuthenticated, children, match, ...rest}) => (
  <div css={top} {...rest}>
    <NavMenu {...{isAuthenticated}}/>
    <Content_ {...{match}}>{children}</Content_>
    {/* <Footer/> */}
  </div>
)

export default PageLayout
  |> withRouter
  |> H.styled (#) ``
