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
  label, results, name, type, boxShadowWidth, dontFocus,
  onEnt, link, onClick, className, valid: isValid = false,
  placeholder = label, errors, loading, _key, noDropdown = false,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const

  [dropdown, setDropdown] = useState (true),
  [valid, setValid] = useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onKeyPress = useCallback ((e) => {
    const {key} = e
    /* Use this if there is no results, no dropdown or if it's disabled
    (otherwise use <Dropdown>'s onKeyPress */
    if (!results || !dropdown || noDropdown) {
      key === `Enter` && onEnt && onEnt () () (`SUBMIT`)
    }
  }, [dropdown, noDropdown, onEnt])

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener(`keypress`, onKeyPress)
  }, [onKeyPress])

  // const _onClick = (e) => {
  //   // console.log (`_onClick`)
  //   e.stopPropagation()
  //   e.nativeEvent.stopImmediatePropagation()
  //   setDropdown (R.not)
  // }

  const inputRef = useRef()

  const forwardRef = e => {
    ref (e)
    inputRef.current = e
  }

  const onBlur = () => setDropdown (false)

  H.useMount(() => {
    !dontFocus && inputRef.current.focus()
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
    <div css={Top_} {...{className}} key={`div${_key}`}>
      <Label_ key={`label${_key}`}>{label}</Label_>
      <Input_ autoComplete='off' ref={forwardRef} key={`input${_key}`}
        {...{placeholder, boxShadowWidth,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {!noDropdown && dropdown && <Dropdown {...{results, onClick, link, onEnt, name, _key, active}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
