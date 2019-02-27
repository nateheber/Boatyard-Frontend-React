import React from 'react';

import { SectionHeaderWrapper, LeftPart } from 'components/basic/Header';
import { HollowButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';


export const UserDetailsHeader = ({ name, onDelete }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>{name}</PageTitle>
      <HollowButton onClick={onDelete}>
        Suspend
      </HollowButton>
    </LeftPart>
  </SectionHeaderWrapper>
);
