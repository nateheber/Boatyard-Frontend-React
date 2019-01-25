import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { get } from 'lodash';

import { EditButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  cursor: pointer;
  border-top: 1px solid #e6e6e6;
`;

const Field = styled.div`
  margin-bottom: 30px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: bold;
  color: #004258;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
`;

const HidingPart = styled.div`
  overflow: hidden;
  &.opened {
    height: 252px;
  }
  &.closed {
    height: 0px;
  }
  transition: height 0.5s;
`
export default class InfoSection extends React.Component {
  render () {
    const { boatInfo, onEdit, opened, toggleSection } = this.props;
    const street = get(boatInfo, 'relationships.location.relationships.address.data.street', '');
    const city = get(boatInfo, 'relationships.location.relationships.address.data.city', '');
    const state = get(boatInfo, 'relationships.location.relationships.address.data.state', '');
    const zip = get(boatInfo, 'relationships.location.relationships.address.data.zip', '');
    return (
      <Wrapper onClick={toggleSection}>
        <Field>
          <EditWrapper>
            <Label>BOAT NAME</Label>
            <EditButton onClick={onEdit} />
          </EditWrapper>
          <FieldValue>{get(boatInfo, 'name', '')}</FieldValue>
        </Field>
        <HidingPart className={classNames(opened ? 'opened' : 'closed')}>
          <Field>
            <Label>BOAT MAKE</Label>
            <FieldValue>{get(boatInfo, 'make', '')}</FieldValue>
          </Field>
          <Field>
            <Label>BOAT MODEL</Label>
            <FieldValue>{get(boatInfo, 'model', '')}</FieldValue>
          </Field>
          <Field>
            <Label>BOAT LENGTH</Label>
            <FieldValue>{get(boatInfo, 'length', '')}</FieldValue>
          </Field>
          <Field>
            <Label>BOAT LOCATION</Label>
            <FieldValue>{street} {city} {state} {zip}</FieldValue>
          </Field>
        </HidingPart>
      </Wrapper>
    );
  }
}
