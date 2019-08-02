import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';
import classNames from 'classnames'
import moment from 'moment';
import { Col } from 'react-flexbox-grid';
import { get, capitalize, isEmpty } from 'lodash';

import { formatPhoneNumber } from 'utils/basic';
import CaretDownIcon from '../../../resources/caret-down-solid.svg';
import CaretUpIcon from '../../../resources/caret-up-solid.svg';

const Wrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  font-family: 'Source Sans Pro', sans-serif;
  width: calc(${props => props.width} + 1px);
  cursor: pointer;
  &:before {
    content: "";
    vertical-align: top;
    height: 100%;
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 843px) {
    width: 100%;
    flex-direction: column;
    border-bottom: none;
    &.active {
      border-bottom: 1px solid #eaeaea;
    }
  }
`;

const Tile = styled(Col)`
  padding: 0 12px;
  margin-bottom: 20px;
  @media (min-width: 1400px) {
    flex-basis: 20% !important;
    max-width: 20% !important;
  }
  @media (min-width: 1600px) {
    flex-basis: 16.66% !important;
    max-width: 16.66% !important;
  }
  .tile-content {
    height: 78px;
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 0 10px 0 30px;
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      background: #EEE;
    }
    .tile-image {
      max-width: 40px;
      min-width: 40px;
      margin-right: 40px;
      max-height: 40px;  
    }
    .tile-name {
      font-family: Helvetica;
      font-size: 12px;
      color: #003247;
      text-transform: uppercase;
    }  
  }
`;

const FirstField = styled.div`
  vertical-align: top;
  box-sizing: border-box;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  color: #004258;
  padding: 8px;
  padding-left: 30px;
  align-items: center;
  > a {
    text-decoration: none;
    color: #004258;  
  }
  &.is-mobile {
    display: none;
  }
  &.is-desktop {
    display: inline-block;
  }
  @media (max-width: 843px) {
    display: flex;
    height: 57px;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border-bottom: 2px solid #e7ecf1 !important;
    &.active {
      background-color: #f6f6f7;
    }
    &.is-mobile {
      display: flex;
    }
    &.is-desktop {
      display: none;
    }
  }
  cursor: pointer;
`;

const Field = styled.div`
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  align-items: center;
  padding: 8px;
  padding-left: 30px;
  @media (max-width: 843px) {
    display: none;
    &.show {
      display: flex;
      flex-direction: column;
      padding: 8px 28px !important;
      align-items: flex-start;
    }
  }
`;

const FieldLabel = styled.div`
  color: #004258;
  display: none;
  @media (max-width: 843px) {
    display: block;
  }
  text-transform: capitalize;
`;

const FieldValue = styled.div`
  color: #898889;
  word-break: break-word;
`;

const LocationFieldValue = styled.div`
  color: #898889;
  word-break: break-word;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CaretDown = styled.div`
  display: none;
  width: 20px;
  height: 25px;
  background-image: url(${CaretDownIcon});
  background-position: center;
  background-repeat: no-repeat;
  content: ' ';
  @media (max-width: 843px) {
    margin: 0px 10px;
    display: inline-block;
  }
`;

const CaretUp = styled.div`
  display: none;
  width: 20px;
  height: 25px;
  background-image: url(${CaretUpIcon});
  background-position: center;
  background-repeat: no-repeat;
  content: ' ';
  @media (max-width: 843px) {
    margin: 0px 10px;
    display: inline-block;
  }
`;

export class Record extends React.PureComponent {
  state = {
    show: false
  };

  onShowDetails = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  onGoToDetails = () => {
    this.props.toDetails();
  };

