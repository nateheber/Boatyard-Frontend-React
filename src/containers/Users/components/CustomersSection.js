import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 90px;
  max-height: 250px;
  overflow: auto;
`;

const Name = styled.div`
  color: #004258 !important;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 14px;
  padding-bottom: 20px;
`;

export default ({ customers }) => (
  <Wrapper>
        {customers.map((customer, index) => {
          return (
            <Col xs={12} sm={6} md={6} lg={6} key={`customer-${index}`}>
              <Name>{`${customer.firstName} ${customer.lastName}`}</Name>
            </Col>
          )
        })}
  </Wrapper>
);
