/** @flow */
import { Component, createElement } from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export function connect ({
  actions = {},
  component,
  options = {},
  subscriptions = {},
  store
}) {
  const {
    pure = true
  } = options

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
        Object.keys(subscriptions).forEach(
          (key) => {
            const path = subscriptions[key]

            this.setState({
              [path]: store.getIn(path)
            })

            const unsubscribe = store.subscribeIn(path, (value) => {
              this.stateHasChanged = true
              this.setState({
                [path]: value
              })
            })

            unsubscribes.push(unsubscribe)
          }
        )
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
        return !pure || this.propsHaveChanged || this.stateHasChanged
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
