import {
  React, hooks, R,
  AmosChat, Button, Title, Input, RadioGroup, Hr
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const elements = {
  strength: [
    <span>think it would be <em>helpful</em></span>,
    <span>would <em>recommend</em></span>,
    <span>think it's <em>necessary</em></span>
  ],
  level: [
    `beginner`,
    `intermediate`,
    `advanced`,
    `domain expert`
  ]
},

Prerequisites = (props) => {
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid, checkboxesValid
  } = hooks.useReviewTopics (`prerequisite`) (props)

  return <div css={Top_} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Prerequisites</Title>
      <Buttons>
        <form onSubmit={onSubmit.previous}>
          <Button type='submit'>
            Previous
          </Button>
        </form>
        <form onSubmit={onSubmit.finish}>
          <Button type='submit'>
            Finish
          </Button>
        </form>
      </Buttons>
      {R.times (
        (key,
          res = results?.prerequisite?.[key]) => (
          <React.Fragment key={key}>
            <RadioGroup
              header='I:'
              name={`prerequisite[${key}].strength`}
              elements={elements.strength}
              onClick={(e, checked) => onClick [3 * key] (e, key, `strength`, checked)}
              {...{form}}
            />
            <RadioGroup
              header='for people to be atleast:'
              name={`prerequisite[${key}].level`}
              elements={elements.level}
              onClick={(e, checked) => onClick [3 * key + 1] (e, key, `level`, checked)}
              footer='in:'
              {...{form}}
            />
            <Input
              name={`prerequisite[${key}].topic`}
              ref={form.register}
              key={key}
              _key={key}
              link={false}
              loading={loading}
              errors={form.errors [name]}
              results={res}
              onClick={e => onClick [3 * key + 2] (e, key)}
              valid={valid[key] && checkboxesValid[key]}
              onChange={onChange[key]}
              onEnt={onEnt}
              {...props}
            />
            <Hr/>
          </React.Fragment>
        )) (times)}
    </InputForm_>
  </div>
}

export default Prerequisites