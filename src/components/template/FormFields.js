import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty, set, get, findIndex } from 'lodash';
import deepEqual from 'deep-equal';
import classNames from 'classnames';
import styled from 'styled-components';

import {
  InputWrapper,
  InputLabel,
  Input,
  CheckBox,
  TextArea,
  Select,
  DateSelector,
  CurrencyInput,
  FileInput
} from 'components/basic/Input';

const Image = styled.img`
  width: 100%;
  height: 72px;
  object-fit: contain;
  object-position: center;
  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  border-radius: 6px;
`;

export default class FormFields extends React.Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    const value = this.getValues(fields);
    this.state = {
      value,
      errors: []
    };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.fields, prevProps.fields)) {
      const { fields } = this.props;
      const value = this.getValues(fields);
      this.setState({
        value,
        errors: []
      });
    }
  }

  getValues = (fields) => {
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
      } else if (fields[i].type === 'file_input') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', { file: null, baseString: null, ref: null }));

      } else {
        set(value, fields[i].field, get(fields[i], 'defaultValue', ''));
      }
    }
    return value;
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
      const fieldValue = get(value, fields[i].field);
      if (fields[i].type === 'date') {
        if (fields[i].required && !fieldValue) {
          errors.push(fields[i].field);
        }
      } else if (
        fields[i].type !== 'check_box' &&
        fields[i].required &&
        isEmpty(fieldValue)
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

  renderInputField = (field, type, mask, maskChar, placeholder, dateFormat, errorMessage, options, size, disabled, title, icon) => {
    const { value, errors } = this.state;
    let fieldValue = '';
      if (type === 'check_box') {
        fieldValue = get(value, field) || false;
      } else if (type === 'date') {
        fieldValue = get(value, field) || new Date();
      } else if (type === 'file_input') {
        fieldValue = get(value, field) || { file: null, baseString: null, ref: null };
      } else {
        fieldValue = get(value, field) || '';
      }
    const errorIdx = findIndex(errors, errorField => errorField === field);
    switch (type) {
      case 'dummy':
        return false;
      case 'check_box':
        return (
          <CheckBox
            disabled={disabled}
            big={size === 'big'}
            checked={fieldValue}
            onClick={() => this.onChangeValue(field, !fieldValue)}
          />
        );
        case 'text_area':
        return (
          <TextArea
            disabled={disabled}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            errorMessage={errorMessage}
          />
        );
      case 'date':
        return (
          <DateSelector
            disabled={disabled}
            dateFormat={dateFormat || 'dd/MM/yyyy'}
            selected={fieldValue}
            onChange={value => this.onChangeValue(field, value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            errorMessage={errorMessage}
          />
        );
      case 'select_box':
        return (
          <Select
            disabled={disabled}
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
        return (
          <Input
            disabled={disabled}
            className={`size-${size}`}
            mask={mask}
            maskChar={maskChar}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            errorMessage={errorMessage}
          />
        );
      case 'currency_field':
        return (
          <CurrencyInput
            disabled={disabled}
            fixedDecimalScale
            placeholder={placeholder}
            decimalScale={2}
            prefix='$'
            errorMessage={errorMessage}
            value={fieldValue}
            onValueChange={values => this.onChangeValue(field, values.value)} />
        );
      case 'file_input':
          return (
            <FileInput
              title={title}
              icon={icon}
              placeholder={placeholder}
              value={fieldValue}
              onChange={values => this.onChangeValue(field, values)} />
          );
      default:
        return null;
    }
  };

  render() {
    const { fields, fieldSize } = this.props;
    const { value } = this.state;
    return (
      <Row>
        {fields.map(
          (
            {
              field,
              label,
              mask,
              maskChar,
              placeholder,
              dateFormat,
              errorMessage,
              type,
              options,
              disabled,
              title,
              icon,
              ...posInfo
            },
            idx
          ) => (
            <Col {...posInfo} key={`field_${idx}`}  style={{ margin: '5px 0' }}>
              <InputWrapper className={classNames("secondary", `size-${fieldSize}`, `${type === 'file_input' && 'upload'}`)}>
                  <div className="field-section">
                    <InputLabel>{label}</InputLabel>
                    {this.renderInputField(
                      field,
                      type,
                      mask,
                      maskChar,
                      placeholder,
                      dateFormat,
                      errorMessage,
                      options,
                      fieldSize,
                      disabled,
                      title,
                      icon
                    )}
                  </div>
                  {type === 'file_input' && <div className="file-section">
                    {value[field].baseString ?
                      <Image src={value[field].baseString} alt="uploaded file" />
                    : <label>{placeholder}</label>}
                  </div>}
              </InputWrapper>
            </Col>
          )
        )}
      </Row>
    );
  }
}
