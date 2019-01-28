import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import Modal from 'components/compound/Modal';
import { OrangeButton } from 'components/basic/Buttons';
import { Selector } from 'components/basic/Input';

import { FilterServices, GetService } from 'store/actions/services';

const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 0;
  margin-bottom: 5px;
`;

class SelectServiceModal extends React.Component {
  state = {
    service: -1,
    value: {}
  };
  componentDidMount() {
    this.props.FilterServices();
  }
  onChangeServiceFilter = val => {
    console.log('------------------------fetch all-----------')
    this.props.FilterServices({
      param: { 'service[name]': val }
    });
  };
  onChangeService = val => {
    this.setState({
      service: val.value
    });
    this.props.GetService({
      serviceId: val.value,
      success: this.onFetchService
    });
  };
  onFetchService = (service) => {
    console.log(service);
  }
  next = () => {
    const { service } = this.state;
    this.props.toNext(service);
    this.props.onClose();
  }
  render() {
    const action = [<OrangeButton onClick={this.next} key="modal_action_button">CREATE ORDER</OrangeButton>];
    const { open, onClose, filteredServices } = this.props;
    const options = filteredServices.map(option => ({
      value: option.id,
      label: option.name,
    }))
    return (
      <Modal
        title="Create Order"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12} md={9}>
            <Row>
              <Col sm={12}><SubSectionTitle>SERVICE REQUESTED</SubSectionTitle></Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Selector
                  options={options}
                  onInputChange={this.onChangeServiceFilter}
                  onChange={this.onChangeService}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ service: { filteredServices } }) => ({ filteredServices });

const mapDispatchToProps = { FilterServices, GetService };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectServiceModal);
