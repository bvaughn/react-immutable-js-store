/** @flow */
import cn from 'classnames'
import React, { Component, PropTypes } from 'react'
import styles from './Icon.css'

export class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  render () {
    const { className } = this.props

    return (
      <svg
        className={cn(styles.Svg, className)}
        height='24'
        width='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 0h24v24H0z' fill='none' />
        {this._getPath()}
    </svg>
    )
  }

  _getPath () {
    const { type } = this.props

    switch (type) {
      case ICON_TYPE.COMPLETE:
        return <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
      case ICON_TYPE.DELETE:
        return <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
      case ICON_TYPE.DOWN_ARROW:
        return <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' />
      case ICON_TYPE.INCOMPLETE:
        return <path d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
    }
  }
}

export const ICON_TYPE = {
  COMPLETE: 'COMPLETE',
  DELETE: 'DELETE',
  DOWN_ARROW: 'DOWN_ARROW',
  INCOMPLETE: 'INCOMPLETE'
}

