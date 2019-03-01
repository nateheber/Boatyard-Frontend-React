import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { HollowButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';
import styled from 'styled-components';
import BoatFlag from '../../../resources/boat_flag.png';

const Icon = styled.img`
  margin-left: 30px;
  width: 40px;
  height: 40px;
`;

const TitleSection = styled(PageTitle)`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 15px;
  font-size: 14px;
  font-weight: 500;
`;

export default ({ name, onDelete }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <TitleSection>{name}<Icon src={BoatFlag}/><Label>App User</Label></TitleSection>
    </LeftPart>
    <RightPart>
      <HollowButton onClick={onDelete}>
        Suspend
      </HollowButton>
    </RightPart>
  </SectionHeaderWrapper>
);
