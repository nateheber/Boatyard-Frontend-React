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
  TimePicker,
  CurrencyInput,
  FileInput,
  InputableSelect
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

const DateTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  > div,
  > button {
    width: calc(33% - 8px);
    min-width: initial;
  }
  &.range {
    > div,
    > button {
      width: calc(16.67% - 6px);
    }
  }
  > div.hour {
    margin-left: 0;
    margin-right: 2px;
  }
  > div.minute {
    margin-left: 2px;
  }
  > button {
    margin-left: 5px;
  }
`;

const NoonButton = styled.button`
  height: 30px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  font-family: 'Source Sans Pro',sans-serif;
  font-size: 14px;
  color: #555;
`;

export default class FormFields extends React.Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    const value = this.getValues(fields);
    const startHourOptions = [];
    const startMinuteOptions = [];
    for (let index = 1; index <= 12; index++) {
      startHourOptions.push({
        value: `${index}`,
        label: `${index}`
      });
    }
    for (let index = 0; index < 12; index++) {
      const minutes = `0${index * 5}`.slice(-2);
      startMinuteOptions.push({
        value: minutes,
        label: minutes
      });
    }
    const endHourOptions = startHourOptions.slice(0);
    const endMinuteOptions = startMinuteOptions.slice(0);
    this.state = {
      value,
      errors: [],
      startHourOptions,
      startMinuteOptions,
      endHourOptions,
      endMinuteOptions
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
      } else if (fields[i].type === 'inputable_time') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', {
          hours_start: null, minutes_start: null, noon_start: 'am' }));
      } else if (fields[i].type === 'inputable_time_range') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', {
          hours_start: null, minutes_start: null, noon_start: 'am',
          hours_end: null, minutes_end: null, noon_end: 'am'
        }));
      } else if (fields[i].type === 'time_range') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', { time_start: null, time_end: null }));
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
      } else if (fields[i].type === 'time') {
        if (fields[i].required && !fieldValue) {
          errors.push(fields[i].field);
        }
      } else if (fields[i].type === 'inputable_time') {
        if (fields[i].required && !(fieldValue.hours_start || fieldValue.minutes_start)) {
          errors.push(fields[i].field);
        }
      } else if (fields[i].type === 'inputable_time_range') {
        if (fields[i].required && !(fieldValue.hours_start || fieldValue.minutes_start)) {
          errors.push(fields[i].field);
        }
      } else if (fields[i].type === 'time_range') {
        if (fields[i].required && !(fieldValue.time_start || fieldValue.time_end)) {
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
    const { value, errors, startHourOptions, startMinuteOptions, endHourOptions, endMinuteOptions } = this.state;
    let fieldValue = '';
      if (type === 'check_box') {
        fieldValue = get(value, field) || false;
      } else if (type === 'date') {
        fieldValue = get(value, field) || new Date();
      } else if (type === 'file_input') {
        fieldValue = get(value, field) || { file: null, baseString: null, ref: null };
      } else if (type === 'inputable_time') {
        fieldValue = get(value, field) || {
          hours_start: null, minutes_start: null, noon_start: 'am'
        };
      } else if (type === 'inputable_time_range') {
        fieldValue = get(value, field) || {
          hours_start: null, minutes_start: null, noon_start: 'am',
          hours_end: null, minutes_end: null, noon_end: 'am'
        };
      } else if (type === 'time_range') {
        fieldValue = get(value, field) || { time_start: null, time_end: null };
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
      case 'time':
        return (
          <TimePicker
            disabled={disabled}
            time={fieldValue}
            onChange={value => this.onChangeValue(field, value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            errorMessage={errorMessage}
          />
        );
      case 'time_range':
        return (
          <DateTimeWrapper>
            <TimePicker
              disabled={disabled}
              time={fieldValue.time_start}
              onChange={value => this.onChangeValue(field, { ...fieldValue, time_start: value })}
              hasError={errorIdx >= 0}
              placeholder={placeholder.time_start}
              errorMessage={errorMessage}
            />
            &nbsp;&nbsp;{'-'}&nbsp;&nbsp;
            <TimePicker
              disabled={disabled}
              time={fieldValue.time_end}
              onChange={value => this.onChangeValue(field, { ...fieldValue, time_end: value })}
              placeholder={placeholder.time_end}
            />
          </DateTimeWrapper>
        );
      case 'select_box':
        return (
          <Select
            disabled={disabled}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
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
      case 'inputable_select':
        return (
          <InputableSelect
            disabled={disabled}
            value={fieldValue}
            onChange={value => this.onChangeValue(field, value)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            options={options}
            errorMessage={errorMessage}
          />
        );
      case 'inputable_time':
        return (
          <DateTimeWrapper>
            <InputableSelect
              className="hour"
              disabled={disabled}
              value={fieldValue.hours_start}
              options={startHourOptions}
              placeholder={'0'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, hours_start: value })}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
            {':'}
            <InputableSelect
              className="minute"
              disabled={disabled}
              value={fieldValue.minutes_start}
              options={startMinuteOptions}
              placeholder={'00'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, minutes_start: value })}
            />
            <NoonButton
              onClick={() => this.onChangeValue(
                field,
                {
                  ...fieldValue,
                  noon_start: fieldValue.noon_start.toLowerCase() === 'am' ? 'pm' : 'am'
                }
              )}
            >{fieldValue.noon_start}</NoonButton>
          </DateTimeWrapper>
        );
      case 'inputable_time_range':
        return (
          <DateTimeWrapper className="range">
            <InputableSelect
              className="hour"
              disabled={disabled}
              value={fieldValue.hours_start}
              options={startHourOptions}
              placeholder={'0'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, hours_start: value })}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
            {':'}
            <InputableSelect
              className="minute"
              disabled={disabled}
              value={fieldValue.minutes_start}
              options={startMinuteOptions}
              placeholder={'00'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, minutes_start: value })}
            />
            <NoonButton
              onClick={() => this.onChangeValue(
                field,
                {
                  ...fieldValue,
                  noon_start: fieldValue.noon_start.toLowerCase() === 'am' ? 'pm' : 'am'
                }
              )}
            >{fieldValue.noon_start}</NoonButton>
            &nbsp;{'-'}&nbsp;
            <InputableSelect
              className="hour"
              disabled={disabled}
              value={fieldValue.hours_end}
              options={endHourOptions}
              placeholder={'0'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, hours_end: value })}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
            {':'}
            <InputableSelect
              className="minute"
              disabled={disabled}
              value={fieldValue.minutes_end}
              options={endMinuteOptions}
              placeholder={'00'}
              onChange={value => this.onChangeValue(field, { ...fieldValue, minutes_end: value })}
            />
            <NoonButton
              onClick={() => this.onChangeValue(
                field,
                {
                  ...fieldValue,
                  noon_end: fieldValue.noon_end.toLowerCase() === 'am' ? 'pm' : 'am'
                }
              )}
            >{fieldValue.noon_end}</NoonButton>
          </DateTimeWrapper>
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
              className,
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
              <InputWrapper className={classNames(className || '', `size-${fieldSize}`, `${type === 'file_input' && 'upload'}`)}>
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
