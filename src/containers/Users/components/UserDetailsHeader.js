import React from 'react';
import { get } from 'lodash';

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

export default ({ user, onDelete }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <TitleSection>{`${get(user, 'firstName')} ${get(user, 'lastName')}`}<Icon src={BoatFlag}/><Label>App User</Label></TitleSection>
    </LeftPart>
    <RightPart>
      <HollowButton onClick={onDelete}>
        {user.isDisabled ? 'Restore' : 'Suspend'}
      </HollowButton>
    </RightPart>
  </SectionHeaderWrapper>
);
