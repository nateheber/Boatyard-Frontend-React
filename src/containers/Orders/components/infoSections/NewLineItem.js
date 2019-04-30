import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import { FilterServices } from 'store/actions/services';

import { CurrencyInput, TextArea } from 'components/basic/Input';
import RemoveButton from '../basic/RemoveButton';
import { BoatyardSelect } from 'components/basic/Dropdown';

const Line = styled(Row)`
  padding: 5px 0px;
  position: relative;
`;

class NewLineItem extends React.Component {
  state = {
    quantity: '0',
    cost: '0',
    serviceId: -1,
    comment: '',
  };

  onChangeFilter = (val) =>  new Promise((resolve, reject) => {
    const { privilege } = this.props;
    let params = {
      'service[discarded_at]': null
    };
    if (val && val.trim().length > 0) {
      params['search_by_name'] = val;
    }
    if (privilege === 'admin') {
      params['service[provider_id]'] = 1;
    }
    this.props.FilterServices({ params, success: resolve, error: reject });
  }).then((services) =>
    services.map(option => ({
      value: option.id,
      cost: option.cost,
      label: option.name
    }))
  ).catch(err => {
    return [];
  });

  onChangeQuantity = (evt) => {
    this.setState({ quantity: evt.target.value }, () => { this.props.onChange(this.state) });
  };

  onChangeCost = (evt) => {
    const value = evt.target.value && evt.target.value.replace('$', '');
    this.setState({ cost: value }, () => { this.props.onChange(this.state) });
  };

  onChangeService = (service) => {
    this.setState({
      serviceId: service.value,
      cost: service.cost,
      quantity: 1
    }, () => {
      this.props.onChange(this.state);
    });
  };

  onChangeComment = (evt) => {
    this.setState({ comment: evt.target.value }, () => { this.props.onChange(this.state) });
  };

  render() {
    const { quantity, cost, comment } = this.state;
    return (
      <React.Fragment>
        <Line>
          <Col lg={6} sm={6} xs={6} md={6} xl={6}>
            <BoatyardSelect
              className="basic-single"
              classNamePrefix="select"
              cacheOptions
              defaultOptions
              loadOptions={this.onChangeFilter}
              onChange={this.onChangeService}
            />
          </Col>
          <Col lg={2} sm={2} xs={2} md={2} xl={2}>
            <CurrencyInput
              fixedDecimalScale
              decimalScale={0}
              value={quantity}
              onChange={this.onChangeQuantity}
              hideError
            />
          </Col>
          <Col lg={2} sm={2} xs={2} md={2} xl={2}>
            <CurrencyInput
              fixedDecimalScale
              prefix='$'
              decimalScale={2}
              value={cost}
              onChange={this.onChangeCost}
              hideError
            />
          </Col>
          <RemoveButton style={{
              position: 'absolute',
              top: 2,
              right: 8
            }} onClick={this.props.remove} />
        </Line>
        <Row>
          <Col sm={10}>
            <TextArea
              value={comment}
              onChange={this.onChangeComment}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  FilterServices
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLineItem);
