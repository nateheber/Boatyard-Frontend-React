import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Select from 'react-select'
import { connect } from 'react-redux'

import { Input, TextArea } from 'components/basic/Input'
import { FilterServices } from 'store/actions/services'

import RemoveButton from '../basic/RemoveButton'

class NewLineItem extends React.Component {
  state = {
    quantity: '0',
    cost: '0',
    serviceId: -1,
    comment: '',
  }

  componentDidMount() {
    this.props.FilterServices({ param: { 'service[name]': '' } });
  }

  onChangeFilter = (val) => {
    this.props.FilterServices({ param: { 'service[name]': 'val' } });
  }

  onChangeQuantity = (evt) => {
    this.setState({ quantity: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  onChangeCost = (evt) => {
    this.setState({ cost: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  onChangeService = (service) => {
    this.setState({ serviceId: service.value }, () => { this.props.onChange(this.state) })
  }

  onChangeComment = (evt) => {
    this.setState({ comment: evt.target.value }, () => { this.props.onChange(this.state) })
  }

  render() {
    const { filteredServices } = this.props;
    const { quantity, cost, comment } = this.state;
    const options = filteredServices.map(option => ({
      value: option.id,
      label: option.name
    }))
    return (
      <React.Fragment>
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

const mapStateToProps = ({ service: { filteredServices } }) => ({
  filteredServices
})

const mapDispatchToProps = {
  FilterServices
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLineItem)