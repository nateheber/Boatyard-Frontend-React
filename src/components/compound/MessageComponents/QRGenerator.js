import React from 'react';
import styled from 'styled-components';

import { Input, TextArea } from '../../basic/Input';
import { HollowButton, OrangeButton } from '../../basic/Buttons';

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

export class QRGenerator extends React.Component {
  render() {
    const { onCancel, onSave } = this.props;
    return (
      <Wrapper>
        <Input type="text" placeholder="Quick Reply Name" />
        <TextArea />
        <ActionWrapper>
          <HollowButton onClick={onCancel}>CANCEL</HollowButton>
          <OrangeButton onClick={onSave}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
