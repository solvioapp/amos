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
  {header, footer, name, elements, form, ...rest}
) => {

  return <div css={Top_} {...rest}>
    {header && makeText (header)}
    <RadioList_>
      {H.map ((element, key) => (
        <label key={key}>
          <input
            type='radio'
            value={key}
            ref={form.register}
            {...{name}}
          />
          {element}
        </label>
      )) (elements)}
    </RadioList_>
    {footer && makeText (footer)}
  </div>
}

export default H.styled (RadioGroup) ``