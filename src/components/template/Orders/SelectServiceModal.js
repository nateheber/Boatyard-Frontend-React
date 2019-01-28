import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';

import { FilterServices, GetService } from 'store/actions/services';
import Modal from 'components/compound/Modal';
import { OrangeButton } from 'components/basic/Buttons';
import ProviderOption from 'components/basic/ProviderOption';
import ProviderOptionValue from 'components/basic/ProviderOptionValue';

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
    this.props.FilterServices({ params: {} });
  }

  loadOptions = val => {
    return this.onChangeServiceFilter(val)
      .then((filtered) => {
        return filtered;
      }, () => {
        return [];
      });
  };

  onChangeServiceFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterServices({
        // params: { 'service[name]': val },
        params: {},
        success: resolve,
        error: reject
      });
    });
  };

  onChangeService = val => {
    this.setState({
      service: val.id
    }, () => {
      this.props.GetService({
        serviceId: val.id,
        success: this.onFetchService
      });
    });
  };

  onFetchService = (service, included) => {
    console.log(service, included);
  };

  next = () => {
    const { service } = this.state;
    this.props.toNext(service);
    this.props.onClose();
  };

  render() {
    const action = [<OrangeButton onClick={this.next} key="modal_action_button">CREATE ORDER</OrangeButton>];
    const { open, onClose } = this.props;
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
                <AsyncSelect
                  defaultOptions
                  components={{
                    Option: ProviderOption,
                    SingleValue: ProviderOptionValue
                  }}
                  loadOptions={this.loadOptions}
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

const mapDispatchToProps = { FilterServices, GetService };

export default connect(
  null,
  mapDispatchToProps,
)(SelectServiceModal);
