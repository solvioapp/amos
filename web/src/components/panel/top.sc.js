import {css, styled, Title} from 'common'

const one = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  width: 100%;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const two = css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const left = css`  
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

const Top_ = css`
  ${({columns = 'one'}) => options[columns]}
  > ${Title} {
    margin-bottom: 24px
  }
`

export default Top_
