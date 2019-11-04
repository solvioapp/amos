import {H, React} from 'common'
import Top_ from './checkbox-top.sc'
import Checkbox_ from './checkbox.sc'

const Checkbox = ({children, ...rest}) => (
  <div {...rest}>
    <Checkbox_ checkboxSize={20} checkboxBorderSize={2}>
      <input type='checkbox' defaultChecked/>
    </Checkbox_>
    {children}
  </div>
)

export default H.style (Checkbox) (Top_)