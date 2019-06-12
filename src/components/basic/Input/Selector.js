import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import styled from 'styled-components';
import classNames from 'classnames';

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
`;

const ErrorMessage = styled.div`
  color: #f7941e !important;
  display: block;
  font-weight: 400;
  font-size: 12px;
  margin: 0 0 5px;
  font-family: 'Source Sans', sans-serif;
  line-height: 1.125;
  text-transform: capitalize;
  opacity: 0;
  transition: opacity 0.5s;
  &.show {
    opacity: 1;
  }
`;

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


const colourStyles = {
  container: styles => ({
    ...styles,
    minWidth: 100
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 400,
    letterSpacing: -0.3,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 200,
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    paddingTop: 1,
    paddingBottom: 1
  }),
  dropdownIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  singleValue: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    textTransform: 'initial'
  }),
  option: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#555',
    textTransform: 'initial'
  }),
  placeholder: styles => ({ ...styles }),
  noOptionsMessageCSS: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#555',
    textTransform: 'initial'
  })
};

export class InputableSelector extends React.Component {
  render() {
    const { hasError, errorMessage, hideError, ...rest } = this.props;
    return (
      <React.Fragment>
        <Select {...rest} styles={colourStyles} />
        { (!hideError && hasError) &&
          <ErrorMessage className={classNames({ show: hasError })}>
            {errorMessage}
          </ErrorMessage>
        }
      </React.Fragment>
    );
  }
}

export class CreatableSelector extends React.Component {
  render() {
    const { hasError, errorMessage, hideError, ...rest } = this.props;
    return (
      <React.Fragment>
        <CreatableSelect {...rest} styles={colourStyles} />
        { (!hideError && hasError) &&
          <ErrorMessage className={classNames({ show: hasError })}>
            {errorMessage}
          </ErrorMessage>
        }
      </React.Fragment>
    );
  }
}
