import {useEffect} from 'react'

export const

useMount = mount => useEffect(
  mount, []
),

useUnmount = unmount => useEffect(
  () => () => {
    unmount && unmount()
  }, []
)
