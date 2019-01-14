import React from 'react'

import Section from '../basic/Section'
import OrderSumary from '../infoSections/OrderSummary'

export default class OrderSumarySection extends React.Component {
  render () {
    const { lineItem } = this.props;
    return (
      <Section title="Order Sumary">
        <OrderSumary lineItem={lineItem} />
      </Section>
    )
  }
}
