import {R, H, React} from 'common'
import Top_ from './top.sc'
import RadioGroupHead_ from './radio-group-head.sc'
import RadioList_ from './radio-list.sc'

const makeText = title => (
  title
    ? <RadioGroupHead_>{title}</RadioGroupHead_>
    : null
)

const RadioGroup = (
  {header, footer, name, elements, ...rest}
) => (
  <div css={Top_} {...rest}>
    {header && makeText (header)}
    <RadioList_>
      {R.map (el => (
        <label key={el.value}>
          <input
            type='radio'
            name={name}
            register={register}
          />
          {el.text}
        </label>
      )) (elements)}
    </RadioList_>
    {footer && makeText (footer)}
  </div>
)

export default H.styled (RadioGroup) ``