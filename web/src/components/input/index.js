import {R, React} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'

const Input = ({
  label, results, name, type,
  onEnt, link, onClick, dropdown,
  placeholder = label, errors,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const
  // @param e Event
  onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt)
  return (
    <Top_>
      <Label_>{label}</Label_>
      <Input_
        {...{placeholder, onKeyPress, ref,
          name, type, hasError, ...rest}}
      />
      {dropdown && <Dropdown {...{results, onClick}} />}
    </Top_>
  )
}

export default React.forwardRef (Input)
