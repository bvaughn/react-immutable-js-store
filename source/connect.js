/** @flow */
import { Component, createElement } from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export function connect ({
  actions = {},
  component,
  subscriptions = {},
  store
}) {
  // @TODO invariant for :component and :store

  return function wrapWithConnect (WrappedComponent) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    const unsubscribes = []

    class Connected extends Component {
      static displayName = displayName;
      static WrappedComponent = WrappedComponent;

      constructor (props, context) {
        super(props, context)

        this.propsHaveChanged = false
        this.stateHasChanged = false
      }

      componentWillMount () {
        const hooks = []
        const initialState = {}

        Object.keys(subscriptions).forEach(
          (key) => {
            const pathOrFunction = subscriptions[key]

            let value

            // Array properties should be setup as subscribers to auto-update their keys.
            // Callbacks (functions) should be triggered by a single, root subscription.
            // All other values are assumed to be static for now.
            if (Array.isArray(pathOrFunction)) {
              value = store.getIn(pathOrFunction)

              const unsubscribe = store.subscribeIn(pathOrFunction, (value) => {
                this.stateHasChanged = true
                this.setState({
                  [key]: value
                })
              })

              unsubscribes.push(unsubscribe)
            } else if (typeof pathOrFunction === 'function') {
              value = pathOrFunction(store.getState())

              hooks.push({
                callback: pathOrFunction,
                key
              })
            } else {
              value = pathOrFunction
            }

            initialState[key] = value
          }
        )

        if (hooks.length) {
          const unsubscribe = store.subscribe(
            (state) => {
              const stateUpdates = {}

              hooks.forEach((hook) => {
                stateUpdates[hook.key] = hook.callback(state)
              })

              this.setState(stateUpdates)
            }
          )

          unsubscribes.push(unsubscribe)
        }

        this.setState(initialState)
      }

      componentWillUnmount () {
        unsubscribes.forEach(
          (unsubscribe) => unsubscribe()
        )
      }

      componentWillReceiveProps (nextProps) {
        if (!shallowCompare(nextProps, this.props)) {
          this.propsHaveChanged = true
        }
      }

      shouldComponentUpdate () {
        return this.propsHaveChanged || this.stateHasChanged
      }

      render () {
        this.stateHasChanged = false

        return createElement(WrappedComponent, {
          ...actions,
          ...this.state,
          ...this.props
        })
      }
    }

    return Connected
  }
}
