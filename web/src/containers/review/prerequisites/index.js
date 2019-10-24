import {
  React, hooks, R,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const Prerequisites = (props) => {
  // const {
  //   results, messages, isValid,
  //   onSubmit, onClick, form, onChange, ...rest
  // } = hooks.useReviewTopics (`prerequisites`) (props)
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid
  } = hooks.useReviewTopics (`topics`) (props)

  return <div css={Top_} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Prerequisites</Title>
      {R.times (
        (key,
          name = `topic[${key}]`,
          res = results?.topic?.[key]) => (
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
        )) (times)}
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
    </InputForm_>
  </div>
}
// <Input
//   name='prerequisites'
//   ref={form.register}
//   link={false}
//   errors={form.errors}
//   dropdown={!isValid}
//   onChange={onChange[0]}
//   {...{results, onClick}}
// />

// export default hooks.withReviewTopics (`prerequisites`) (Prerequisites)
export default Prerequisites