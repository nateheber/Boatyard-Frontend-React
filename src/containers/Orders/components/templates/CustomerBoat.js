import React from 'react';

import { Section } from 'components/basic/InfoSection';
import CustomerInfo from '../infoSections/CustomerInfo';
import BoatInfo from '../infoSections/BoatInfo';

export default ({ customerInfo, boatInfo, boatLocation, onEditBoat }) => (
  <Section title="Customer & Boat Info">
    <CustomerInfo {...customerInfo} />
    <BoatInfo {...boatInfo} boatLocation={boatLocation} onEdit={onEditBoat} />
  </Section>
)