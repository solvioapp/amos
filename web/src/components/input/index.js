import {R,React} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'

const Input = ({label, results, name, type, onChange, onEnt, children, placeholder = label, errors, hasError = Boolean (errors?.[name]), ...rest}, ref) => {
  // @param e Event
  // const onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt)
  return (
    <Top_>
      <Label_>{label}</Label_>
      <Input_
        // placeholder={R.is (String) (children) ? children : ``}
        placeholder={placeholder}
        onChange={onChange}
        // onKeyPress={onKeyPress}
        type={type}
        name={name}
        ref={ref}
        hasError={hasError}
        {...rest}
      />
      <Dropdown results={results}/>
    </Top_>
  )
}

export default React.forwardRef(Input)
