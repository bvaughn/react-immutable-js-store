/** @flow */
import Immutable from 'immutable'
import ImmutableStore from 'immutable-js-store'
import React, { Component, PropTypes } from 'react'
import { connect } from '../source'

export class Application extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    newItemText: PropTypes.string.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    removeItemAt: PropTypes.func.isRequired,
    setNewItemText: PropTypes.func.isRequired,
    toggleItemAt: PropTypes.func.isRequired
  };

  render () {
    const {
      addItem,
      newItemText,
      items,
      removeItemAt,
      setNewItemText,
      toggleItemAt
    } = this.props

    return (
      <div className='container'>
        <div className='jumbotron'>
          <h1>immutable-js-store</h1>
          <p className='lead'>
            TODO MVC app built with <a href='https://github.com/bvaughn/immutable-js-store'>immutable-js-store</a>.
          </p>
        </div>

        <input
          onChange={({ target }) => setNewItemText(target.value)}
          onKeyDown={({ key, target }) => key === 'Enter' && addItem(target.value)}
          value={newItemText}
        />

        <ul className='list-group'>
          {items.map((item, index) => {
            const iconClassName = item.get('completed')
              ? 'glyphicon glyphicon-ok-circle'
              : 'glyphicon glyphicon-unchecked'

            return (
              <li
                className='list-group-item'
                key={index}
              >
                <span onClick={() => toggleItemAt(index)}>
                  <span className={iconClassName}></span>
                  {` ${item.get('text')} `}
                </span>
                <span
                  className='glyphicon glyphicon-remove-circle'
                  onClick={() => removeItemAt(index)}
                ></span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const store = new ImmutableStore({
  items: [],
  newItemText: ''
})

const subscriptions = {
  newItemText: ['newItemText'],
  items: ['items']
}

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
