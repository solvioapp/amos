import {R, H, React, useState, useCallback} from 'common'
import Radio from './radio'
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

  const [checked, setChecked] = useState (null),

  onClick = useCallback ((key) => () => {
    checked === key
      ? setChecked (null)
      : setChecked (key)
  }, [checked])

  return <div css={Top_} {...rest}>
    {header && makeText (header)}
    <RadioList_>
      {H.map ((element, key) => (
        <label key={key}>
          <Radio
            type='radio'
            value={key}
            checked={checked === key}
            onClick={onClick (key)}
            ref={form.register}
            {...{name, form}}
          />
          {element}
        </label>
      )) (elements)}
    </RadioList_>
    {footer && makeText (footer)}
  </div>
}

export default H.styled (RadioGroup) ``