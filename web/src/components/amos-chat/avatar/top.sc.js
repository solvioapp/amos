import {R, styled, css, CSS_CONST} from 'common'

const

{AVATAR_SIZE_REGULAR, AVATAR_SIZE_LARGE} = CSS_CONST,

options = {

none: css`
  height: 0;
  width: 0;
`,

regular: css`
  height: ${AVATAR_SIZE_REGULAR}px;
  width: ${AVATAR_SIZE_REGULAR}px;
  margin-top: ${(AVATAR_SIZE_LARGE - AVATAR_SIZE_REGULAR) / 2}px;
`,
  // margin-top: ${AVATAR_SIZE_REGULAR / 2 - 21.7}px;
  /* margin-top: ${AVATAR_SIZE_REGULAR / 2 - 21.7+ (AVATAR_SIZE_LARGE - AVATAR_SIZE_REGULAR) / 2}px; */

large: css`
  height: ${AVATAR_SIZE_LARGE}px;
  width: ${AVATAR_SIZE_LARGE}px;
`,
},

Avatar_ = styled.img`
  /* background-color: #f3f3f3;
  border-radius: 50%;
  border: 1px black solid; */
  display: inline;
  ${props => options[props.size]};
`

export default Avatar_