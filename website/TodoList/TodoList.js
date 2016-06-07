/** @flow */
import cn from 'classnames'
import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import { Icon, ICON_TYPE } from '../Icon'
import styles from './TodoList.css'

export class TodoList extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    clearAllItems: PropTypes.func.isRequired,
    filteredItems: PropTypes.instanceOf(Immutable.List).isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    newItemText: PropTypes.string.isRequired,
    removeItemAt: PropTypes.func.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    setNewItemText: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleItemAt: PropTypes.func.isRequired
  };

  render () {
    const {
      addItem,
      clearAllItems,
      filteredItems,
      items,
      newItemText,
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

        <section>
          <ul className={styles.TodoList}>
            {filteredItems.map((item, index) => {
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

        {items.size > 0 && (
          <section>
            <div className={styles.ListFooter}>
              {`${items.size} items`}

              <div className={styles.FooterButtonsRow}>
                <FooterButton
                  {...this.props}
                  tab='all'
                />
                <FooterButton
                  {...this.props}
                  tab='active'
                />
                <FooterButton
                  {...this.props}
                  tab='completed'
                />
              </div>

              <button
                className={styles.FooterButton}
                disabled={items.size === 0}
                onClick={clearAllItems}
              >
                Clear all
              </button>
            </div>
          </section>
        )}
      </div>
    )
  }
}

function FooterButton ({
  activeTab,
  setActiveTab,
  tab
}) {
  const className = cn(styles.FooterButton, {
    [styles.FooterButtonActive]: activeTab === tab
  })

  return (
    <button
      className={className}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  )
}
