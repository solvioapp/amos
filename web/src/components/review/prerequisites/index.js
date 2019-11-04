import {
  React, hooks, R, useState, H, useCallback, CONST,
  AmosChat, Button, Title, Input, RadioGroup, Hr
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const Prerequisites = (props) => {
  const [checked, setChecked] = useState ([])
  const setOneChecked = useCallback ((key) => val => {
    key |> console.log ('setOneChecked key', #)
    val |> console.log ('setOneChecked val', #)
    setChecked (H.update (key) (val))
  })
  checked |> console.log ('setOneChecked checked', #)
  const {
    results, messages, times, onChange, loading,
    onSubmit, onClick, form, onEnt, valid, checkboxesValid
  } = hooks.useReviewTopics (`prerequisite`) ({...props, setOneChecked})


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
          <Button primary type='submit'>
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
              elements={CONST.elements.strength}
              _key={key}
              onClick={(e, _checked) => onClick [3 * key] (e, key, `strength`, _checked)}
              checked={checked?.[3 * key]}
              setChecked={setOneChecked (3 * key)}
              {...{form}}
            />
            <RadioGroup
              header='for people to be atleast:'
              name={`prerequisite[${key}].level`}
              elements={CONST.elements.level}
              _key={key}
              onClick={(e, _checked) => onClick [3 * key + 1] (e, key, `level`, _checked)}
              footer='in:'
              checked={checked?.[3 * key + 1]}
              setChecked={setOneChecked (3 * key + 1)}
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