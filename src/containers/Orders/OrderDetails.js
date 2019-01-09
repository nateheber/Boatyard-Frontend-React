import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { get } from 'lodash';

import { getOrder } from 'reducers/orders';
import { fetchLineItems } from 'reducers/lineItems';

import SectionGroup from './components/basic/SectionGroup';
import CustomerBoat from './components/templates/CustomerBoat';
import LineItemSection from './components/templates/LineItemSection';

const Wrapper = styled.div`
  padding: 15px;
`;

const getOrderDetails = (orderInfo) => {
  const included = get(orderInfo, 'included', []);
  let boatInfo = {};
  let customerInfo = {};
  for (let i = 0; i < included.length; i += 1) {
    switch (included[i].type) {
      case 'boats': {
        const {
          id,
          attributes: {
            name,
            make,
            model,
            length,
          }
        } = included[i];
        boatInfo = {
          id,
          name,
          make,
          model,
          length
        };
        break;
      }
      case 'users': {
        const {
          id,
          attributes: {
            firstName,
            lastName,
            email,
            phoneNumber,
          }
        } = included[i];
        customerInfo = {
          id,
          firstName,
          lastName,
          email,
          phoneNumber
        }
        break;
      }
      default:
      break;
    }
  }
  return { boatInfo, customerInfo };
}

class OrderDetails extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    this.props.getOrder(orderId);
    this.props.fetchLineItems(orderId);
  }
  getOrderInfo = () => {
    const { currentOrder } = this.props;
    const { boatInfo, customerInfo } = getOrderDetails(currentOrder);
    return { boatInfo, customerInfo };
  }
  editBoat = (id) => {
    console.log(id);
  }
  render() {
    const { boatInfo, customerInfo, } = this.getOrderInfo();
    return (
      <Wrapper>
        <Row>
          <Col md={12} sm={12} xs={12} lg={8} xl={8}>
            <SectionGroup>
              <LineItemSection />
            </SectionGroup>
          </Col>
          <Col md={12} sm={12} xs={12} lg={4} xl={4}>
            <SectionGroup>
              <CustomerBoat
                boatInfo={boatInfo}
                customerInfo={customerInfo}
                onEditBoat={() => this.editBoat(boatInfo.id)}
              />
            </SectionGroup>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ order: { currentOrder } }) => ({
  currentOrder
});

const mapDispatchToProps = {
  getOrder,
  fetchLineItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
