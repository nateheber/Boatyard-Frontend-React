import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import moment from 'moment';
import { get, set, isEmpty, sortBy } from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import {
  updateLineItems,
  deleteLineItem,
  createLineItems
} from 'store/reducers/lineItems';
import { orderSelector } from 'store/selectors/orders';
import { GetOrder } from 'store/actions/orders';
import { UpdateService } from 'store/actions/services';
import { Section } from 'components/basic/InfoSection';
import NewLineItems from '../infoSections/NewLineItem';
import LineItem from '../infoSections/LineItem';
import QuoteHeader from '../basic/QuoteHeader';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

const ButtonGroup = styled(Row)`
  padding: 20px 0;
  margin: 0 !important;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled(Col)`
  padding: 0 !important;
  margin-left: -5px;
  margin-right: -5px;
`;

class LineItemSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItems: [],
      lineItems: [],
      mode: 'view'
    }
  }

  componentDidMount() {
    this.setState({lineItems: this.refactorLineItems(get(this.props, 'currentOrder.lineItems', []))});
    console.log(this.props.currentOrder.lineItems);
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
      this.setState({ lineItems: this.refactorLineItems(this.props.currentOrder.lineItems) });
    }
  }

  refactorLineItems = (items) => {
    const lineItems = items.map(item => {
      return {
        id: item.id,
        attributes: item.attributes,
        ...item.relationships
      }
    });
    return sortBy(lineItems, 'attributes.createdAt');
    // return lineItems;
  }

  onChange = (item, idx) => {
    const newItems = [...this.state.newItems];
    const { serviceId, quantity, cost, comment } = item;
    const { providerId, currentOrder } = this.props;
    const providerLocationId = get(currentOrder, 'attributes.providerId');
    newItems[idx] = providerLocationId ? {
      provider_location_service_id: parseInt(serviceId),
      //service_id: parseInt(serviceId),
      provider_id: providerId,
      quantity: parseFloat(quantity),
      cost: parseFloat(cost),
      comment
    } : {
      service_id: parseInt(serviceId),
      provider_id: providerId,
      quantity: parseFloat(quantity),
      cost: parseFloat(cost),
      comment
    };
    this.setState({ newItems });
  };

  onChangeLineItems = (updateInfo, idx) => {
    // console.log("Update Info:", idx, updateInfo);
    let lineItems = this.state.lineItems.map(val => ({ ...val }));
    set(lineItems, `[${idx}].attributes.serviceId`, updateInfo.serviceId);
    set(lineItems, `[${idx}].attributes.quantity`, updateInfo.quantity);
    set(lineItems, `[${idx}].attributes.cost`, updateInfo.cost);
    set(lineItems, `[${idx}].attributes.comment`, updateInfo.comment);
    this.setState({ lineItems }, () => {
      console.log(this.state);
    });
  }; 

  onEdit = () => {
    this.setState({ mode: 'edit' });
  };

  onSave = () => {
    const { mode } = this.state;
    if (mode === 'edit') {
      this.updateLineItems();
    } else {
      this.saveNewItems();
    }
    this.setState({ mode: 'view' })
  }

  updateLineItems = () => {
    const { lineItems } = this.state;
    const { orderId, updateLineItems, GetOrder, currentOrder } = this.props;
    console.log("Updating line items...");
    // console.log(currentOrder);
    //console.log(lineItems);
    const providerLocationId = get(currentOrder, 'attributes.providerId');
    const updateInfo = lineItems.map(
      ({ id, attributes: { serviceId, quantity, cost, comment }, providerLocationService }) => ( providerLocationId ? {
        id,
        lineItem: { provider_location_service_id: providerLocationService.id, quantity, cost, comment }
      } : {
        id,
        lineItem: { service_id: serviceId, quantity, cost, comment }
      })
    );
    if (lineItems.length > 0) {
      updateLineItems({
        orderId,
        data: updateInfo,
        callback: () => {
          const { newItems } = this.state;
          if (newItems.length > 0) {
            this.saveNewItems();
          } else {
            GetOrder({ orderId });
          }
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
    console.log("Saving new line items...");
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

  render() {
    const { newItems, mode, lineItems } = this.state;
    const { updatedAt, currentOrder: {attributes: {providerLocationId}, relationships: {boat}} } = this.props;
    return (
      <Section
        contentStyle={{ paddingBottom: 0 }}
        title={`Quote - Updated ${moment(updatedAt).format('MM/DD h:mm A')}`}
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
                count={lineItems.length}
              />
            ))}
          </React.Fragment>
        )}
        {newItems.map((val, idx) => (
          <NewLineItems
            onChange={item => this.onChange(item, idx)}
            key={`new_item_${idx}`}
            boat={boat}
            remove={() => this.removeNewItem(idx)}
            providerLocationId={providerLocationId}
          />
        ))}
        <ButtonGroup>
          <Column xs={12} sm={6}>
            <HollowButton onClick={this.addNewItem}>
              ADD ITEM
            </HollowButton>
          </Column>
          <Column xs={12} sm={6} style={{ textAlign: 'right' }}>
            {(newItems.length > 0 || mode === 'edit') &&
              <OrangeButton style={{ marginRight: 5 }} onClick={this.onSave}>
                SAVE CHANGES
              </OrangeButton>
            }
          </Column>
        </ButtonGroup>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  ...orderSelector(state)
});

const mapDispatchToProps = {
  updateLineItems,
  deleteLineItem,
  createLineItems,
  GetOrder, 
  UpdateService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineItemSection);