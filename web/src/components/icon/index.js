import {H, React} from 'common'
import Top_ from './top.sc'
import iconsList from './svg'

function Icon ({src, className, ...rest}) {
  const svg = typeof src === `string` ? iconsList[src] : src
  if (!svg) {
    throw new Error(`No icon found: '${src}'`)
  }
  return (
    <svg viewBox={svg.viewBox} {...{className}}>
      <use xlinkHref={svg.url}/>
    </svg>
  )
}

export default H.style (Icon) (Top_)
