/** @flow */
import cn from 'classnames'
import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import { Icon, ICON_TYPE } from '../Icon'
import styles from './TodoList.css'

export class TodoList extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    newItemText: PropTypes.string.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    removeItemAt: PropTypes.func.isRequired,
    setNewItemText: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleItemAt: PropTypes.func.isRequired
  };

  render () {
    const {
      addItem,
      newItemText,
      items,
      removeItemAt,
      setNewItemText,
      toggleAll,
      toggleItemAt
    } = this.props

    return (
      <div className={styles.TodoList}>
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
              const text = item.get('text')

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
                    {` ${text} `}
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
      </div>
    )
  }
}
