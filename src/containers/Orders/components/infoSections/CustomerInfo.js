import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPhoneNumber } from 'utils/basic';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: bold;
  color: #004258;
  margin: 10px 0px;
  text-transform: uppercase;
`;

const Name = styled(Link)`
  color: #004258 !important;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
  margin-top: 1px;
`;

export default ({ id, type, firstName, lastName, email, phoneNumber }) => (
  <Wrapper>
    <Label>Customer Info</Label>
    <Name to={type === 'users' ? `/user-details/?user=${id}` : `/customer-details/?customer=${id}`}>{firstName} {lastName}</Name>
    <FieldValue><a href={`tel:${formatPhoneNumber(phoneNumber)}`}>{formatPhoneNumber(phoneNumber)}</a></FieldValue>
    <FieldValue><a href={`mailto: ${email}`}>{email}</a></FieldValue>
  </Wrapper>
);
