import {H, React} from 'common'
import Top_ from './top.sc'
import RadioGroupHead_ from './radio-group-head.sc'
import RadioList_ from './radio-list.sc'

const makeTitle = title => (
  title
    ? <RadioGroupHead_>{title}</RadioGroupHead_>
    : null
)

// const makeRadios = => ()

const RadioGroup = ({title, name, elements, checkedValue, ...rest}) => (
  <div {...rest}>
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
  </div>
)

export {RadioGroupHead_}
export default H.style (RadioGroup) (Top_)