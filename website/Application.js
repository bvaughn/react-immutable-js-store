/** @flow */
import Immutable from 'immutable'
import ImmutableStore from 'immutable-js-store'
import React, { Component, PropTypes } from 'react'
import { Icon, ICON_TYPE } from './Icon'
import { TodoList } from './TodoList'
import { connect } from '../source'
import styles from './Application.css'

export class Application extends Component {
  static propTypes = {
    hasNext: PropTypes.bool.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    stepBack: PropTypes.func.isRequired,
    stepForward: PropTypes.func.isRequired
  };

  render () {
    const {
      hasNext,
      hasPrevious,
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
            onClick={stepBack}
          >
            <Icon type={ICON_TYPE.UNDO} />
            undo
          </button>
          <button
            className={styles.TimelineButton}
            disabled={!hasNext}
            onClick={stepForward}
          >
            <Icon type={ICON_TYPE.REDO} />
            redo
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

// Initialize store with default data
const store = new ImmutableStore({
  items: [],
  newItemText: ''
})

// Expose the current state of the store to the "connected" component
const subscriptions = {
  hasNext: () => store.hasNext(),
  hasPrevious: () => store.hasPrevious(),
  newItemText: ['newItemText'],
  items: ['items']
}

// Expose updates to the store to the "connected" component
const actions = {
  addItem: (text) => {
    if (text) {
      store.update('items', (list) => list.push(
        Immutable.Map({
          completed: false,
          text
        })
      ))
      store.set('newItemText', '')
    }
  },
  removeItemAt: (index) => {
    store.deleteIn(['items', index])
  },
  setNewItemText: (text) => {
    store.set('newItemText', text)
  },
  stepBack: () => {
    store.stepBack()
  },
  stepForward: () => {
    store.stepForward()
  },
  toggleAll: () => {
    const items = store.get('items')
    if (items.size) {
      const value = !items.getIn([0, 'completed'])

      store.update('items',
        (items) => items.map(
          (item) => item.set('completed', value)
        )
      )
    }
  },
  toggleItemAt: (index) => {
    store.updateIn(
      ['items', index, 'completed'],
      (completed) => !completed
    )
  }
}

// Connect the "dumb" Application component to subscribe to the store for property updates.
export default connect({
  actions,
  subscriptions,
  store
})(Application)
