import {
  React, styled,
  Icon
} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'
import icon from './icon.sc'
import useInputHook from './input-hook'

const Input = (props, ref) => {
  const {label, results, name, type, boxShadowWidth, dontFocus,
    onEnt, link, onClick, className, valid: isValid = false,
    placeholder = label, errors, loading, _key, noDropdown = false,
    hasError = Boolean (errors?.[name]), ...rest
  } = props

  const {_onClick, forwardRef, dropdown, active} = useInputHook ({...props, ref})

  return (
    <div css={Top_} {...{className}} key={`div${_key}`}>
      <Label_ key={`label${_key}`}>{label}</Label_>
      <Input_ autoComplete='off' onClick={_onClick} ref={forwardRef} key={`input${_key}`}
        {...{placeholder, boxShadowWidth,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {!noDropdown && dropdown && <Dropdown {...{results, onClick, link, onEnt, name, _key, active}}/>}
    </div>
  )
}

export default styled (React.forwardRef (Input)) ``
