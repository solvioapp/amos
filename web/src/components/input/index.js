import {R, H, React, styled, Icon} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'
import icon from './icon.sc'

const Input = ({
  label, results, name, type, _ref,
  onEnt, link, onClick, className, valid: isValid = false,
  placeholder = label, errors, loading,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const
  // @param e Event
  onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt),

  [dropdown, setDropdown] = React.useState (false),
  [valid, setValid] = React.useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onBlur = () => setDropdown (false),

  _onClick = () => setDropdown (!dropdown)

  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' ref={ref} onClick={_onClick}
        {...{placeholder, onBlur, onKeyPress,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {dropdown && <Dropdown {...{results, onClick}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
