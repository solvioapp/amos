import * as R from 'ramda'
import * as yup from 'yup'
import * as H from './helpers'
import styled from 'styled-components'
import React, {useState, useContext, useEffect, useMemo, useRef, useCallback} from 'react'
import {Link, Switch, Redirect, Router, Route} from 'react-router-dom'
import store from 'store'
import {Provider} from 'react-redux'
import {history} from 'common/history'
import {gql} from 'apollo-boost'
// Hack, see https://github.com/apollographql/apollo-client/issues/4843#issuecomment-495585495
import ApolloClient from 'apollo-boost/lib/index'
import {ApolloProvider, useQuery, useMutation} from '@apollo/react-hooks'
import useForm from 'react-hook-form'

/* No dependencies */
import AmosChat from 'components/amos-chat'
import Icon from 'components/icon'
import AuthOptions from 'components/auth-options'
import Checkbox from 'components/checkbox'
import Footer from 'components/footer'
import IncrementalInputs from 'components/incrementalInputs'
import Input from 'components/input'
import NavMenu from 'components/nav-menu'
import NotFound from 'components/not-found'
import Radio from 'components/radio'
import RadioGroup from 'components/radioGroup'
import Title from 'components/title'

/* Special */
// import Panel from 'components/panel'

/* Icon */
import Button from 'components/button'

/* AuthOptions, Button */
import AuthBox from 'components/auth-box'

/* NavMenu, Footer */
import PageLayout from 'components/page-layout'

export {
  R, H,
  yup,
  styled,
  React, useState, useMemo, useRef, useCallback, useContext, useEffect, // React
  Link, Switch, Router, Redirect, Route, // React Router DOM
  store,
  Provider,
  history,
  ApolloClient, gql, // Apollo Client
  ApolloProvider, useQuery, useMutation, // Apollo React Hooks
  useForm,
  /* Components */
  AmosChat,
  Icon,
  AuthOptions,
  Checkbox,
  Footer,
  IncrementalInputs,
  Input,
  NavMenu,
  NotFound,
  Radio,
  RadioGroup,
  Title,
  Button,
  AuthBox,
  PageLayout,
}

/* See https://regexr.com/4lqmp */
// const req = require.context(`../components`, true, /\.\/[\w-]+\/index\.js/)

// const compList = req.keys().reduce ((list, path) => {
//   const foldername = R.prop (`1`) (R.split (`/`) (path))
//   const comp = H.kebabToCamel (foldername)
//   comp |> console.log ('comp', #)
//   list[comp] = req (path).default

//   return list
// }, {})

// compList |> console.log ('compList', #)

// export default R.merge (compList) ({
//   R,
//   React,
//   Link,
//   H,
// })

// toReturn |> console.log ('toReturn', #)

// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
// console.log(x); // 1
// console.log(y); // 2
// console.log(z); // { a: 3, b: 4 }

// let n = { x, y, ...z };
// console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

// console.log({...toReturn})

// // exports |> console.log ('exports', #)
// module |> console.log ('module', #)

// export ({...toReturn})

// export {...toReturn}

// export default {'hi':'hi'}

// R.merge () ({
//   React,
//   styled,
//   ...
// })