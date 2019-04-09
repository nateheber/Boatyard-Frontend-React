import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import moment from 'moment';
import { get, set, isEmpty } from 'lodash';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';

import {
  updateLineItems,
  deleteLineItem,
  createLineItems
} from 'store/reducers/lineItems';
import { GetOrder, SendQuote, actionTypes } from 'store/actions/orders';
import { orderSelector } from 'store/selectors/orders';
import { Section } from 'components/basic/InfoSection';
import Modal from 'components/compound/Modal';
import { NormalText } from 'components/basic/Typho'
import NewLineItems from '../infoSections/NewLineItem';
import LineItem from '../infoSections/LineItem';
import ButtonGroup from '../basic/ButtonGroup';
import QuoteHeader from '../basic/QuoteHeader';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

export const Description = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;
class LineItemSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItems: [],
      lineItems: get(props, 'currentOrder.lineItems', []),
      mode: 'view',
      showQuote: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (
      get(this.props, 'currentOrder.lineItems.length', 0) === 0 &&
      get(prevProps, 'currentOrder.lineItems.length', 0) > 0
    ) {
      this.setState({ mode: 'view' });
    }
    if (
      !deepEqual(
        this.props.currentOrder.lineItems,
        prevProps.currentOrder.lineItems
      )
    ) {
      this.setState({ lineItems: this.props.currentOrder.lineItems });
    }
  }

  onChange = (item, idx) => {
    const newItems = [...this.state.newItems];
    const { serviceId, quantity, cost, comment } = item;
    const { providerId } = this.props;
    newItems[idx] = {
      service_id: parseInt(serviceId),
      provider_id: providerId,
      quantity: parseInt(quantity),
      cost: parseFloat(cost),
      comment
    };
    this.setState({ newItems });
  };

  onChangeLineItems = (updateInfo, idx) => {
    const lineItems = this.state.lineItems.map(val => ({ ...val }));
    set(lineItems, `[${idx}].attributes.serviceId`, updateInfo.serviceId);
    set(lineItems, `[${idx}].attributes.quantity`, updateInfo.quantity);
    set(lineItems, `[${idx}].attributes.cost`, updateInfo.cost);
    set(lineItems, `[${idx}].attributes.comment`, updateInfo.comment);
    this.setState({ lineItems });
  };

  onEdit = () => {
    this.setState({ mode: 'edit' });
  };

  onSave = () => {
    const { mode } = this.state;
    if (mode === 'edit') {
      this.updateLineItems();
    }
    this.saveNewItems()
    this.setState({ mode: 'view' })
  }

  onSendQuote = () => {
    this.setState({ showQuote: true });
  }

  hideQuoteModal = () => {
    this.setState({ showQuote: false });
  }

  updateLineItems = () => {
    const { lineItems } = this.state;
    const { orderId, updateLineItems, GetOrder } = this.props;
    const updateInfo = lineItems.map(
      ({ id, attributes: { serviceId, quantity, cost, comment } }) => ({
        id,
        lineItem: { service_id: serviceId, quantity, cost, comment }
      })
    );
    if (lineItems.length > 0) {
      updateLineItems({
        orderId,
        data: updateInfo,
        callback: () => {
          GetOrder({ orderId });
        }
      });
    }
  };

  addNewItem = () => {
    const { newItems } = this.state;
    this.setState({ newItems: [...newItems, {}] });
  };

  removeLineItem = itemId => {
    const { orderId, GetOrder } = this.props;
    this.props.deleteLineItem({
      orderId,
      itemId,
      callback: () => {
        GetOrder({ orderId });
      }
    });
  };

  removeNewItem = idx => {
    const { newItems } = this.state;
    this.setState({
      newItems: [...newItems.slice(0, idx), ...newItems.slice(idx + 1)]
    });
  };

  saveNewItems = () => {
    const { newItems } = this.state;
    const { orderId, GetOrder } = this.props;
    this.props.createLineItems({
      orderId,
      data: newItems,
      callback: () => {
        this.setState({ newItems: [] });
        GetOrder({ orderId });
      }
    });
  };

  canSendQuote = () => {
    const { currentOrder } = this.props;
    const orderState = get(currentOrder, 'attributes.state');
    return orderState === 'accepted' || orderState === 'provisioned';
  }

  sendQuote = () => {
    const { orderId, SendQuote, GetOrder, currentOrder } = this.props;
    const orderState = get(currentOrder, 'attributes.state');
    const isResend = orderState === 'provisioned';
    SendQuote({
      orderId,
      isResend,
      success: () => {
        this.setState({ showQuote: false });
        toastr.success('Success', 'Sent quote successfully!');
        GetOrder({ orderId });
      },
      error: () => {
        this.setState({ showQuote: false });
      }
    });
  }

  render() {
    const { newItems, mode, lineItems, showQuote } = this.state;
    const { updatedAt, currentStatus } = this.props;
    const modalActions = [
      <HollowButton onClick={this.hideQuoteModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.sendQuote} key="modal_btn_save">Send</OrangeButton>
    ];
    return (
      <Section
        title={`Quote - Updated ${moment(updatedAt).format('M/D H:m A')}`}
        mode={mode}
        onEdit={this.onEdit}
      >
        <QuoteHeader />
        {!isEmpty(lineItems) && (
          <React.Fragment>
            {lineItems.map((val, idx) => (
              <LineItem
                {...val}
                onRemove={() => this.removeLineItem(val.id)}
                mode={mode}
                onChange={updateInfo => this.onChangeLineItems(updateInfo, idx)}
                key={`lineItem_${idx}`}
              />
            ))}
          </React.Fragment>
        )}
        {newItems.map((val, idx) => (
          <NewLineItems
            onChange={item => this.onChange(item, idx)}
            key={`new_item_${idx}`}
            remove={() => this.removeNewItem(idx)}
          />
        ))}
        <ButtonGroup
          onAdd={this.addNewItem}
          showSave={newItems.length > 0 || mode === 'edit'}
          onSave={this.onSave}
          showQuote={this.canSendQuote()}
          onSendQuote={this.onSendQuote}
        />
        <Modal
          title={'Send Quote'}
          actions={modalActions}
          loading={currentStatus === actionTypes.SEND_QUOTE}
          normal={true}
          open={showQuote}
          onClose={this.hideQuoteModal}
        >
          <Description>Are you sure you want to send this quote?</Description>
        </Modal>
        {/* {privilege === 'provider' && (
          <SendQuoteModal
            loading={currentStatus === actionTypes.SEND_QUOTE}
            open={showQuote}
            onClose={this.hideQuoteModal}
            onSendQuote={this.sendQuote}
          />
        )} */}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  ...orderSelector(state),
  privilege: state.auth.privilege,
  currentStatus: state.order.currentStatus,
})

const mapDispatchToProps = {
  updateLineItems,
  deleteLineItem,
  createLineItems,
  GetOrder,
  SendQuote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineItemSection);
