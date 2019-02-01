import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { updateLineItems, deleteLineItem, createLineItems } from 'store/reducers/lineItems';
import { GetOrder } from 'store/actions/orders';
import { orderSelector } from 'store/selectors/orders';
import { Section } from 'components/basic/InfoSection';
import NewLineItems from '../infoSections/NewLineItem';
import LineItem from '../infoSections/LineItem';
import ButtonGroup from '../basic/ButtonGroup';
import QuoteHeader from '../basic/QuoteHeader';


class LineItemSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItems: [],
      lineItems: props.currentOrder.lineItems,
      mode: 'view'
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentOrder.lineItems.length === 0 && prevProps.currentOrder.lineItems.length > 0) {
      this.setState({ mode: 'view' })
    }
    if (!deepEqual(this.props.currentOrder.lineItems, prevProps.currentOrder.lineItems)) {
      this.setState({ lineItems: this.props.currentOrder.lineItems })
    }
  }

  onChange = (item, idx) => {
    const newItems = [...this.state.newItems];
    const { serviceId, quantity, cost, comment } = item;
    const { providerId } = this.props;
    newItems[idx] = {
      serviceId: parseInt(serviceId),
      providerId,
      quantity: parseInt(quantity),
      cost: parseFloat(cost),
      comment,
    };
    this.setState({ newItems })
  }

  onChangeLineItems = (updateInfo, idx) => {
    const lineItems = this.state.lineItems.map((val) => ({...val}));
    lineItems[idx].attributes.serviceId = updateInfo.serviceId;
    lineItems[idx].attributes.quantity = updateInfo.quantity;
    lineItems[idx].attributes.cost = updateInfo.cost;
    lineItems[idx].attributes.comment = updateInfo.comment;
    this.setState({ lineItems });
  }

  onEdit = () => {
    this.setState({ mode: 'edit' })
  }

  onSave = () => {
    const { mode } = this.state;
    if(mode === 'edit') {
      this.updateLineItems()
    }
    this.saveNewItems()
    this.setState({ mode: 'view' })
  }
  updateLineItems = () => {
    const { lineItems } = this.state;
    const { orderId, updateLineItems, GetOrder } = this.props;
    const updateInfo = lineItems.map(({id, attributes: { serviceId, quantity, cost, comment }}) => ({ id, lineItem: { serviceId, quantity, cost, comment } }));
    if (lineItems.length > 0) {
      updateLineItems({ orderId, data: updateInfo, callback: () => {GetOrder({orderId})}});
    }
  }
  addNewItem = () => {
    const { newItems } = this.state
    this.setState({ newItems: [...newItems, {}] })
  }
  removeLineItem = (itemId) => {
    const { orderId, GetOrder } = this.props;
    this.props.deleteLineItem({ orderId, itemId, callback: () => { GetOrder({orderId}) } })
  }
  removeNewItem = (idx) => {
    const { newItems } = this.state
    this.setState({ newItems: [...newItems.slice(0, idx), ...newItems.slice(idx + 1)] })
  }
  saveNewItems = () => {
    const { newItems } = this.state;
    const { orderId, GetOrder } = this.props;
    this.props.createLineItems({ orderId, data: newItems, callback: () => {
      this.setState({ newItems: [] })
      GetOrder({orderId})}
    })
  }
  render () {
    const { newItems, mode, lineItems } = this.state;
    const { updatedAt } = this.props;
    return (
      <Section title={`Quote - Updated ${moment(updatedAt).format('M/D H:m A')}`} mode={mode} onEdit={this.onEdit} >
        <QuoteHeader />
        {!isEmpty(lineItems) && <React.Fragment>
          {lineItems.map((val, idx) => (
            <LineItem {...val} onRemove={() => this.removeLineItem(val.id)} mode={mode} onChange={(updateInfo) => this.onChangeLineItems(updateInfo, idx)} key={`lineItem_${idx}`} />
          ))}
        </React.Fragment>}
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

const mapStateToProps = state => ({ ...orderSelector(state) })

const mapDispatchToProps = {
  updateLineItems,
  deleteLineItem,
  createLineItems,
  GetOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(LineItemSection)