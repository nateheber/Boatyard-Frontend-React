import React from 'react';
import styled from 'styled-components';
import changeCase from 'change-case';

import {
  Input,
  TextArea,
  InputWrapper,
  InputLabel
} from 'components/basic/Input';
import { PurpleButton } from 'components/basic/Buttons';

const Label = styled(InputLabel)`
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Open sans-serif", sans-serif;
  text-transform: capitalize;
  margin-bottom: 5px;
`

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const BodyWrapper = styled.div`
  margin-top: 20px;
`

const BodyContent = styled.div`
  font-family: "Source Sans",sans-serif !important;
  color: #333;
`

const ViewTemplateButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

const FieldWrapper = styled.div`
  padding: 0px;
`

export default class TemplateEditor extends React.Component {
  render() {
    return (
      <Wrapper>
        <InputWrapper className="primary">
          <Label>Subject</Label>
          <Input type="text" value="Your Quote from Boatyard" />
        </InputWrapper>
        <BodyWrapper>
          <Label>Body</Label>
          <BodyContent>
            Hi Brock Smoke Test 23, 
            <br />
            <br />
            Thank you for the obligation to provide you with our services. To view your quote, please click here:
          </BodyContent>
        </BodyWrapper>
        <br />
        <br />
        <ViewTemplateButtonWrapper>
          <PurpleButton>VIEW QUOTE</PurpleButton>
        </ViewTemplateButtonWrapper>
        <FieldWrapper>
          <TextArea
            value="Once we receive your approval, we will contact you to schedule your service. If you have any questions, or if there is anything else I can do for you, please let me know.


            We appreciate your business.
            

            Thank you,

            Brock (BY Provider) Admin
            
            Boatyard"
          />
        </FieldWrapper>
      </Wrapper>
    );
  }
}
