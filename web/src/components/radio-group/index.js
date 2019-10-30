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
  {header, footer, _key, name, elements, form, onClick, ...rest}
) => {
  const [checked, setChecked] = useState (null),

  /* eslint-disable no-shadow */
  _onClick = useCallback ((key) => (e) => {
    checked === key
      ? setChecked (null)
      : do {
        setChecked (key)
        onClick (e)
      }
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
            onClick={_onClick (key)}
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