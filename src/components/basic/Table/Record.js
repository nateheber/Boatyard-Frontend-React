import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';
import classNames from 'classnames'
import moment from 'moment';

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
    if (column.value === 'id') {
      if (item.state === 'draft' && column.type === 'new') {
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
    if (column.isValue && parseInt(value) === 0) {
      return '';
    }
    if (column.isDate) {
      value = `${moment(value).format('MMM DD, YYYY')}`;
      if (!(value instanceof Date && !isNaN(value))) {
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
    return (
      <Wrapper className={show ? 'active' : 'deactive'}>
        <FirstField
          onClick={this.onShowDetails}
          className={classNames(show ? 'active' : 'deactive', type, 'is-mobile')}
        >
          {this.getValue(firstColumn, record)}
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
    );
  }
}
