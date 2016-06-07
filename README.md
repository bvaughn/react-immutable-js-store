react-immutable-js-store
-----
React wrapper around immutable-js-store.

### Installation
```
npm install react-immutable-js-store
```

### Api

##### `connect({ actions, component, store, subscriptions })`

Connects a React component to an `immutable-js-store` store.
This function accepts the following named parameters:

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| actions | Object |  | Expose updates to the store to the connected component |
| component | Component | ✓ | Decorated component to be connected to the store |
| store | ImmutableStore | ✓ | Store |
| subscriptions | Object |  | Expose the current state of the store to the connected component |

### Example
```js
import React, { Component } from 'react'
import ImmutableStore from 'immutable-js-store'
import { connect } from 'react-immutable-js-store'

// Initialize store with default data
const store = new ImmutableStore({
  items: [],
  newItemText: ''
})

// Expose the current state of the store to the "connected" component.
// Keys with Array values will be subscribed and have their props auto-updated.
// Keys with Function values will be called each time the store changes.
const subscriptions = {
  hasNext: (state) => store.hasNext(),
  hasPrevious: (state) => store.hasPrevious(),
  newItemText: ['newItemText'],
  items: ['items']
}

// Expose updates to the store to the "connected" component
const actions = {
  addItem: (text) => {},
  removeItemAt: (index) => {},
  stepBack: () => {
    store.stepBack()
  },
  stepForward: () => {
    store.stepForward()
  },
  toggleAll: () => {},
  toggleItemAt: (index) => {}
}

// Dumb component to be connected to the ImmutableStore.
class Application extends Component {
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
    // ...
  }
}

// Connect the 
export default connect({
  actions,
  subscriptions,
  store
})(Application)
```
