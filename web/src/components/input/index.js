import {R} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import React from 'react'
import Top_ from './top.sc'
import Dropdown from './dropdown'

const Input = ({label, results, onChange, onEnt, children, ...props}) => {
  // @param e Event
  const onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt)

  return (
    <Top_>
      <Label_>{label}</Label_>
      <Input_
        // placeholder={R.is (String) (children) ? children : ``}
        placeholder={children}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...props}
      />
      <Dropdown results={results}/>
    </Top_>
  )
}

export default React.forwardRef(Input)
