import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import { Input } from 'components/basic/Input';

const Placeholder = styled.div`
  cursor: pointer;
  color: #ffbc48;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    color: #d56f12;
  }
`

export default class OnClickEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      value: props.value,
    }
  }
  setEdit = () => {
    this.setState({
      edit: true
    })
  }
  resetEdit = () => {
    const { value } = this.state;
    this.setState({
      edit: false,
    })
    this.props.onChange(value);
  }
  onChange = (evt) => {
    this.setState({ value: evt.target.value })
  }
  

  render() {
    const { edit } = this.state;
    const { value } = this.props;
    return edit ?
      (
        <Input type="text" value={value} onChange={this.onChange} onBlur={this.resetEdit} />
      )
    : (
        <Placeholder onClick={this.setEdit}>
          {isEmpty(value) ? 'Add' : `$${value}`}
        </Placeholder>
      )
  }
}