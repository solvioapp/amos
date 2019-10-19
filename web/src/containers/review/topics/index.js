import {
  React, R, hooks,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from '../buttons.sc'
import InputForm_ from '../input-form.sc'
import Top_ from '../top.sc'

const Topics = (props) => {
  const

  {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid
  } = hooks.useReviewTopics (`topics`) (props)
  return <div css={Top_} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Topics</Title>
      {R.times (
        (key,
          name = `topic[${key}]`,
          res = results?.topics?.[key]) => (
          <Input
            name={name}
            ref={form.register}
            key={key}
            link={false}
            loading={loading}
            errors={form.errors[name]}
            results={res}
            onClick={onClick[key]}
            valid={valid[key]}
            onChange={e => onChange[key] (res) (e)}
            onEnt={onEnt}
            {...props}
          />
        )) (times)}
      <Buttons>
        <form onSubmit={onSubmit.previous}>
          <Button type='submit'>
            Previous
          </Button>
        </form>
        <form onSubmit={onSubmit.next}>
          <Button primary type='submit'>
            Next
          </Button>
        </form>
        <form onSubmit={onSubmit.finish}>
          <Button type='submit'>
            Finish
          </Button>
        </form>
      </Buttons>
    </InputForm_>
  </div>
}

// export default hooks.withReviewTopics (`topics`) (Topics)
export default Topics