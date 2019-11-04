import {
  H, React, R,
  AmosChat, Button, Title, Input
} from 'common'
import {useReviewTopics} from '../review-hook'
import Buttons from '../buttons.sc'
import InputForm_ from '../input-form.sc'
import Top_ from '../review-top.sc'

const Topics = (props) => {
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid
  } = useReviewTopics (`topic`) (props)

  return <div css={Top_} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Topics</Title>
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
    </InputForm_>
  </div>
}

// export default hooks.withReviewTopics (`topics`) (Topics)
export default Topics