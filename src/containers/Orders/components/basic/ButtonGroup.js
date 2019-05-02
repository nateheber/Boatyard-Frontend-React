import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';

const Container = styled(Row)`
  padding: 20px 0;
  margin: 0 !important;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled(Col)`
  padding: 0 !important;
  margin-left: -5px;
  margin-right: -5px;
`;

export default ({ onAdd, onSave, showSave }) => (
  <Container>
    <Column xs={12} sm={6}>
      <HollowButton onClick={onAdd}>
        ADD ITEM
      </HollowButton>
    </Column>
    <Column xs={12} sm={6} style={{ textAlign: 'right' }}>
      {showSave && <OrangeButton style={{ marginRight: 5 }} onClick={onSave}>
        SAVE CHANGES
      </OrangeButton>}
    </Column>
  </Container>
)