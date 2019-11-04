import {
  H, React, withRouter,
  NavMenu,
} from 'common'
import Content_ from './content.sc'
import top from './page-layout-top.sc'

const PageLayout = ({isAuthenticated, children, match, ...rest}) => (
  <div css={top} {...rest}>
    <NavMenu {...{isAuthenticated}}/>
    <Content_ {...{match}}>{children}</Content_>
  </div>
)

export default PageLayout
  |> withRouter
  |> H.styled (#) ``
