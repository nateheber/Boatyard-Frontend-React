import React from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'

import NewLineItems from '../infoSections/NewLineItem'
import LineItem from '../infoSections/LineItem'
import Section from '../basic/Section'
import ButtonGroup from '../basic/ButtonGroup'

import { updateLineItem, deleteLineItem, createLineItem } from 'reducers/lineItems'

class LineItemSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItems: [],
      lineItems: props.lineItems,
      mode: 'view'
    }
  }
  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.lineItems, prevProps.lineItems)) {
      this.setState({
        lineItems: this.props.lineItems
      })
    }
  }
  onChange = (item, idx) => {
    const newItems = [...this.state.newItems];
    const { serviceId, quantity } = item;
    const { providerId } = this.props;
    newItems[idx] = {
      serviceId: parseInt(serviceId),
      providerId,
      quantity: parseInt(quantity)
    };
    this.setState({
      newItems
    })
  }
  onEdit = () => {
    this.setState({
      mode: 'edit'
    })
  }
  onSave = () => {
    const { mode } = this.state;
    if(mode === 'edit') {
      this.updateLineItems()
    }
    this.saveNewItems()
  }
  updateLineItems = () => {
    const { lineItems } = this.state;
    const { orderId, updateLineItem } = this.props;
    if (lineItems.length > 0) {
      for (let i = 0; i < lineItems.length; i += 1) {
        const { id, ...data } = lineItems[i]
        updateLineItem({
          orderId,
          itemId: id,
          data,
        })
      }
    }
  }
  addNewItem = () => {
    const { newItems } = this.state
    this.setState({
      newItems: [...newItems, {}]
    })
  }
  removeLineItem = (itemId) => {
    const { orderId } = this.state;
    this.props.deleteLineItem({
      orderId,
      itemId
    })
  }
  removeNewItem = (idx) => {
    const { newItems } = this.state
    this.setState({
      newItems: [...newItems.slice(0, idx), ...newItems.slice(idx + 1)]
    })
  }
  saveNewItems = () => {
    const { newItems } = this.state;
    const { orderId } = this.props;
    for (let i = 0; i < newItems.length; i += 1) {
      this.props.createLineItem({
        orderId,
        data: newItems[i]
      })
    }
  }
  render () {
    const { newItems, lineItems, mode } = this.state;
    return (
      <Section title="Quotes" mode={mode} onEdit={this.onEdit} >
        {
          lineItems.map((val, idx) => (
            <LineItem {...val} onRemove={() => this.removeLineItem(val.id)} mode={mode} />
          ))
        }
        {
          newItems.map((val, idx) => (
            <NewLineItems onChange={(item) => this.onChange(item, idx)} key={`new_item_${idx}`} remove={() => this.removeNewItem(idx)} />
          ))
        }
        <ButtonGroup onAdd={this.addNewItem} showSave={newItems.length > 0 || mode === 'edit'} onSave={this.onSave} />
      </Section>
    )
  }
}

const mapStateToProps = ({ lineItem: { lineItems } }) => ({
  lineItems
})

const mapDispatchToProps = {
  updateLineItem,
  deleteLineItem,
  createLineItem, 
}

export default connect(mapStateToProps, mapDispatchToProps)(LineItemSection)