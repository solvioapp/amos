import * as R from 'ramda'
import * as yup from 'yup'
import * as H from './helpers'
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

/* /apollo */
import * as con from 'apollo/connect'

/* /common */
import {navto} from './history'
import * as CONST from './const'

/* No dependencies */
import AmosChat from 'components/amos-chat'
import Icon from 'components/icon'
import AuthOptions from 'components/auth-options'
import Checkbox from 'components/checkbox'
import Footer from 'components/footer'
import IncrementalInputs from 'root/src/components/incremental-inputs'
import Input from 'components/input'
import NavMenu from 'components/nav-menu'
import NotFound from 'components/not-found'
import RadioGroup from 'root/src/components/radio-group'
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
  styled, css,
  React, useState, useMemo, useRef, useCallback, useContext, useEffect, // React
  Link, NavLink, Switch, Router, Redirect, Route, withRouter, // React Router DOM
  useForm,
  Cookies, CookiesProvider, useCookies,
  history,
  InMemoryCache,
  ApolloClient, gql, // Apollo Client
  ApolloProvider, useQuery, useLazyQuery, useMutation, // Apollo React Hooks
  /* /apollo */
  con,
  /* /common */
  navto,
  CONST,
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
  RadioGroup,
  Title,
  Button,
  AuthBox,
  PageLayout,
}
