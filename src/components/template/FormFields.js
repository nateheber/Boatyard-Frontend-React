import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty, set, get, findIndex } from 'lodash';
import deepEqual from 'deep-equal';

import {
  InputWrapper,
  InputLabel,
  Input,
  CheckBox,
  TextArea,
  Select
} from 'components/basic/Input';

export default class FormFields extends React.Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    const value = {};
    for (let i = 0; i < fields.length; i += 1) {
      set(value, fields[i].field, get(fields[i], 'defaultValue', ''));
    }
    this.state = {
      value,
      errors: []
    };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.fields, prevProps.fields)) {
      const { fields } = this.props;
      const value = {};
      for (let i = 0; i < fields.length; i += 1) {
        if (fields[i].type === 'check_box') {
          const fieldValue = get(fields[i], 'defaultValue');
          if (fieldValue === 'true') {
            set(value, fields[i].field, true);
          } else if (fieldValue === 'false') {
            set(value, fields[i].field, false);
          } else {
            set(value, fields[i].field, Boolean(fieldValue));
          }
        } else {
          set(value, fields[i].field, get(fields[i], 'defaultValue', ''));
        }
      }
      this.setState({
        value,
        errors: []
      });
    }
  }

  onChangeValue = (field, val) => {
    const value = { ...this.state.value };
    set(value, field, val);
    this.setState({
      value
    });
    if (this.props.onChange) {
      this.props.onChange(value, field);
    }
  };

  validateFields = () => {
    const { value } = this.state;
    const errors = [];
    const { fields } = this.props;
    for (let i = 0; i < fields.length; i += 1) {
      if (
        fields[i].type !== 'check_box' &&
        fields[i].required &&
        isEmpty(get(value, fields[i].field))
      ) {
        errors.push(fields[i].field);
      }
    }
    this.setState({
      errors
    });
    if (errors.length > 0) {
      return false;
    }
    return true;
  };

  setErrorField = (fields) => {
    this.setState({
      errors: fields,
    })
  }

  getFieldValues = () => this.state.value;

  renderInputField = (field, type, mask, maskChar, errorMessage, options) => {
    const { value, errors } = this.state;
    const fieldValue =
      type === 'check_box'
        ? get(value, field) || false
        : get(value, field) || '';
    const errorIdx = findIndex(errors, errorField => errorField === field);
    switch (type) {
      case 'dummy':
        return false;
      case 'check_box':
        return (
          <CheckBox
            checked={fieldValue}
            onClick={() => this.onChangeValue(field, !fieldValue)}
          />
        );
      case 'text_area':
        return (
          <TextArea
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            errorMessage={errorMessage}
          />
        );
      case 'select_box':
        return (
          <Select
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            errorMessage={errorMessage}
          >
            <React.Fragment>
              {options.map((val, idx) => (
                <option value={val.value} key={`option_${idx},`}>
                  {val.label}
                </option>
              ))}
            </React.Fragment>
          </Select>
        );
      case 'text_field':
      default:
        return (
          <Input
            mask={mask}
            maskChar={maskChar}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            errorMessage={errorMessage}
          />
        );
    }
  };

  render() {
    const { fields } = this.props;
    return (
      <Row>
        {fields.map(
          (
            {
              field,
              label,
              mask,
              maskChar,
              errorMessage,
              type,
              options,
              ...posInfo
            },
            idx
          ) => (
            <Col {...posInfo} key={`field_${idx}`}>
              <InputWrapper className="secondary">
                <InputLabel>{label}</InputLabel>
                {this.renderInputField(
                  field,
                  type,
                  mask,
                  maskChar,
                  errorMessage,
                  options
                )}
              </InputWrapper>
            </Col>
          )
        )}
      </Row>
    );
  }
}
