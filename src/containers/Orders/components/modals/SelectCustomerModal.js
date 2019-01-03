import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Row, Col } from 'react-flexbox-grid';

import Modal from 'components/compound/Modal';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

import { filterUsers } from 'reducers/users';

import CustomerOption from '../basic/CustomerOption';
import CustomerOptionValue from '../basic/CustomerOptionValue';

const CustomOption = ({ innerProps: { id, ...rest }, data }) => {
  return <CustomerOption key={id} {...rest} data={data} />;
};

class SelectCustomerModal extends React.Component {
  state = {
    customer: -1
  };
  componentDidMount() {
    this.props.filterUsers();
  }
  onChangeUserFilter = val => {
    this.props.filterUsers(val);
  };
  onChangeUser = val => {
    this.setState({
      customer: val.value
    });
  };
  customOption = ({ innerProps, data }) => {
    return <CustomOption innerProps={innerProps} data={data} />;
  };
  customValue = ({ data }) => {
    return <CustomerOptionValue {...data} />;
  };
  render() {
    const action = [<OrangeButton>Next</OrangeButton>];
    const { open, onClose, filtered } = this.props;
    const options = filtered.map(user => ({
      value: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }));
    return (
      <Modal
        title="Select Customer"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12} md={9}>
            <Select
              options={options}
              components={{
                Option: this.customOption,
                SingleValue: this.customValue
              }}
              onInputChange={this.onChangeUserFilter}
              onChange={this.onChangeUser}
            />
          </Col>
          <Col sm={12} md={3}>
            <HollowButton>Add New</HollowButton>
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user: { filtered } }) => ({ filtered });

const mapDispatchToProps = { filterUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomerModal);
