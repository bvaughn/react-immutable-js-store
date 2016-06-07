/** @flow */
import Immutable from 'immutable'
import ImmutableStore from 'immutable-js-store'

export function createStore () {
  // Initialize store with default data
  const store = new ImmutableStore({
    activeTab: 'all',
    items: [],
    newItemText: ''
  })

  // Expose the current state of the store to the "connected" component
  const subscriptions = {
    activeTab: ['activeTab'],
    hasNext: () => store.hasNext(),
    hasPrevious: () => store.hasPrevious(),
    filteredItems: (state) => {
      const activeTab = state.get('activeTab')
      const items = state.get('items')

      return items.filter((item) => (
        activeTab === 'all' ||
        (activeTab === 'active' && !item.get('completed')) ||
        (activeTab === 'completed' && item.get('completed'))
      ))
    },
    items: ['items'],
    newItemText: ['newItemText']
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
    clearAllItems: () => {
      store.set('items', Immutable.List())
    },
    jumpToEnd: () => {
      store.jumpToEnd()
    },
    jumpToStart: () => {
      store.jumpToStart()
    },
    removeItemAt: (index) => {
      store.deleteIn(['items', index])
    },
    setActiveTab: (tab) => {
      store.set('activeTab', tab)
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

  return {
    actions,
    store,
    subscriptions
  }
}
