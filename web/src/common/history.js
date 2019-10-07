import {createBrowserHistory} from 'history'

export const

history = createBrowserHistory(),

navto = url => () => history.push(url)
