import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';
import classNames from 'classnames'
import moment from 'moment';
import { Col } from 'react-flexbox-grid';
import { get, startCase, isEmpty } from 'lodash';

import CaretDownIcon from '../../../resources/caret-down-solid.svg';
import CaretUpIcon from '../../../resources/caret-up-solid.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  font-family: 'Source Sans Pro', sans-serif;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 843px) {
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
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 20px 10px 20px 30px;
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
  display: flex;
  flex: 1;
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
    display: flex;
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
  display: flex;
  flex: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  align-items: center;
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

export class Record extends React.Component {
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
        if (!isEmpty(part.trim())) {
          return part;
        } else {
          value = '_';
        }
      }
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
    return `${column.prefix || ''}${value || '_'}${column.suffix || ''}`;
  };

  render() {
    const { record, columns, type } = this.props;
    const { show } = this.state;
    const firstColumn = columns[0];
    const hidingCols = columns.slice(1);
    let icon = get(record, 'customIcon.url');
    if (isEmpty(icon)) {
      icon = get(record, 'relationships.icon.attributes.icon.url') || 'https://dev.boatyard.com/img/logo.svg';
    }
    return (
      <React.Fragment>
        { type === 'tile' ?
          <Tile xs={12} sm={6} md={4} lg={4} xl={3}>
            <Col className="tile-content" onClick={this.onGoToDetails}>
              <img className="tile-image" src={icon} alt={this.getValue(firstColumn, record)} />
              <p className="tile-name">{startCase(this.getValue(firstColumn, record))}</p>
            </Col>
          </Tile>
        :
          <Wrapper className={show ? 'active' : 'deactive'}>
            <FirstField
              onClick={this.onShowDetails}
              className={classNames(show ? 'active' : 'deactive', type, 'is-mobile')}
            >
              {this.getValue(firstColumn, record)}
              {!show && <CaretDown />}
              {show && <CaretUp />}
            </FirstField>
            <FirstField className="is-desktop" onClick={this.onGoToDetails}>
              {this.getValue(firstColumn, record)}
            </FirstField>
            {hidingCols.map((column, idx) => (
              <Field className={classNames(show ? 'show' : 'hide', type)} key={`col_${idx}`}>
                <FieldLabel>{changeCase.upperCaseFirst(column.label)}</FieldLabel>
                <FieldValue>{this.getValue(column, record)}</FieldValue>
              </Field>
            ))}
          </Wrapper>
        }
      </React.Fragment>
    );
  }
}
