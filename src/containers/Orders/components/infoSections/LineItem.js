import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import styled from 'styled-components';
import { set, get } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';

import { FilterServices } from 'store/actions/services';
import { CurrencyInput, TextArea } from 'components/basic/Input';
import RemoveButton from '../basic/RemoveButton';
import { BoatyardSelect } from 'components/basic/Dropdown';

const Record = styled.div`
  padding: 15px 0px;
`;

const Line = styled(Row)`
  padding: 10px 0px;
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
      serviceId: props.serviceId,
      quantity: props.attributes.quantity,
      cost: props.attributes.cost,
      comment: props.attributes.comment || '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps, this.props)) {
      this.setState({
        serviceId: this.props.serviceId,
        quantity: this.props.attributes.quantity,
        cost: this.props.attributes.cost,
        comment: this.props.attributes.comment || '',
      });
    }
  }

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
  }).then((services) => this.filterOptions(services)
  ).catch(err => {
    return [];
  });

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
    const serviceId = service.value;
    this.setState({ serviceId }, () => {
      this.props.onChange(this.state)
    });
  };

  getServiceName = () => {
    const serviceName = get(this.props, 'relationships.service.attributes.name');
    return serviceName;
  };

  getServiceId = () => {
    const { serviceId } = this.props;
    return serviceId;
  };

  getCurrentOption = () => ({ value: this.getServiceId(), label: this.getServiceName() });

  filterOptions = (filteredServices) => {
    const services = filteredServices || [];
    const options = services.map(option => ({
      value: option.id,
      label: option.name
    }));
    const currentOption = { value: this.getServiceId(), label: this.getServiceName() };
    const result = options.filter(option => option.value !== currentOption.value);
    return [currentOption, ...result];
  };

  render() {
    const { mode, onRemove } = this.props;
    const { quantity, cost, comment } = this.state;
    const name = this.getServiceName();
    const currentOption = this.getCurrentOption();
    return (
      <Record>
        <Line>
          <Col md={4} sm={4} lg={4} xl={4} xs={4}>
            {mode === 'edit' ? (
              <BoatyardSelect
                className="basic-single"
                classNamePrefix="select"
                cacheOptions
                defaultOptions
                defaultValue={currentOption}
                loadOptions={this.onChangeFilter}
                onChange={this.onChangeService}
              />
            ) : (
              <Name>{name}</Name>
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
            <Col md={2} sm={2} lg={2} xl={2} xs={2}>
              <RemoveButton onClick={onRemove} />
            </Col>
          )}
        </Line>
        <Row>
          <Col sm={8}>
            {
              mode === 'edit' ? (
                <TextArea value={comment} onChange={(evt) => this.onChange(evt, 'comment')} />
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
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  FilterServices
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);
