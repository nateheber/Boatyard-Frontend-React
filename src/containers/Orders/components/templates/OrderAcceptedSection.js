import React from 'react'
import styled from 'styled-components';

import { Section } from 'components/basic/InfoSection';
import notepad from '../../../../resources/notepad.png';


const Div = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export default class OrderSummarySection extends React.Component {

  render() {
    return (
      <Section title="Order Summary">
        <Div>
          <img src={notepad} alt='' />
          <h2>We're Sorry.</h2>
          <p>This order has already been accepted. <br /> Don’t worry, more are on the way!</p>
        </Div>
      </Section>
    );
  }
}