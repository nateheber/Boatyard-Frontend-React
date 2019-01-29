import React from 'react'
import styled from 'styled-components'

import { Input } from 'components/basic/Input';

const Field = styled(Input)`
  width: 350px !important;
  margin-bottom: 0px;
`;

export class FilterInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastChangedAt: null
    };
  }
  handleChange = (val) => {
    const { onChangeFilter } = this.props;
    if (onChangeFilter) {
      onChangeFilter(val);
    }
  }

  render () {
    const { placeholder } = this.props;
    return (
      <Field
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}
