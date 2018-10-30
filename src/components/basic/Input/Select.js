import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  margin: 0;
  color: #898989;
  &:hover {
    background-color: #f6f6f7;
    cursor: pointer;
  }
`;

const OptionLabel = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 250px;
  color: #898989;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
`;

const OptionDescription = styled.div`
  color: #7e7d7e;
  font-size: 9pt;
  font-weight: 300;
  font-style: italic;
  display: inline-block;
  font-family: 'Source Sans Pro', sans-serif;
`;

const Option = props => {
  const { data, selectOption } = props;
  return (
    <OptionWrapper
      onClick={() => {
        selectOption(data);
      }}
    >
      <OptionLabel>{data.label}</OptionLabel>
      <OptionDescription>{data.description}</OptionDescription>
    </OptionWrapper>
  );
};

export class Selector extends React.Component {
  render() {
    const { options, onChange } = this.props;
    return (
      <Select
        components={{ Option }}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        onChange={onChange}
        blurInputOnSelect={false}
        isMulti={true}
      />
    );
  }
}
