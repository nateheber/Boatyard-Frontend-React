import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
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
  if (column.value === 'id') {
    if (item.state === 'draft') {
      return 'New Order';
    }
    return `Order #${item.id}`;    
  }
  const fields = column.value.split('/');
  let value = '';
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
      value = value.length > 0 ? `${value} ${part}` : part;
    }    
  }
  if(column.isValue && parseInt(value) === 0) {
    return '';
  }
  return `${column.prefix || ''}${value || '_'}${column.suffix || ''}`;
}

export const OrderItem = props => {
  const { columns, item } = props;
  return (
    <Wrapper>
      {columns.map((column, idx) => {
        return (
          <Field className={column.isTitle && 'title'} key={`field_${idx}`} style={{ width: column.width || `${100 / columns.length}%`}}>
            <THeader>{column.label}</THeader>
            {column.link && <Link to={`/order-details/?order=${item.id}`}>{getValue(column, item)}</Link>}
            {!column.link && getValue(column, item)}
          </Field>
        );
      })
      }
    </Wrapper>
  );
};
