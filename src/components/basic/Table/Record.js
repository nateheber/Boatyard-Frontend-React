import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';
import { get } from 'lodash';
import classNames from 'classnames'

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
  onClickFirstRow = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    this.props.toDetails();
  };
  render() {
    const { record, columns, type } = this.props;
    const { show } = this.state;
    const firstField = columns[0].value;
    const hidingCols = columns.slice(1);
    return (
      <Wrapper className={show ? 'active' : 'deactive'}>
        <FirstField
          onClick={this.onClickFirstRow}
          className={classNames(show ? 'active' : 'deactive', type)}
        >
          {get(record, firstField) || '_'}
        </FirstField>
        {hidingCols.map((col, idx) => (
          <Field className={classNames(show ? 'show' : 'hide', type)} key={`col_${idx}`}>
            <FieldLabel>{changeCase.upperCaseFirst(col.label)}</FieldLabel>
            <FieldValue>{get(record, col.value) || '_'}</FieldValue>
          </Field>
        ))}
      </Wrapper>
    );
  }
}
