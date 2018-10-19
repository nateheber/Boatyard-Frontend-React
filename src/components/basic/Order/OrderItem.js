import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  @media (max-width: 778px) {
    box-sizing: border-box;
    height: 290px;
    padding: 22px 15px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
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
  @media (max-width: 778px) {
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 0;
    padding: 0;
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

export const OrderItem = props => {
  const { title, customer, orderStatus, boatMake, boatModel, boatName } = props;
  return (
    <Wrapper>
      <Field className="title">
        <THeader>ORDER</THeader>
        {title}
      </Field>
      <Field>
        <THeader>CUSTOMER</THeader>
        {customer}
      </Field>
      <Field>
        <THeader>ORDER STATUS</THeader>
        {orderStatus}
      </Field>
      <Field>
        <THeader>BOAT MAKE</THeader>
        {boatMake}
      </Field>
      <Field>
        <THeader>BOAT MODEL</THeader>
        {boatModel}
      </Field>
      <Field>
        <THeader>BOAT NAME</THeader>
        {boatName}
      </Field>
    </Wrapper>
  );
};
