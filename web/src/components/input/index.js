import {R, H, React} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'

const Input = ({
  label, results, name, type, _ref,
  onEnt, link, onClick, dropdown, className,
  placeholder = label, errors, loading,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const
  // @param e Event
  onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt)

  // Close the dropdown if the user clicks outside of it
  window.onclick = event => {
    if (!event.target.matches (`.dropdown`)) {
      const dropdowns = document.getElementsByClassName (`dropdown`)
      R.map ((d) => d.classList.contains (`show`) && d.classList.remove (`show`)) (dropdowns)
    }
  }

  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' ref={ref}
        {...{placeholder, onKeyPress,
          name, type, hasError, ...rest}}
      />
      {dropdown && <Dropdown {...{results, onClick}} />}
    </div>
  )
}

export default H.styleAndForwardRef (Input) (Top_)
// export default H.styleAndForwardRef ( (Input)) (Top_)
// export default H.style (Input) (Top_)
