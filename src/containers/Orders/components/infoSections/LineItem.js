import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import styled from 'styled-components';
import { set, get } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';

import { CurrencyInput, TextArea } from 'components/basic/Input';
import RemoveButton from '../basic/RemoveButton';
import ServiceDropdown from '../basic/ServiceDropdown';

const Record = styled.div`
  padding: 15px 0px;
`;

const Line = styled(Row)`
  padding: 5px 0px;
  position: relative;
`;

const Name = styled.div`
  color: rgb(247, 148, 30);
  line-height: 20px;
  font-size: 16px;
  font-family: "Source Sans Pro";
  font-weight: 600;
`;

const Value = styled.div`
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400px;
  color: #07384b;
`;

const Comment = styled.div`
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400px;
  color: #07384b;
`;

class LineItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceId: props.service.id,
      quantity: props.attributes.quantity,
      cost: props.attributes.cost,
      comment: props.attributes.comment || '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps, this.props)) {
      this.setState({
        serviceId: this.props.service.id,
        quantity: this.props.attributes.quantity,
        cost: this.props.attributes.cost,
        comment: this.props.attributes.comment || '',
      });
    }
  }

  onChangeFilter = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterOptions(inputValue));
    }, 100);
  };

  filterOptions = (inputValue) => {
    const { services } = this.props;
    let filteredServices = services;
    if (inputValue && inputValue.trim().length > 0) {
      filteredServices = services.filter(service => service.name.toLowerCase().includes(inputValue.trim().toLowerCase()));
    }
    const options = filteredServices.map(option => ({
      value: option.id,
      cost: option.cost,
      label: option.name
    }));
    const currentOption = this.getCurrentOption();
    const result = options.filter(option => option.value !== currentOption.value);
    return [currentOption, ...result];
  };

  onChange = (value, field) => {
    const changeVal = {};
    if (field === 'cost') {
      value = value && value.replace('$', '');
    }
    set(changeVal, field, value);
    this.setState(changeVal, () => {
      this.props.onChange(this.state);
    });
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

  getCurrentOption = () => {
    const { service } = this.props
    return {
      value:  get(service, 'attributes.id'),
      cost: get(service, 'attributes.cost'),
      label: get(service, 'attributes.name')
    };
  };

  render() {
    const { mode, onRemove, service } = this.props;
    const { quantity, cost, comment } = this.state;
    const currentOption = this.getCurrentOption();
    return (
      <Record>
        <Line>
          <Col md={6} sm={6} lg={6} xl={6} xs={6}>
            {mode === 'edit' ? (
              <ServiceDropdown
                value={currentOption}
                onChangeService={this.onChangeService}
              />
            ) : (
              <Name>{get(service, 'attributes.name')}</Name>
            )}
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            {mode === 'edit' ?
              <CurrencyInput
                fixedDecimalScale
                decimalScale={0}
                value={quantity}
                onChange={evt => this.onChange(evt.target.value, 'quantity')}
                hideError
              />
            :
              <Value>{parseInt(quantity)}</Value>
            }
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            {mode === 'edit' ?
              <CurrencyInput
                fixedDecimalScale
                prefix='$'
                decimalScale={2}
                value={cost}
                onChange={evt => this.onChange(evt.target.value, 'cost')}
                hideError
              />
            : 
              <Value>${parseFloat(cost).toFixed(2)}</Value>
            }
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            <Value>${(parseFloat(parseFloat(quantity) * parseFloat(parseFloat(cost)).toFixed(2))).toFixed(2)}</Value>
          </Col>
          { mode === 'edit' && (
            <RemoveButton style={{
              position: 'absolute',
              top: 2,
              right: 12
            }} onClick={onRemove} />
          )}
        </Line>
        <Row>
          <Col sm={10}>
            {
              mode === 'edit' ? (
                <TextArea value={comment} onChange={(evt) => this.onChange(evt.target.value, 'comment')} />
              ) : (
                <Comment>{comment}</Comment>
              )
            }
          </Col>
        </Row>
      </Record>
    )
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  services: state.service.services
});


export default connect(mapStateToProps, null)(LineItem);
