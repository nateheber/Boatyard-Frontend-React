import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Option = styled.div`
  color: #337ab7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px;
`;

const Value = styled.div`
  color: #337ab7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CustomOption = ({ innerProps: { id, ...rest }, data }) => (
  <Option key={`option_${id}`} {...rest} >
    {data.label}
  </Option>
);

const CustomValue = ({ data }) => (
  <Value>
    {data.label}
  </Value>
);

export class Selector extends React.Component {
  render() {
    return (
      <Select
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
        }}
        {...this.props}
      />
    );
  }
}
