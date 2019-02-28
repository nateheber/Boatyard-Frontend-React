import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { connect } from 'react-redux'

import { FilterServices } from 'store/actions/services'

import { Input, TextArea } from 'components/basic/Input'
import RemoveButton from '../basic/RemoveButton'
import { BoatyardSelect } from 'components/basic/Dropdown';

class NewLineItem extends React.Component {
  state = {
    quantity: '0',
    cost: '0',
    serviceId: -1,
    comment: '',
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
  }).then((services) =>
    services.map(option => ({
      value: option.id,
      cost: option.cost,
      label: option.name
    }))
  ).catch(err => {
    return [];
  })

  onChangeQuantity = (evt) => {
    this.setState({ quantity: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  onChangeCost = (evt) => {
    this.setState({ cost: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  onChangeService = (service) => {
    this.setState({ serviceId: service.value, cost: service.cost, quantity: 1 }, () => { this.props.onChange(this.state) })
  }

  onChangeComment = (evt) => {
    this.setState({ comment: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  render() {
    const { quantity, cost, comment } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col lg={8} sm={8} xs={8} md={8} xl={8}>
            <Row>
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
              <Col lg={3} sm={3} xs={3} md={3} xl={3}>
                <Input type="text" value={quantity} onChange={this.onChangeQuantity} />
              </Col>
              <Col lg={3} sm={3} xs={3} md={3} xl={3}>
                <Input type="text" value={cost} onChange={this.onChangeCost} />
              </Col>
            </Row>
          </Col>
          <Col lg={4} sm={4} xs={4} md={4} xl={4}>
            <RemoveButton onClick={this.props.remove} />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLineItem)