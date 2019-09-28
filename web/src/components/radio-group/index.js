import {React, styled} from 'common'
import Top_ from './top.sc'
import RadioGroupHead_ from './radio-group-head.sc'
import RadioList_ from './radio-list.sc'

const makeTitle = title => (
  title
    ? <RadioGroupHead_>{title}</RadioGroupHead_>
    : null
)

// const makeRadios = => ()

const RadioGroup = ({title, name, elements, checkedValue}) => (
  <Top_>
    {makeTitle (title)}
    <RadioList_>
      {elements.map(el => (
        <label key={el.value}>
          <input
            type='radio'
            name={name}
            value={el.value}
            defaultChecked={el.value === checkedValue}
          />
          {el.text}
        </label>
      ))}
    </RadioList_>
  </Top_>
)

export {RadioGroupHead_}
export default RadioGroup