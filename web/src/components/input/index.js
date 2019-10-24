import {
  R, H, React, useEffect, useState, useCallback, useRef, styled,
  Icon
} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'
import icon from './icon.sc'

const Input = ({
  label, results, name, type,
  onEnt, link, onClick, className, valid: isValid = false,
  placeholder = label, errors, loading, _key,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  isValid |> console.log ('isValid Input', #)
  const

  [dropdown, setDropdown] = useState (true),
  [valid, setValid] = useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  _onClick = (e) => {
    // console.log (`_onClick`)
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setDropdown (R.not)
  }

  const inputRef = useRef()

  const forwardRef = e => {
    ref (e)
    inputRef.current = e
  }

  const onBlur = () => setDropdown (false)

  H.useMount(() => {
    inputRef.current.focus()
    document.addEventListener (`click`, onBlur)
  })

  H.useUnmount (() => {
    document.addEventListener (`click`, onBlur)
  })

  const [active, setActive] = useState (0)

  /* Using pattern described in
  https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks */
  const handleUserKeyPress = useCallback ((e) => {
    inputRef.current === document.activeElement && results && e.key === `ArrowUp`
      && (e.preventDefault() || setActive (R.pipe (R.dec, R.max (0))))
    inputRef.current === document.activeElement && results && e.key === `ArrowDown`
      && (e.preventDefault() || setActive (R.pipe (R.inc, R.min (R.length (results) - 1))))
  }, [results])

  useEffect(() => {
    /* Using keydown here
    bc w/ keyup preventDefault doesn't work */
    inputRef.current.addEventListener (`keydown`, handleUserKeyPress)

    return () => inputRef.current.removeEventListener (`keydown`, handleUserKeyPress)
  }, [handleUserKeyPress])

  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' onClick={_onClick} ref={forwardRef}
        {...{placeholder,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {dropdown && <Dropdown {...{results, onClick, onEnt, name, _key, active}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
