import Authorized from './authorized'
import Guest from './guest'
import React from 'react'

const Search = ({isAuthenticated}) => (
  isAuthenticated ? <Authorized/> : <Guest/>
)

export default (Search)
