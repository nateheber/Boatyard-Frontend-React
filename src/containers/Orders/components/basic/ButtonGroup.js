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

export default ({ onAdd, onSave, showSave }) => (
  <Container>
    <HollowButton onClick={onAdd}>
      ADD ITEM
    </HollowButton>
    {
      showSave && (
        <OrangeButton onClick={onSave}>
          SAVE CHANGES
        </OrangeButton>
      )
    }
  </Container>
)