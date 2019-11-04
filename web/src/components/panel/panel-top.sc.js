import {H, Title} from 'common'

const one = H.css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  width: 100%;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const two = H.css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12.5vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const left = H.css`  
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const options = {
  one, two, left
}

const Top_ = H.css`
  ${'' /* ${props => console.log(`props Panel`, props)} */}
  ${({columns = 'one'}) => options[columns]}
  > ${Title} {
    margin-bottom: 24px
  }
`

export default Top_
