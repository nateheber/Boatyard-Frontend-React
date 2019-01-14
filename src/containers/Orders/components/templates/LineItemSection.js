import React from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'

import NewLineItems from '../infoSections/NewLineItem'
import LineItem from '../infoSections/LineItem'
import Section from '../basic/Section'
import ButtonGroup from '../basic/ButtonGroup'
import QuoteHeader from '../basic/QuoteHeader'

import { updateLineItems, deleteLineItem, createLineItems } from 'reducers/lineItems'
import { getOrder } from 'reducers/orders'
import { orderSelector } from 'reducers/selector/order'

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
    const { serviceId, quantity, cost } = item;
    const { providerId } = this.props;
    newItems[idx] = {
      serviceId: parseInt(serviceId),
      providerId,
      quantity: parseInt(quantity),
      cost: parseFloat(cost),
    };
    this.setState({
      newItems
    })
  }
  onChangeLineItems = (updateInfo, idx) => {
    const lineItems = this.state.lineItems.map((val) => ({...val}));
    lineItems[idx].attributes.quantity = updateInfo.quantity;
    lineItems[idx].attributes.cost = updateInfo.cost;
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
    this.setState({
      mode: 'view'
    })
  }
  updateLineItems = () => {
    const { lineItems } = this.state;
    const { orderId, updateLineItems, getOrder } = this.props;
    const updateInfo = lineItems.map(({id, attributes: { quantity, cost }}) => ({
      id,
      lineItem: {
        quantity,
        cost
      }
    }));
    if (lineItems.length > 0) {
      updateLineItems({ orderId, data: updateInfo, callback: () => getOrder(orderId) });
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
    const { orderId, getOrder } = this.props;
    this.props.createLineItems({ orderId, data: newItems, callback: () => getOrder(orderId) })
  }
  render () {
    const { newItems, mode, lineItems } = this.state;
    return (
      <Section title="Quotes" mode={mode} onEdit={this.onEdit} >
        <QuoteHeader />
        {
          lineItems.map((val, idx) => (
            <LineItem {...val} onRemove={() => this.removeLineItem(val.id)} mode={mode} onChange={(updateInfo) => this.onChangeLineItems(updateInfo, idx)} key={`lineItem_${idx}`} />
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

const mapStateToProps = state => ({
  ...orderSelector(state),
})

const mapDispatchToProps = {
  updateLineItems,
  deleteLineItem,
  createLineItems,
  getOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(LineItemSection)