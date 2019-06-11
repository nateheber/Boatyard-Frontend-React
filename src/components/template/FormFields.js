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
  InputableSelector,
  CreatableSelector
} from 'components/basic/Input';
import { formatTimeFromString } from 'utils/basic';

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
  &.range {
    > div {
      width: calc(50% - 5px);
    }
  }
`;

export default class FormFields extends React.Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    const value = this.getValues(fields);
    const startTimeOptions = [];
    for (let index = 0; index < 24; index++) {
      let value = `${index % 12 === 0 ? 12 : index % 12}:00${index < 12 ? 'am' : 'pm'}`;
      startTimeOptions.push({
        value: value,
        label: value
      });
      value = `${index % 12 === 0 ? 12 : index % 12}:30${index < 12 ? 'am' : 'pm'}`;
      startTimeOptions.push({
        value: value,
        label: value
      });
    }
    const endTimeOptions = startTimeOptions.slice(0);
    this.state = {
      value,
      errors: [],
      startTimeOptions,
      endTimeOptions
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
        set(value, fields[i].field, get(fields[i], 'defaultValue', ''));
      } else if (fields[i].type === 'inputable_time_range') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', {
          from_time: null, to_time: null
        }));
      } else if (fields[i].type === 'time_range') {
        set(value, fields[i].field, get(fields[i], 'defaultValue', { from_time: null, to_time: null }));
      } else {
        set(value, fields[i].field, get(fields[i], 'defaultValue', ''));
      }
    }
    return value;
  }

  onChangeValue = (field, val, type, isFrom = false) => {
    const value = { ...this.state.value };
    if (type === 'inputable_time') {
      if (get(val, '__isNew__')) {
        const timeString = formatTimeFromString(val.value);
        set(value, field, {
          label: timeString,
          value: timeString,
          __isNew__: true
        });
      } else {
        set(value, field, val);
      }
    } else if (type === 'inputable_time_range') {
      if (isFrom) {
        const timeString = formatTimeFromString(val.from_time.value);
        if (get(val.from_time, '__isNew__')) {
          set(value, field, {
            ...val,
            from_time: {
            label: timeString,
            value: timeString,
            __isNew__: true
            }
          });
        } else {
          set(value, field, val);
        }
        let noon = timeString.indexOf('am') > -1 ? 'am' : 'pm';
        const timeArray = timeString.replace(/am/g, '').replace(/pm/g, '').split(':');
        let hours = parseInt(timeArray[0]);
        let minutes = parseInt(timeArray[1]);
        const endTimeOptions = [];
        for(let index = 1; index < 48; index++) {
          minutes += 30;
          if (minutes >= 60) {
            minutes = minutes % 60;
            hours += 1;
          }
          if (hours > 12) {
            hours = hours % 12;
            noon = noon === 'am' ? 'pm' : 'am';
          }
          const minutesString = `0${minutes}`.slice(-2);
          let value = `${hours}:${minutesString}${noon}`;
          endTimeOptions.push({
            value: value,
            label: value
          });
        }
        this.setState({ endTimeOptions });
      } else {
        const timeString = formatTimeFromString(val.to_time.value);
        if (get(val.to_time, '__isNew__')) {
            set(value, field, {
            ...val,
            to_time: {
            label: timeString,
            value: timeString,
            __isNew__: true
            }
          });
        } else {
          set(value, field, val);
        }
      }
    } else {
      set(value, field, val);
    }
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
        if (fields[i].required && !(fieldValue.from_time || fieldValue.to_time)) {
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
  };

  handleCreateLabel = (inputValue) => {
    return formatTimeFromString(inputValue);
  }

  getFieldValues = () => this.state.value;

  renderInputField = (field, type, mask, maskChar, placeholder, dateFormat, errorMessage, options, size, disabled, title, icon) => {
    const { value, errors, startTimeOptions, endTimeOptions } = this.state;
    let fieldValue = '';
      if (type === 'check_box') {
        fieldValue = get(value, field) || false;
      } else if (type === 'date') {
        fieldValue = get(value, field) || new Date();
      } else if (type === 'file_input') {
        fieldValue = get(value, field) || { file: null, baseString: null, ref: null };
      } else if (type === 'inputable_time') {
        fieldValue = get(value, field) || '';
      } else if (type === 'inputable_time_range') {
        fieldValue = get(value, field) || {
          from_time: null, to_time: null
        };
      } else if (type === 'time_range') {
        fieldValue = get(value, field) || { from_time: null, to_time: null };
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
            onClick={() => this.onChangeValue(field, !fieldValue, type)}
          />
        );
        case 'text_area':
        return (
          <TextArea
            disabled={disabled}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value, type)}
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
            onChange={value => this.onChangeValue(field, value, type)}
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
            onChange={value => this.onChangeValue(field, value, type)}
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
              time={fieldValue.from_time}
              onChange={value => this.onChangeValue(field, { ...fieldValue, from_time: value }, type)}
              hasError={errorIdx >= 0}
              placeholder={placeholder.from_time}
              errorMessage={errorMessage}
            />
            &nbsp;&nbsp;{'-'}&nbsp;&nbsp;
            <TimePicker
              disabled={disabled}
              time={fieldValue.to_time}
              onChange={value => this.onChangeValue(field, { ...fieldValue, to_time: value }, type)}
              placeholder={placeholder.to_time}
            />
          </DateTimeWrapper>
        );
      case 'select_box':
        return (
          <Select
            disabled={disabled}
            value={fieldValue}
            onChange={evt => this.onChangeValue(field, evt.target.value, type)}
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
          <InputableSelector
            disabled={disabled}
            value={fieldValue}
            onChange={value => this.onChangeValue(field, value, type)}
            hasError={errorIdx >= 0}
            placeholder={placeholder}
            options={options}
            errorMessage={errorMessage}
          />
        );
      case 'inputable_time':
        return (
          <DateTimeWrapper>
            <CreatableSelector
              className="hour"
              isClearable
              disabled={disabled}
              value={fieldValue}
              options={startTimeOptions}
              placeholder={placeholder}
              onChange={(value, actionMeta) => this.onChangeValue(field, value, type, actionMeta)}
              formatCreateLabel={this.handleCreateLabel}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
          </DateTimeWrapper>
        );
      case 'inputable_time_range':
        return (
          <DateTimeWrapper className="range">
            <CreatableSelector
              className="hour"
              isClearable
              disabled={disabled}
              value={fieldValue.from_time}
              options={startTimeOptions}
              placeholder={''}
              onChange={(value, actionMeta) => this.onChangeValue(field, { ...fieldValue, from_time: value }, type, true)}
              formatCreateLabel={this.handleCreateLabel}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
            &nbsp;{'-'}&nbsp;
            <CreatableSelector
              className="hour"
              isClearable
              disabled={disabled}
              value={fieldValue.to_time}
              options={endTimeOptions}
              placeholder={''}
              onChange={(value, actionMeta) => this.onChangeValue(field, { ...fieldValue, to_time: value }, type)}
              formatCreateLabel={this.handleCreateLabel}
              hasError={errorIdx >= 0}
              errorMessage={errorMessage}
            />
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
            onChange={evt => this.onChangeValue(field, evt.target.value, type)}
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
            onValueChange={values => this.onChangeValue(field, values.value, type)} />
        );
      case 'file_input':
          return (
            <FileInput
              title={title}
              icon={icon}
              placeholder={placeholder}
              value={fieldValue}
              onChange={values => this.onChangeValue(field, values, type)} />
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
