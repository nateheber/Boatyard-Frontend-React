import React from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { Row, Col } from 'react-flexbox-grid';
import { findIndex } from 'lodash';
import styled from 'styled-components';

import Modal from 'components/compound/Modal';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { Selector } from 'components/basic/Input';
import CustomerOption from 'components/basic/CustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';

import { filterUsers } from 'store/reducers/users';
import { getUserBoats } from 'store/reducers/boats';

import BoatInfo from '../basic/BoatInfo';

const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 35px;
  margin-bottom: 10px;
`

class SelectCustomerModal extends React.Component {
  state = {
    customer: -1,
    boat: -1,
  };

  loadOptions = val => {
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        return filtered.map(user => ({
          value: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }));
      }, () => {
        return [];
      })
  }

  onChangeUserFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.filterUsers({keyword: val, resolve, reject});
    })
  };

  onChangeUser = val => {
    this.setState({
      customer: val.value
    });
    this.props.getUserBoats({
      userId: val.value,
      callback: this.onFetchBoats
    });
  };

  onFetchBoats = () => {
    const { boats } = this.props;
    const boat = boats.reduce((prev, boatInfo) => {
      if (boatInfo.isDefault) {
        return parseInt(boatInfo.id);
      }
      return prev;
    }, -1);
    this.setState({
      boat,
    })
  };

  next = () => {
    const { customer, boat } = this.state;
    this.props.toNext({ customer, boat })
  };

  getBoats = () => {
    const { boats } = this.props;
    const { customer } = this.state;
    if (customer !== -1) {
      return boats.map((boat) => ({
        label: boat.name,
        value: parseInt(boat.id),
      }))
    }
    return [];
  };

  getBoatInfo = () => {
    const { boat } = this.state;
    const { boats } = this.props;
    const idx = findIndex(boats, info => parseInt(info.id) === boat);
    if (idx >= 0) {
      return boats[idx];
    }
    return {};
  };

  setBoat = (boat) => {
    this.setState({
      boat: boat.value
    })
  };

  render() {
    const action = [<OrangeButton onClick={this.next}>Next</OrangeButton>];
    const { open, onClose } = this.props;
    const { customer, boat } = this.state;
    const boats = this.getBoats();
    return (
      <Modal
        title="Select Customer"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12} md={9}>
            <AsyncSelect
              components={{
                Option: CustomerOption,
                SingleValue: CustomerOptionValue
              }}
              defaultOptions
              loadOptions={this.loadOptions}
              onChange={this.onChangeUser}
            />
          </Col>
          <Col sm={12} md={3}>
            <HollowButton>Add New</HollowButton>
          </Col>
        </Row>
        {
          customer !== -1 && 
            <React.Fragment>
              <Row>
                <SubSectionTitle>SELECT A BOAT</SubSectionTitle>
              </Row>
              <Row>
                <Col sm={12} md={9}>
                  <Selector defaultValue={boat} options={boats} onChange={this.setBoat} />
                </Col>
                <Col sm={12} md={3}>
                  <HollowButton>Add New</HollowButton>
                </Col>
              </Row>
              {
                boat !== -1 &&
                  <Row>
                    <Col sm={12} md={9}>
                      <BoatInfo
                        boat={this.getBoatInfo()}
                      />
                    </Col>
                  </Row>
              }
            </React.Fragment>
        }
      </Modal>
    );
  }
}

const mapStateToProps = ({ boat: { boats } }) => ({ boats });

const mapDispatchToProps = { filterUsers, getUserBoats };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomerModal);
