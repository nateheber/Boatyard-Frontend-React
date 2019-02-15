import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  text-decoration: none;
  cursor: pointer;
  @media (max-width: 778px) {
    box-sizing: border-box;
    // height: 290px;
    padding: 22px 15px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Field = styled.div`
  font-size: 15px;
  color: #898889;
  word-wrap: break-word;
  word-break: break-word;
  font-family: 'Source Sans Pro', sans-serif;
  margin: 20px 0;
  padding-left: 15px;
  padding-right: 15px;
  &.title {
    color: #004258;
    font-weight: bold;
  }
  > a {
    text-decoration: none;
    color: #004258;  
  }
  @media (max-width: 778px) {
    width: auto !important;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 0;
    padding: 10px 0;
  }
`;

const THeader = styled.div`
  font-size: 14px;
  margin-right: 15px;
  font-family: Montserrat, sans-serif !important;
  color: #004258;
  font-weight: bold;
  text-transform: uppercase;
  display: none;
  @media (max-width: 778px) {
    display: inline-block;
  }
`;

function getValue(column, item) {
  let value = '';
  if (column.type && column.type === 'new-customer' && item.state === 'dispatched') {
    return '_';
  }
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
}

class OrderItem extends React.Component {
  onGoToDetails = () => {
    const { item } = this.props;
    this.props.history.push(`/order-details/?order=${item.id}`);
  };

  render() {
    const { columns, item } = this.props;
    return (
      <Wrapper onClick={this.onGoToDetails}>
        {columns.map((column, idx) => {
          return (
            <Field
              className={column.isTitle && 'title'}
              key={`field_${idx}`}
              style={{ width: column.width || `${100 / columns.length}%`}}
            >
              <THeader>{column.label}</THeader>
              {column.link && <Link to={`/order-details/?order=${item.id}`}>{getValue(column, item)}</Link>}
              {!column.link && getValue(column, item)}
            </Field>
          );
        })
        }
      </Wrapper>
    );  
  }
}

export default withRouter(OrderItem);
