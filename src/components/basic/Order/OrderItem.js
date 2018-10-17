import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
`;

const Field = styled.div`
  width: 16.66667%;
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
`;

export const OrderItem = props => {
  const { title, customer, orderStatus, boatMake, boatModel, boatName } = props;
  return (
    <Wrapper>
      <Field className="title">{title}</Field>
      <Field>{customer}</Field>
      <Field>{orderStatus}</Field>
      <Field>{boatMake}</Field>
      <Field>{boatModel}</Field>
      <Field>{boatName}</Field>
    </Wrapper>
  );
};
