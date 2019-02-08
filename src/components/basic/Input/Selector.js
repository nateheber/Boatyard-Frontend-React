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

const StyledSelector = styled(Select)`
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.3px;
  .css-2o5izw {
    min-height: 35px;
  }
  .css-vj8t7z {
    min-height: 35px;
  }
  .css-1wy0on6 {
    .css-1uq0kb5 {
      padding: 5px;
    }
    .css-d8oujb {
      display: none;
    }
    .css-1ep9fjw {
      display: none;
    }
  }
`;

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
      <StyledSelector
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
        }}
        {...this.props}
      />
    );
  }
}
