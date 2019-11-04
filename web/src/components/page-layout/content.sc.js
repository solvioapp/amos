import styled from 'styled-components'

const Content_ = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
  padding-bottom: 65px;

  @media (min-width: 768px) {
    margin-top: 20vh;
  }
`

export default Content_
