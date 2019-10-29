import {
  React, hooks, R,
  AmosChat, Button, Title, Input, RadioGroup
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const elements = {
  strength: {

  }
},

Prerequisites = (props) => {
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid
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
          name = `prerequisite[${key}]`,
          res = results?.prerequisite?.[key]) => (
          <React.Fragment key={key}>
            <RadioGroup
              header='I:'
              name='strength'
              elements={elements.strength}
            />
            <RadioGroup
              header='for people to be atleast:'
              name='level'
              elements={elements.level}
              footer='in:'
            />
            <Input
              name={name}
              ref={form.register}
              key={key}
              _key={key}
              link={false}
              loading={loading}
              errors={form.errors[name]}
              results={res}
              onClick={onClick[key]}
              valid={valid[key]}
              onChange={onChange[key]}
              onEnt={onEnt}
              {...props}
            />
          </React.Fragment>
        )) (times)}
    </InputForm_>
  </div>
}

export default Prerequisites