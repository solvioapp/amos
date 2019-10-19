import {R, H, React, styled} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'

const Input = ({
  label, results, name, type, _ref,
  onEnt, link, onClick, className, valid: isValid = false,
  placeholder = label, errors, loading,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const
  // @param e Event
  onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt),

  // Close the dropdown if the user clicks outside of it
  // window.onclick = event => {
  //   if (!event.target.matches (`.dropdown`)) {
  //     const dropdowns = document.getElementsByClassName (`dropdown`)
  //     R.map ((d) => d.classList.contains (`show`) && d.classList.remove (`show`)) (dropdowns)
  //   }
  // }

  
  [dropdown, setDropdown] = React.useState (false),
  [valid, setValid] = React.useState (false),
  // [_dropdown, _toggleDropdown] = React.useState (false),
  // [focus, setFocus] = React.useState (false),
  
  [] = [name |> console.log ('1name', #)],
  [] = [valid |> console.log ('1valid', #)],
  [] = [isValid |> console.log ('1isValid', #)],
  [] = [dropdown |> console.log ('1dropdown', #)],

  [] = [H.neq (valid) (isValid) && !valid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onBlur = () => {
    console.log (`onBlur fired`)
    setDropdown (false)
    // setDropdown (`off`)
    // _toggleDropdown (false)
    // setFocus (false)
  },
  // onFocus = () => {
  //   console.log (`onFocus fired`)
  //   setDropdown (true)
  //   _toggleDropdown (false)
  //   setFocus (true)
  // },
  // onMouseDown = () => {
  //   console.log (`onMouseDown fired`)
  //   _toggleDropdown (!_dropdown)
  // },
  _onClick = () => {
    console.log (`_onClick fired`)
    setDropdown (!dropdown)
    // dropdown |> R.cond ([
    //   [R.equals (`off`), () => valid ? setDropdown (`double`) : setDropdown (`on`)],
    //   [R.equals (`on`), () => setDropdown (`double`)],
    //   [R.equals (`double`), () => setDropdown (`on`)],
    // ]) (#)
    // R.equals (dropdown) (`off`) && setDropdown (`on`)
    // R.equals (dropdown) (`on`) && setDropdown (`double`)
    // R.equals (dropdown) (`double`) && setDropdown (`on`)
    // focus && setDropdown (!dropdown)
    // focus || _toggleDropdown (true)
    // setFocus (true)
    // _toggleDropdown ()
  },

  // valid |> console.log ('valid', #)
  // _dropdown |> console.log ('_dropdown', #)

  // ref |> console.log ('ref', #)

  [] = [dropdown |> console.log ('dropdown', #)],

  [] = [R.equals ([false, `on`]) ([valid, dropdown]) |> console.log ('R.equals ([false, `on`]) ([valid, dropdown])', #)],

  // showDropdown = [valid, dropdown] |> R.cond ([
  //   [R.equals ([false, `on`]), R.T],
  //   [R.equals ([false, `double`]), R.F],
  //   [R.equals ([true, `on`]), R.F],
  //   [R.equals ([true, `double`]), R.T],
  //   [R.T, R.F],
  // ]) (#)

  // showDropdown |> console.log ('showDropdown', #)
  [] = []
  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' ref={ref} onClick={_onClick}
        {...{placeholder, onBlur, onKeyPress,
          name, type, hasError, ...rest}}
      />
      {dropdown && <Dropdown {...{results, onClick}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
