import React from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import styled from 'styled-components'
import { set, get } from 'lodash';
import AsyncSelect from 'react-select/lib/Async'
import { Row, Col } from 'react-flexbox-grid'

import { Input, TextArea } from 'components/basic/Input'

import { FilterServices } from 'store/actions/services'

import RemoveButton from '../basic/RemoveButton'

const Record = styled.div`
  padding: 15px 0px;
`

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
`

const Comment = styled.div`
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400px;
  color: #07384b;
`

class LineItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceId: props.serviceId,
      quantity: props.attributes.quantity,
      cost: props.attributes.cost,
      comment: props.attributes.comment || '',
    }
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps, this.props)) {
      this.setState({
        serviceId: this.props.serviceId,
        quantity: this.props.attributes.quantity,
        cost: this.props.attributes.cost,
        comment: this.props.attributes.comment || '',
      })
    }
  }

  componentDidMount() {
    this.props.FilterServices({ params: {} });
  }

  onChangeFilter = (val) =>  new Promise((resolve, reject) => {
    if (val === '') {
      this.props.FilterServices({ success: resolve, error: resolve });
    } else {
      this.props.FilterServices({ params: { 'service[name]': val }, success: resolve, error: resolve });
    }
  }).then((services) => this.filterOptions(services)
  ).catch(err => {
    return [];
  })

  onChange = (evt, field) => {
    const changeVal = {}
    set(changeVal, field, evt.target.value)
    this.setState(changeVal, () => {
      this.props.onChange(this.state);
    });
  }

  onChangeService = (service) => {
    const serviceId = service.value;
    this.setState({ serviceId }, () => {
      this.props.onChange(this.state)
    })
  }

  getServiceName = () => {
    const serviceName = get(this.props, 'relationships.service.attributes.name');
    return serviceName;
  }

  getServiceId = () => {
    const { serviceId } = this.props;
    return serviceId;
  }

  getCurrentOption = () => ({ value: this.getServiceId(), label: this.getServiceName() })

  filterOptions = (filteredServices) => {
    const services = filteredServices || [];
    const options = services.map(option => ({
      value: option.id,
      label: option.name
    }))
    const currentOption = { value: this.getServiceId(), label: this.getServiceName() };
    const result = options.filter(option => option.value !== currentOption.value);
    return [currentOption, ...result];
  }

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
              <AsyncSelect
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
            {mode === 'edit' ? <Input type="text" value={quantity} onChange={(evt) => this.onChange(evt, 'quantity')} hideError /> : <Value>{quantity}</Value>}
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            {mode === 'edit' ? <Input type="text" value={cost} onChange={(evt) => this.onChange(evt, 'cost')} hideError /> : <Value>${cost}</Value>}
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            <Value>${parseInt(quantity, 10) * parseFloat(cost)}</Value>
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

const mapDispatchToProps = {
  FilterServices
}

export default connect(null, mapDispatchToProps)(LineItem);