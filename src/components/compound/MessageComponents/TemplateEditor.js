import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';

import { Input, TextArea, InputWrapper, InputLabel } from '../../basic/Input';
import { HollowButton, OrangeButton, PurpleButton } from '../../basic/Buttons';

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

const ViewTemplateButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

export class TemplateEditor extends React.Component {
  render() {
    const { selected, onCancel, onSave } = this.props;
    return (
      <Wrapper>
        <InputWrapper className="primary">
          <InputLabel>Greeting</InputLabel>
          <Input type="text" value="Hi [[CUSTOMER_FIRST_NAME]]" disabled />
        </InputWrapper>
        <InputWrapper className="primary">
          <InputLabel>Email Body Section 1</InputLabel>
          <TextArea value="Thank you for choosing Brock's Boat Detailing. To view your invoice, please click here:" />
        </InputWrapper>
        <ViewTemplateButtonWrapper>
          <PurpleButton>VIEW {changeCase.upperCase(selected)}</PurpleButton>
        </ViewTemplateButtonWrapper>
        <InputWrapper className="primary">
          <InputLabel>Email Body Section 2</InputLabel>
          <TextArea
            value="We appreciate your business and look forward to serving you again
            soon.&#13;&#10;Thank you,"
          />
        </InputWrapper>
        <TextArea
          value="[[PROVIDER_USER_NAME]]&#13;&#10;Brock's Boat Detailing"
          disabled
        />
        <ActionWrapper>
          <HollowButton onClick={onCancel}>CANCEL</HollowButton>
          <OrangeButton onClick={onSave}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