  getValue = (column, item) => {
    let value = '';
    if (column.isCustomer) {
      for (const idx in column.value) {
        const val = column.value[idx];
        const fields = val.split('/');
        let part = null;
        for (const subIdx in fields) {
          if (part === null) {
            part = get(item, fields[subIdx], '');
          } else {
            part = `${part} ${get(item, fields[subIdx], '')}`;
          }
        }
        if (part && !isEmpty(part.trim())) {
          return part;
        } else {
          value = '_';
        }
      }
    } else if(column.isLocation) {
      const street = get(item ,get(column, 'street'));
      const city = get(item ,get(column, 'city'));
      const state = get(item ,get(column, 'state'));
      const zip = get(item ,get(column, 'zip'));
      let line1 = `${street}, `;
      let line2 = `${city}, ${state || ''} ${zip || ''}`;
      if (isEmpty(street)) {
        line1 = '';
      }
      if (isEmpty(city)) {
        line2 = `${state || ''} ${zip || ''}`;
      }
      return { line1, line2 };
      } else {
      if (column.value === 'id') {
        if (item.state === 'draft' && column.type === 'new') {
          return 'New Order';
        }
        return `Order #${item.id}`;    
      }
      const fields = column.value.split('/');
      let combines = get(column, 'combines', []);
      for (const idx in fields) {
        const field = fields[idx];
        const arr = field.split('.');
        let part = item;
        for (const subIdx in arr) {
          const key = arr[subIdx];
          if (!part) return '_';
          part = part[key];
        }
        if(part && part.length > 0) {
          const combineString = get(combines, `${idx - 1}`, ' ');
          value = value.length > 0 ? `${value}${combineString}${part}` : part;
        }    
      }
    }
    if (column.isValue && parseInt(value) === 0) {
      return '_';
    }
    if (column.isCurrency) {
      if (isEmpty(value)) {
        return '_';
      }
      value = parseFloat(value).toFixed(2);
    }
    if (column.isDate) {
      const date = moment(value);
      if (date.isValid()) {
        value = `${date.format('MMM DD, YYYY')}`;
      } else {
        value = '';
      }
    }
    if (column.isPhone) {
      value = formatPhoneNumber(value);
    }
    return `${column.prefix || ''}${value || '_'}${column.suffix || ''}`;
  };

  getWidth = () => {
    const { sizes } = this.props;
    if (sizes) {
      const totalWidth = sizes.reduce((prev, size) => prev + size, 0);
      return `${totalWidth}px`;
    } else {
      return '100%';
    }
  }

  render() {
    const { record, columns, type, sizes } = this.props;
    const { show } = this.state;
    const firstColumn = columns[0];
    const hidingCols = columns.slice(1);
    const { iconId } = record;
    let icon = null;
    if (!iconId) {
      icon = get(record, 'customIcon.url') || 'https://dev.boatyard.com/img/logo.svg';
    } else {
      icon = get(record, 'relationships.icon.attributes.icon.url') || 'https://dev.boatyard.com/img/logo.svg';
    }
    return (
      <React.Fragment>
        { type === 'tile' ?
          <Tile xs={12} sm={6} md={4} lg={4} xl={3}>
            <Col className="tile-content" onClick={this.onGoToDetails}>
              <img className="tile-image" src={icon} alt={this.getValue(firstColumn, record)} />
              <p className="tile-name">{capitalize(this.getValue(firstColumn, record))}</p>
            </Col>
          </Tile>
        :
          <Wrapper
            onClick={this.onGoToDetails}
            className={classNames(show ? 'active' : 'deactive', 'is-mobile')}
            width={this.getWidth()}
          >
            <FirstField
              className={classNames(show ? 'active' : 'deactive', type, 'is-mobile')}
            >
              {this.getValue(firstColumn, record)}
              {!show && <CaretDown />}
              {show && <CaretUp />}
            </FirstField>
            <FirstField
              className="is-desktop"
              style={isEmpty(sizes) ? {} : { width: `${sizes[0]}px` }}
            >
              {this.getValue(firstColumn, record)}
            </FirstField>
            {hidingCols.map((column, idx) => (
              <Field
                className={classNames(show ? 'show' : 'hide', type)}
                style={isEmpty(sizes) ? {} : { width: `${sizes[idx + 1]}px` }}
                key={`col_${idx}`}
              >
                <FieldLabel>{changeCase.upperCaseFirst(column.label)}</FieldLabel>
                {!column.isLocation && <FieldValue>{this.getValue(column, record)}</FieldValue>}
                {column.isLocation && 
                  <LocationFieldValue style={{wordBreak: 'break-word'}}>
                    {!isEmpty(this.getValue(column, record)['line1']) && <span>{this.getValue(column, record)['line1']}&nbsp;</span>}
                    <span>{this.getValue(column, record)['line2']}</span>
                  </LocationFieldValue>
                }
              </Field>
            ))}
          </Wrapper>
        }
      </React.Fragment>
    );
  }
}
