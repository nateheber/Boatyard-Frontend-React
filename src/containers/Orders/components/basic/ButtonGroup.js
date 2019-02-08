import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';

const Container = styled(Row)`
  padding: 20px 0;
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
      <HollowButton onClick={onAdd}>
        ADD ITEM
      </HollowButton>
      <HollowButton onClick={onSendQuote}>
        Send Quote
      </HollowButton>
    </Left>
    {
      showSave && (
        <OrangeButton onClick={onSave}>
          SAVE CHANGES
        </OrangeButton>
      )
    }
  </Container>
)