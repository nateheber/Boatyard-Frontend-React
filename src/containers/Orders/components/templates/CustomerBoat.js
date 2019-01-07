import React from 'react';

import Section from '../basic/Section';
import CustomerInfo from '../infoSections/CustomerInfo';
import BoatInfo from '../infoSections/BoatInfo';

export default ({ customerInfo, boatInfo, onEditBoat }) => (
  <Section title="Customer & Boat Info">
    <CustomerInfo {...customerInfo} />
    <BoatInfo {...boatInfo} onEdit={onEditBoat} />
  </Section>
)