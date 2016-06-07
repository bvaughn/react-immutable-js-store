/** @flow */
import React, { Component, PropTypes } from 'react'
import { createStore } from './createStore'
import { Icon, ICON_TYPE } from './Icon'
import { TodoList } from './TodoList'
import { connect } from '../source'
import styles from './Application.css'

export class Application extends Component {
  static propTypes = {
    hasNext: PropTypes.bool.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    jumpToEnd: PropTypes.func.isRequired,
    jumpToStart: PropTypes.func.isRequired,
    stepBack: PropTypes.func.isRequired,
    stepForward: PropTypes.func.isRequired
  };

  render () {
    const {
      hasNext,
      hasPrevious,
      jumpToEnd,
      jumpToStart,
      stepBack,
      stepForward
    } = this.props

    return (
      <div className={styles.Application}>
        <h1 className={styles.Header}>
          <a
            className={styles.HeaderLink}
            href='https://github.com/bvaughn/react-immutable-js-store'
          >
            react-immutable-js-store
          </a>
        </h1>
        <p className={styles.Lead}>
          Todo Mvc app built with <a href='https://github.com/bvaughn/immutable-js-store'>immutable-js-store</a>.
        </p>

        <section className={styles.Timeline}>
          <button
            className={styles.TimelineButton}
            disabled={!hasPrevious}
            onClick={jumpToStart}
          >
            <Icon
              className={styles.TimelineSvg}
              type={ICON_TYPE.REWIND}
            />
            start
          </button>
          <button
            className={styles.TimelineButton}
            disabled={!hasPrevious}
            onClick={stepBack}
          >
            <Icon
              className={styles.TimelineSvg}
              type={ICON_TYPE.UNDO}
            />
            undo
          </button>
          <button
            className={styles.TimelineButton}
            disabled={!hasNext}
            onClick={stepForward}
          >
            <Icon
              className={styles.TimelineSvg}
              type={ICON_TYPE.REDO}
            />
            redo
          </button>
          <button
            className={styles.TimelineButton}
            disabled={!hasNext}
            onClick={jumpToEnd}
          >
            <Icon
              className={styles.TimelineSvg}
              type={ICON_TYPE.FAST_FORWARD}
            />
            end
          </button>
        </section>

        <TodoList {...this.props} />

        <footer className={styles.Footer}>
          Created by <a href='https://github.com/bvaughn'>Brian Vaughn</a>.
        </footer>
      </div>
    )
  }
}

// Connect Application component to subscribe to the store for property updates.
export default connect(createStore())(Application)
