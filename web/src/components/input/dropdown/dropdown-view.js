import {
  React, H
} from 'common'
import useDropdownHook from './dropdown-hook'
import top from './dropdown-top'

const View = (props) => {
  const {results} = props,
  {renderResults} = useDropdownHook (props)

  return (
    <div css={top} {...props}>
      <div className='dropdown'>
        {H.safeMap (renderResults) (results)}
      </div>
    </div>
  )
}

export default H.styled (View) ``