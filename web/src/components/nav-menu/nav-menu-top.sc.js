import {H} from 'common'

const top = H.css`
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    order: 100;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 100;
    width: 100%;
    padding-left: 0;
  }
`

export default top
