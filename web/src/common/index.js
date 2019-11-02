/* eslint-disable max-lines */
import * as R from 'ramda'
import * as yup from 'yup'
import styled, {css} from 'styled-components'
import React, {useState, useContext, useEffect, useMemo, useRef, forwardRef, useCallback} from 'react'
import {Link, NavLink, Switch, Redirect, Router, Route, withRouter} from 'react-router-dom'
import useForm, {FormContext, useFormContext} from 'react-hook-form'
import {Cookies, CookiesProvider, useCookies} from 'react-cookie'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {gql} from 'apollo-boost'
// Hack, see https://github.com/apollographql/apollo-client/issues/4843#issuecomment-495585495
// TODO: Migrate to ApolloClient@3.0.0 (will be released in Nov 19)
import ApolloClient from 'apollo-boost/lib/index'
import {ApolloProvider, useQuery, useLazyQuery, useMutation} from '@apollo/react-hooks'
import {useQueryParam, NumberParam, StringParam} from 'use-query-params'
import {flatten} from 'flattenjs'

/* /common */
import H from './helpers'
// import styled from './styled'
import * as CONST from './const/text'
import * as validation from './validation'
import hooks from './hooks'
import * as W from './with'
import * as CSS_CONST from './const/css'

/* /apollo */

/* External */
// import ReactTooltip from 'react-tooltip'

/* No dependencies */
import Icon from 'components/icon'
import AuthOptions from 'components/auth-options'
import Checkbox from 'components/checkbox'
import Footer from 'components/footer'
import Input from 'components/input'
import NavMenu from 'components/nav-menu'
import NotFound from 'components/not-found'
import RadioGroup from 'components/radio-group'
import Title from 'components/title'
import Hr from 'components/hr'
import SplitButton from 'components/split-button'

/* Special */
import Panel from 'components/panel/top.sc'

/* Icon */
import Button from 'components/button'

/* Button */
import AmosChat from 'components/amos-chat'

/* AuthOptions, Button */
import AuthBox from 'components/auth-box'

/* NavMenu, Footer */
import PageLayout from 'components/page-layout'

export {
  R,
  yup,
  styled, css,
  React, useState, useMemo, useRef, forwardRef, useCallback, useContext, useEffect, // React
  Link, NavLink, Switch, Router, Redirect, Route, withRouter, // React Router DOM
  useForm, FormContext, useFormContext,
  // myUseForm,
  // connect,
  Cookies, CookiesProvider, useCookies,
  InMemoryCache,
  ApolloClient, gql, // Apollo Client
  ApolloProvider, useQuery, useLazyQuery, useMutation, // Apollo React Hooks
  useQueryParam, NumberParam, StringParam, // useQueryParams
  flatten,
  /* /apollo */
  /* /common */
  H,
  CONST,
  validation,
  hooks,
  W,
  CSS_CONST,
  /* External */
  // ReactTooltip,
  /* Components */
  Icon,
  AuthOptions,
  Checkbox,
  Footer,
  Input,
  NavMenu,
  NotFound,
  RadioGroup,
  Title,
  Hr,
  SplitButton,
  Panel,
  Button,
  AmosChat,
  AuthBox,
  PageLayout,
}
