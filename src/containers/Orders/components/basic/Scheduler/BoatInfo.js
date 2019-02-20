import React from 'react';
import { get } from 'lodash';

import { InfoHeader, InfoField } from './basics';

export const BoatInfo = ({ order }) => {
  const boatInfo = get(order, 'relationships.boat.attributes');
  const make = get(boatInfo, 'make');
  const model = get(boatInfo, 'model');
  return (
    <div>
      <InfoHeader>boat info</InfoHeader>
      <InfoField>{model}</InfoField>
      <InfoField>{make}</InfoField>
    </div>
  )
}