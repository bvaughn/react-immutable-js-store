/** @flow */
import cn from 'classnames'
import Immutable from 'immutable'
import ImmutableStore from 'immutable-js-store'
import React, { Component, PropTypes } from 'react'
import { Icon, ICON_TYPE } from './Icon'
import { connect } from '../source'
import styles from './Application.css'

export class Application extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    newItemText: PropTypes.string.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    removeItemAt: PropTypes.func.isRequired,
    setNewItemText: PropTypes.func.isRequired,
    stepBack: PropTypes.func.isRequired,
    stepForward: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleItemAt: PropTypes.func.isRequired
  };

  render () {
    const {
      addItem,
      hasNext,
      hasPrevious,
      newItemText,
      items,
      removeItemAt,
      setNewItemText,
      stepBack,
      stepForward,
      toggleAll,
      toggleItemAt
    } = this.props

    return (
      <div className={styles.Application}>
        <h1 className={styles.Header}>
          immutable-js-store
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

        <section className={styles.InputContainer}>
          <div
            className={styles.ToggleAllButton}
            onClick={toggleAll}
          >
            <Icon type={ICON_TYPE.DOWN_ARROW} />
          </div>
          <input
            className={styles.Input}
            onChange={({ target }) => setNewItemText(target.value)}
            onKeyDown={({ key, target }) => key === 'Enter' && addItem(target.value)}
            placeholder='What needs to be done?'
            value={newItemText}
          />
        </section>

        <section className={styles.Section}>
          <ul className={styles.TodoList}>
            {items.map((item, index) => {
              const completed = item.get('completed')

              const iconClassName = cn(styles.Toggle, {
                [styles.ToggledOn]: completed
              })
              const labelClassName = cn(styles.Label, {
                [styles.LabelCompleted]: completed
              })

              return (
                <li
                  className={styles.TodoItem}
                  key={index}
                >
                  <div
                    className={iconClassName}
                    onClick={() => toggleItemAt(index)}
                  >
                    <Icon type={completed ? ICON_TYPE.COMPLETE : ICON_TYPE.INCOMPLETE} />
                  </div>
                  <div className={labelClassName}>
                    {` ${item.get('text')} `}
                  </div>
                  <div
                    className={styles.DeleteButton}
                    onClick={() => removeItemAt(index)}
                  >
                    <Icon type={ICON_TYPE.DELETE} />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

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

export default connect({
  actions,
  subscriptions,
  store
})(Application)
