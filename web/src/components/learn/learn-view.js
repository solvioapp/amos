import {
  React, hooks,
  Input, AmosChat
} from 'common'
import top from './learn-top.sc'

const messages = [
  `Watcha interested in? 🤗`
]

const Learn = ({onEnt, results, register, onSubmit, ...rest}) => (
  <form css={top} autocomplete='off' onSubmit={onSubmit}>
    <AmosChat avatar='small'>
      {messages}
    </AmosChat>
    <Input
      name='str'
      link={true}
      onEnt={onEnt}
      results={results}
      ref={register}
      {...rest}
    />
  </form>
)

export default hooks.withSearch (Learn)
