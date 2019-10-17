/* eslint-disable max-lines */
import * as R from 'ramda'
import * as yup from 'yup'
import styled, {css} from 'styled-components'
import React, {useState, useContext, useEffect, useMemo, useRef, useCallback} from 'react'
import {Link, NavLink, Switch, Redirect, Router, Route, withRouter} from 'react-router-dom'
import useForm, {FormContext, useFormContext} from 'react-hook-form'
import {Cookies, CookiesProvider, useCookies} from 'react-cookie'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {gql} from 'apollo-boost'
// Hack, see https://github.com/apollographql/apollo-client/issues/4843#issuecomment-495585495
// TODO: Migrate to ApolloClient@3.0.0 (will be released in Nov 19)
import ApolloClient from 'apollo-boost/lib/index'
import {ApolloProvider, useQuery, useLazyQuery, useMutation} from '@apollo/react-hooks'

/* /common */
import H from './helpers'
// import styled from './styled'
import * as CONST from './const/text'
import * as validation from './validation'
import W from './with'
import * as CSS_CONST from './const/css'

/* /apollo */

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
import Input from 'components/input'
import Input_ from 'components/input/top.sc'
import NavMenu from 'components/nav-menu'
import NavMenu_ from 'components/nav-menu/top.sc'
import NotFound from 'components/not-found'
import NotFound_ from 'components/not-found/top.sc'
import RadioGroup from 'components/radio-group'
import RadioGroup_ from 'components/radio-group/top.sc'
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
  R,
  yup,
  styled, css,
  React, useState, useMemo, useRef, useCallback, useContext, useEffect, // React
  Link, NavLink, Switch, Router, Redirect, Route, withRouter, // React Router DOM
  useForm, FormContext, useFormContext,
  // myUseForm,
  // connect,
  Cookies, CookiesProvider, useCookies,
  InMemoryCache,
  ApolloClient, gql, // Apollo Client
  ApolloProvider, useQuery, useLazyQuery, useMutation, // Apollo React Hooks
  /* /apollo */
  /* /common */
  H,
  CONST,
  validation,
  W,
  CSS_CONST,
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
