import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';

import { TextInput, TextArea } from '../../basic/Input';
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

const Field = styled.div``;
const FieldName = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 5px;
`;

const ViewTemplateButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

export class TemplateEditor extends React.Component {
  render() {
    const { selected, onCancel, onSave } = this.props;
    return (
      <Wrapper>
        <Field>
          <FieldName>Greeting</FieldName>
          <TextInput value="Hi [[CUSTOMER_FIRST_NAME]]" disabled />
        </Field>
        <Field>
          <FieldName>Email Body Section 1</FieldName>
          <TextArea value="Thank you for choosing Brock's Boat Detailing. To view your invoice, please click here:" />
        </Field>
        <ViewTemplateButtonWrapper>
          <PurpleButton>VIEW {changeCase.upperCase(selected)}</PurpleButton>
        </ViewTemplateButtonWrapper>
        <Field>
          <FieldName>Email Body Section 2</FieldName>
          <TextArea
            value="We appreciate your business and look forward to serving you again
            soon.&#13;&#10;Thank you,"
          />
        </Field>
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
