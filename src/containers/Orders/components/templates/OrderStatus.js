import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { isEmpty } from 'lodash'

const Wrapper = styled.div`
  width: 100%;
`

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  border-bottom: 1px solid #e7ecf1;
  @media (max-width: 778px) {
    display: none;
  }
`
const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (max-width: 778px) {
    display: none;
  }
`

const MobileWrapper = styled.div`
  display: none;
  @media (max-width: 778px) {
    display: block;
  }
`

const FieldWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const FieldLabel = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  color: #07384b;
  text-transform: uppercase;
  font-family: 'Montserrat' , sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 30px;
`

const FieldValue = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  color: #898989;
  text-transform: capitalize;
  font-family: 'Source Sans Pro' , sans-serif;
  font-size: 14px;
  font-wieght: 400;
  padding: 8px 30px;
`

const StatusValue = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  color: #009DEB;
  text-transform: capitalize;
  font-family: Montserrat , sans-serif;
  font-size: 12px;
  padding: 8px 30px;
`

export default ({ id, time, customerName, total, scheduledAt, status }) => (
  <Wrapper>
    <LabelWrapper>
      <FieldLabel>order #</FieldLabel>
      <FieldLabel>time</FieldLabel>
      <FieldLabel>Customer</FieldLabel>
      <FieldLabel>total</FieldLabel>
      <FieldLabel>payment status</FieldLabel>
      <FieldLabel>scheduling status</FieldLabel>
      <FieldLabel>order status</FieldLabel>
    </LabelWrapper>
    <ValueWrapper>
      <FieldValue>{id}</FieldValue>
      <FieldValue>{moment(time).format('MMM D, YYYY')}</FieldValue>
      <FieldValue>{customerName}</FieldValue>
      <FieldValue>${parseFloat(total).toFixed(2)}</FieldValue>
      <StatusValue> </StatusValue>
      <StatusValue>{isEmpty(scheduledAt) ? 'Scheduling Needed' : `Scheduled At ${moment(scheduledAt).format('MMM D, YYYY')}`}</StatusValue>
      <StatusValue>{status}</StatusValue>
    </ValueWrapper>
    <MobileWrapper>
      <FieldWrapper>
        <FieldLabel>order #</FieldLabel>
        <FieldValue>{id}</FieldValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>time</FieldLabel>
        <FieldValue>{moment(time).format('MMM D, YYYY')}</FieldValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Customer</FieldLabel>
        <FieldValue>{customerName}</FieldValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>total</FieldLabel>
        <FieldValue>${parseFloat(total).toFixed(2)}</FieldValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>payment status</FieldLabel>
        <StatusValue></StatusValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>scheduling status</FieldLabel>
        <StatusValue>{scheduledAt ? 'Scheduling Needed' : `Scheduled At ${moment(scheduledAt).format('MMM D, YYYY')}`}</StatusValue>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>order status</FieldLabel>
        <StatusValue>{status}</StatusValue>
      </FieldWrapper>
    </MobileWrapper>
  </Wrapper>
)
