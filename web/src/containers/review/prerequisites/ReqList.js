import {
  React, useCallback, useEffect, useRef, useMemo, yup as Y, R,
  Input, IncrementalInputs, RadioGroup
} from 'common'
import {RadioGroupHead_} from 'components/radio-group'
import Top_ from './top.sc'

const radioNecessity = {
  title: `I:`,
  name: `necessity-level`,
  elements: [
    {
      value: `helpful`,
      text: <span>think it would be <em>helpful</em></span>,
    },
    {
      value: `recommended`,
      text: <span>would <em>recommend</em></span>,
    },
    {
      value: `necessary`,
      text: <span>think it's <em>necessary</em></span>,
    },
  ]
}

const makeNecessityProps = checkedValue => ({
  ...radioNecessity,
  checkedValue,
})

const radioKnowledge = {
  title: `for people to be at least:`,
  name: `knowledge-level`,
  elements: [{
    value: `beginner`,
    text: `beginner`,
  }, {
    value: `intermediate`,
    text: `intermediate`,
  }, {
    value: `advanced`,
    text: `advanced`,
  }, {
    value: `expert`,
    text: `domain expert`,
  },
  ]
}

const makeKnowledgeProps = checkedValue => ({
  ...radioKnowledge,
  checkedValue,
})

const reqSchema = Y.object().shape({
  'necessity-level': Y.string().oneOf(R.map(R.prop(`value`), radioNecessity.elements)).required(),
  'knowledge-level': Y.string().oneOf(R.map(R.prop(`value`), radioKnowledge.elements)).required(),
  topic: Y.string().required()
})

const props = {
  initItems: [{}],
  makeNewItem: () => ({}),
  isItemEmpty: R.isEmpty,
  // eslint-disable-next-line no-sync
  isItemComplete: data => reqSchema.isValidSync(data),
}

const RequirementInput = ({changeItem, item, index}) => {
  const onChange = useCallback(e => {
    const formData = new FormData(e.currentTarget)
    const data = R.fromPairs(Array.from(formData.entries()))
    changeItem(data)
  }, [changeItem])

  const formRef = useRef()

  useEffect(() => {
    index > 0 && formRef.current &&
        formRef.current.scrollIntoView({block: `center`, behavior: `smooth`})
  }, [])

  const necessityProps = useMemo(
    () => makeNecessityProps(item[`necessity-level`]),
    [item[`necessity-level`]]
  )
  const knowledgeProps = useMemo(
    () => makeKnowledgeProps(item[`knowledge-level`]),
    [item[`necessity-level`]]
  )

  necessityProps |> console.log ('necessityProps', #)

  return (
    <Top_ onChange={onChange} ref={formRef}>
      <RadioGroup {...necessityProps}/>
      <RadioGroup {...knowledgeProps}/>
      <div>
        <RadioGroupHead_>in:</RadioGroupHead_>
        <Input name='topic' defaultValue={item.topic}/>
      </div>
    </Top_>
  )
}

const chooseInitItems = (defaults, fromParent) =>
  fromParent.initItems.length ? fromParent.initItems : defaults.initItems

const RequirementsList = ({onUpdate, initItems}) => {
  const initItems_ = useMemo(() => chooseInitItems(props, {initItems}), [initItems.length])

  return <IncrementalInputs
    {...props}
    component={RequirementInput}
    onUpdate={onUpdate}
    initItems={initItems_}
  />
}

export default RequirementsList