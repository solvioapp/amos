import {R, styled, css, CONST} from 'common'

const

{avatar_size_regular, avatar_size_large, avatar_size_small} = CONST,

options = {
  none: css`
    height: 0;
    width: 0;
  `,

  small: css`
    min-height: ${avatar_size_small}px;
    width: ${avatar_size_small}px;
    margin-top: ${(avatar_size_large - avatar_size_small) / 2}px;
  `,

  regular: css`
    min-height: ${avatar_size_regular}px;
    width: ${avatar_size_regular}px;
    margin-top: ${(avatar_size_large - avatar_size_regular) / 2}px;
  `,
    // margin-top: ${avatar_size_regular / 2 - 21.7}px;
    /* margin-top: ${avatar_size_regular / 2 - 21.7+ (avatar_size_large - avatar_size_regular) / 2}px; */

  large: css`
    min-height: ${avatar_size_large}px;
    width: ${avatar_size_large}px;
  `,
},

Top_ = css`
  /* background-color: #f3f3f3;
  border-radius: 50%;
  border: 1px black solid; */
  display: inline;
  ${props => options[props.size]};
`

export default Top_
