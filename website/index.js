/** @flow */
import 'babel-polyfill'

import Application from './Application'
import React from 'react'
import { render } from 'react-dom'
import './index.css'

render(
  <Application/>,
  document.getElementById('root')
)
