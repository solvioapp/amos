import {H, SplitButton, Icon} from 'common'

const top = H.css`
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  border: 1.3px solid black;
  padding: 10px 15px;
  margin: 48px auto;
  /* text-align: justify; */
  word-break: break-word;
  hyphens: auto;

  /* > * {
    margin: 10px 0;
  } */

  > p {
    margin: 10px 0;
  }

  ${Icon} {
    margin-bottom: 10px;
  }

  ${SplitButton} {
    margin-top: -5px;
    margin-bottom: 5px;
  }

  /* * {
    margin: 10px 0;
  } */

`
  /* ${SplitButton} {
    margin
  } */

export default top