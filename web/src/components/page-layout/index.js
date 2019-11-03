import {
  H, React, withRouter,
  NavMenu,
} from 'common'
import Content_ from './content.sc'
import top from './top.sc'

const Footer = H.styled.div`
  @media (max-width: 768px) {
    padding-bottom: 65px;
  }
`

const PageLayout = ({isAuthenticated, children, match, ...rest}) => (
  <div css={top} {...rest}>
    <NavMenu {...{isAuthenticated}}/>
    <Content_ {...{match}}>{children}</Content_>
    <Footer/>
  </div>
)

export default PageLayout
  |> withRouter
  |> H.styled (#) ``
