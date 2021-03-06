import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import Modal from 'components/compound/Modal';
import { OrangeButton } from 'components/basic/Buttons';
import { Selector } from 'components/basic/Input';

import { filterServices, fetchOne } from 'reducers/services';

import CustomerOption from '../basic/CustomerOption';
import CustomerOptionValue from '../basic/CustomerOptionValue';

const CustomOption = ({ innerProps: { id, ...rest }, data }) => {
  return <CustomerOption key={id} {...rest} data={data} />;
};

class SelectServiceModal extends React.Component {
  state = {
    service: -1,
    value: {}
  };
  componentDidMount() {
    this.props.filterServices();
  }
  onChangeServiceFilter = val => {
    this.props.filterServices(val);
  };
  onChangeService = val => {
    this.setState({
      service: val.value
    });
    this.props.fetchOne({
      id: val.value,
      callback: this.onFetchService,
    });
  };
  onFetchService = (service) => {
    console.log(service);
  }
  customOption = ({ innerProps, data }) => {
    return <CustomOption innerProps={innerProps} data={data} />;
  };
  customValue = ({ data }) => {
    return <CustomerOptionValue {...data} />;
  };
  next = () => {
    const { service } = this.state;
    this.props.toNext(service);
    this.props.onClose();
  }
  render() {
    const action = [<OrangeButton onClick={this.next}>CREATE ORDER</OrangeButton>];
    const { open, onClose, filtered } = this.props;
    const options = filtered.map(option => ({
      value: option.id,
      label: option.name,
    }))
    return (
      <Modal
        title="Select Customer"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12} md={9}>
            <Selector
              options={options}
              onInputChange={this.onChangeServiceFilter}
              onChange={this.onChangeService}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ service: { filtered } }) => ({ filtered });

const mapDispatchToProps = { filterServices, fetchOne };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectServiceModal);
