import {H, React, styled, css} from 'common'
import Top_ from './icon-top.sc'
import iconsList from './svg'

function Icon ({src, book, ...rest}) {
  const svg = typeof src === `string` ? iconsList[src] : src
  if (!svg) {
    throw new Error(`No icon found: '${src}'`)
  }
  return (
    <svg viewBox={svg.viewBox} css={Top_} {...{book}} {...rest}>
      <use xlinkHref={svg.url}/>
    </svg>
  )
}

export default styled (Icon) ``
