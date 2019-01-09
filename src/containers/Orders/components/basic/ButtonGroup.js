import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { HollowButton, OrangeButton } from 'components/basic/Buttons'

const Container = styled(Row)`
  padding: 20px 0;
  border-top: 1px solid #e6e6e6;
`

export default ({ onAdd, onSave, showSave }) => (
  <Container>
    <Col xl={2} lg={2} md={2} sm={2} xs={2}>
      <HollowButton onClick={onAdd}>
        ADD ITEM
      </HollowButton>
    </Col>
    {
      showSave && (
        <Col xl={2} lg={2} md={2} sm={2} xs={2} xlOffset={8} lgOffset={8} mdOffset={8} smOffset={8} xsOffset={8}>
          <OrangeButton onClick={onSave}>
            SAVE CHANGES
          </OrangeButton>
        </Col>
      )
    }
  </Container>
)