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

  [dropdown, setDropdown] = React.useState (true),
  [valid, setValid] = React.useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onBlur = () => setDropdown (false),

  _onClick = () => setDropdown (!dropdown)

  // window.keydown(function (e) {
  //   var code = (e.keyCode ? e.keyCode : e.which);
  //   if (code == 9) {
  //     alert('I was tabbed!');
  //   }
  // })


  const test = React.useRef()

  H.useMount(() => {
    test |> console.log ('test', #)
    test.current.focus()
      document.addEventListener (`keyup`, ({code}) => {
  // const code = keyCode || which
    code === `ArrowDown` && console.log(`tab`)
  })

  })

  /* In case user is using Tab etc. to focus */
  // onFocus = () => setDropdown (true)
  // onFocus = () => setDropdown (true)

  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' onClick={_onClick} ref={e => {ref (e); test.current=e}}
        {...{placeholder, onBlur, onKeyPress,
          // onFocus,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {dropdown && <Dropdown {...{results, onClick}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
