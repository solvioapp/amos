/* eslint-disable max-lines */
import * as R from 'ramda'
import * as yup from 'yup'
import styled, {css} from 'styled-components'
import React, {useState, useContext, useEffect, useMemo, useRef, useCallback} from 'react'
import {Link, NavLink, Switch, Redirect, Router, Route, withRouter} from 'react-router-dom'
import useForm from 'react-hook-form'
import {Cookies, CookiesProvider, useCookies} from 'react-cookie'
import {history} from 'common/history'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {gql} from 'apollo-boost'
// Hack, see https://github.com/apollographql/apollo-client/issues/4843#issuecomment-495585495
import ApolloClient from 'apollo-boost/lib/index'
import {ApolloProvider, useQuery, useLazyQuery, useMutation} from '@apollo/react-hooks'

/* /common */
import * as H from './helpers'
// import styled from './styled'
import {myUseForm} from './hooks'
import {navto, redirect} from './history'
import * as CONST from './const/text'
import * as CSS_CONST from './const/css'
import * as validation from './validation'

/* /apollo */
import * as connect from 'apollo/connect'

/* External */
import ReactTooltip from 'react-tooltip'

/* No dependencies */
import Icon from 'components/icon'
import Icon_ from 'components/icon/top.sc'
import AuthOptions from 'components/auth-options'
import AuthOptions_ from 'components/auth-options/top.sc'
import Checkbox from 'components/checkbox'
import Checkbox_ from 'components/checkbox/top.sc'
import Footer from 'components/footer'
import Footer_ from 'components/footer/top.sc'
import IncrementalInputs from 'root/src/components/incremental-inputs'
import IncrementalInputs_ from 'root/src/components/incremental-inputs/top.sc'
import Input from 'components/input'
import Input_ from 'components/input/top.sc'
import NavMenu from 'components/nav-menu'
import NavMenu_ from 'components/nav-menu/top.sc'
import NotFound from 'components/not-found'
import NotFound_ from 'components/not-found/top.sc'
import RadioGroup from 'root/src/components/radio-group'
import RadioGroup_ from 'root/src/components/radio-group/top.sc'
import Title from 'components/title'
import Title_ from 'components/title/top.sc'

/* Special */
// import Panel from 'components/panel'

/* Icon */
import Button from 'components/button'
import Button_ from 'components/button/top.sc'

/* Button */
import AmosChat from 'components/amos-chat'
import AmosChat_ from 'components/amos-chat/top.sc'

/* AuthOptions, Button */
import AuthBox from 'components/auth-box'
import AuthBox_ from 'components/auth-box/top.sc'

/* NavMenu, Footer */
import PageLayout from 'components/page-layout'
import PageLayout_ from 'components/page-layout/top.sc'

export {
  R, H,
  yup,
  styled, css,
  React, useState, useMemo, useRef, useCallback, useContext, useEffect, // React
  Link, NavLink, Switch, Router, Redirect, Route, withRouter, // React Router DOM
  useForm,
  myUseForm,
  Cookies, CookiesProvider, useCookies,
  history,
  InMemoryCache,
  ApolloClient, gql, // Apollo Client
  ApolloProvider, useQuery, useLazyQuery, useMutation, // Apollo React Hooks
  /* /apollo */
  connect,
  /* /common */
  navto, redirect,
  CONST,
  CSS_CONST,
  validation,
  /* External */
  ReactTooltip,
  /* Components */
  Icon,
  Icon_,
  AuthOptions,
  AuthOptions_,
  Checkbox,
  Checkbox_,
  Footer,
  Footer_,
  IncrementalInputs,
  IncrementalInputs_,
  Input,
  Input_,
  NavMenu,
  NavMenu_,
  NotFound,
  NotFound_,
  RadioGroup,
  RadioGroup_,
  Title,
  Title_,
  Button,
  Button_,
  AmosChat,
  AmosChat_,
  AuthBox,
  AuthBox_,
  PageLayout,
  PageLayout_,
}
