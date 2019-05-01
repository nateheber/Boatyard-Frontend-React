import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';

const Container = styled(Row)`
  padding: 20px 0;
  margin: 0 !important;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  align-items: center;
`

export default ({ onAdd, onSave, showSave, showQuote, onSendQuote }) => (
  <Container>
    <Left>
      <HollowButton style={{ marginLeft: 0 }} onClick={onAdd}>
        ADD ITEM
      </HollowButton>
      {
        showQuote && (
          <HollowButton onClick={onSendQuote}>
            Send Quote
          </HollowButton>
        )
      }
    </Left>
    {
      showSave && (
        <OrangeButton style={{ marginRight: 5 }} onClick={onSave}>
          SAVE CHANGES
        </OrangeButton>
      )
    }
  </Container>
)