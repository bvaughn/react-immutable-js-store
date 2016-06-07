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
      case ICON_TYPE.LEFT_ARROW:
        return <path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' />
      case ICON_TYPE.REDO:
        return <path d='M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z' />
      case ICON_TYPE.RIGHT_ARROW:
        return <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
      case ICON_TYPE.UNDO:
        return <path d='M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z' />
    }
  }
}

export const ICON_TYPE = {
  COMPLETE: 'COMPLETE',
  DELETE: 'DELETE',
  DOWN_ARROW: 'DOWN_ARROW',
  INCOMPLETE: 'INCOMPLETE',
  LEFT_ARROW: 'LEFT_ARROW',
  REDO: 'REDO',
  RIGHT_ARROW: 'RIGHT_ARROW',
  UNDO: 'UNDO'
}

