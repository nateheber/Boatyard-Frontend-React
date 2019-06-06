import React from 'react';
import styled from 'styled-components';

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
  font-family: "Open sans-serif-Semi-bold", sans-serif;
  text-transform: capitalize;
  margin-bottom: 10px;
`

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const BodyWrapper = styled.div`
  margin-top: 20px;
`

const BodyContent = styled.div`
  font-family: "Source Sans",sans-serif !important;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
`

const ViewTemplateButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

const FieldWrapper = styled.div`
  padding: 0px;
`;

const TextInput = styled(TextArea)`
  color: #333333;
  font-size: 14px;
  font-weight: 500;
`;

export default class TemplateEditor extends React.Component {
  changeSubject = (evt) => {
    const { quote, onChange } = this.props;
    const subject = evt.target.value;
    if (onChange) {
      onChange({ quote, subject });
    }
  }

  changeQuote = (evt) => {
    const { subject, onChange } = this.props;
    const quote = evt.target.value;
    if (onChange) {
      onChange({ quote, subject });
    }
  }

  render() {
    // const { subject, body, quote } = this.props;
    return (
      <Wrapper>
        <InputWrapper className="primary">
          <Label>Subject</Label>
          <Input type="text" value="Your Quote from MarineMax" onChange={this.changeSubject} />
        </InputWrapper>
        <BodyWrapper>
          <Label>Body</Label>
          <BodyContent>
            Hi Nathan, <br/>
            <br />
            Thank you for the opportunity to provide you with our services. To view your quote, please click here:
          </BodyContent>
        </BodyWrapper>
        <br />
        <br />
        <ViewTemplateButtonWrapper>
          <PurpleButton>VIEW QUOTE</PurpleButton>
        </ViewTemplateButtonWrapper>
        <FieldWrapper>
          <TextInput
            onChange={this.changeQuote}
            value={'Once we receive your approval, we will contact you to schedule your service. If you have any questions, or if there is anything else I can do for you, please let me know.\n\nWe appreciate your business and look forward to serving you.\n\nThank you,'}
          />
        </FieldWrapper>
      </Wrapper>
    );
  }
}
