import {req} from './generic'

/* Matches "everything" except ./index.js */
export default req (__dirname) (`.`) (/\.\/(?!index).+\.js/)
