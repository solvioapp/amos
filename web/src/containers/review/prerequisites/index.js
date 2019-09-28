import Authorized from './authorized'
import Guest from './guest'
import React, {useCallback, useState} from 'react'
import connect from '../connect'
import {navto} from 'common/history'
import {filter, isEmpty, not, pipe} from 'ramda'
import {useReviewCtx} from '../'

const Prerequisites = ({isAuthenticated}) => (
  isAuthenticated ? <Authorized/> : <Guest/>
)

const filterEmptyArrays = filter(pipe(
  isEmpty,
  not,
))

const goTopics = navto(`/review/topics`)
const goThanks = navto(`/review/thanks`)

export const useReqState = () => {
  const {setPrerequisites, prerequisites: initItems} = useReviewCtx()

  const [prerequisites, setPrereqs] = useState(initItems || [])

  const goPrev = useCallback(() => {
    setPrerequisites(filterEmptyArrays(prerequisites))
    goTopics()
  }, [prerequisites, setPrerequisites])

  const goFinish = useCallback(() => {
    setPrerequisites(filterEmptyArrays(prerequisites), true)
    goThanks()
  }, [prerequisites, setPrerequisites])

  return {
    setPrerequisites: setPrereqs,
    goPrev,
    goFinish,
    initItems,
  }
}

export default connect(Prerequisites)
