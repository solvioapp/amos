import styled from 'styled-components'

const Content_ = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${({match}) => {match |> console.log ('match', #)}};
  padding: 30px;
`

export default Content_
