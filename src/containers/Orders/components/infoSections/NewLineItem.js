import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Select from 'react-select'
import { connect } from 'react-redux'

import {
  Input
} from 'components/basic/Input'
import { filterServices } from 'reducers/services'

import RemoveButton from '../basic/RemoveButton'

class NewLineItem extends React.Component {
  state = {
    cost: '0',
    quantity: '0',
    service: -1,
  }
  onChangeFilter = (val) => {
    this.props.filterServices(val)
  }
  onChangeQuantity = (evt) => {
    this.setState({
      quantity: evt.target.value,
    }, () => {
      this.props.onChange(this.state)
    })
  }
  onChangeCost = (evt) => {
    this.setState({
      cost: evt.target.value,
    }, () => {
      this.props.onChange(this.state)
    })
  }
  onChangeService = (service) => {
    this.setState({
      service: service.id
    }, () => {
      this.props.onChange(this.state)
    })
  }
  render() {
    const { filtered } = this.props;
    const { quantity, cost } = this.state;
    const options = filtered.map(option => ({
      value: option.id,
      label: option.name
    }))
    return (
      <Row>
        <Col lg={8} sm={8} xs={8} md={8} xl={8}>
          <Row>
            <Col lg={6} sm={6} xs={6} md={6} xl={6}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={options}
                onInputChange={this.onChangeFilter}
                onChange={this.onChangeService}
              />
            </Col>
            <Col lg={3} sm={3} xs={3} md={3} xl={3}>
              <Input type="text" onChange={this.onChangeQuantity} />
            </Col>
            <Col lg={3} sm={3} xs={3} md={3} xl={3}>
              <Input type="text" onChange={this.onChangeCost} />
            </Col>
          </Row>
        </Col>
        <Col lg={4} sm={4} xs={4} md={4} xl={4}>
          <RemoveButton />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ service: { filtered } }) => ({
  filtered
})

const mapDispatchToProps = {
  filterServices
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLineItem)