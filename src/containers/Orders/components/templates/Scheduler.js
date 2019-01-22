import React from 'react'

import { Section } from 'components/basic/InfoSection'
import { HollowButton } from 'components/basic/Buttons'

export default class OrderSumarySection extends React.Component {
  render () {
    return (
      <Section title="Scheduling">
        <HollowButton>SCHEDULE 1 OPTION</HollowButton>
        <HollowButton>SCHEDULE 3 OPTIONS</HollowButton>
      </Section>
    )
  }
}
