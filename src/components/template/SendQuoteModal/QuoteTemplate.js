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
  changeSubject = (evt) => {
    const { quote } = this.props;
    const subject = evt.target.value;
    this.props.onChange({ quote, subject });
  }

  changeQuote = (evt) => {
    const { subject } = this.props;
    const quote = evt.target.value;
    this.props.onChange({ quote, subject });
  }

  render() {
    const { subject, body, quote } = this.props;
    return (
      <Wrapper>
        <InputWrapper className="primary">
          <Label>Subject</Label>
          <Input type="text" value={subject} onChange={this.changeSubject} />
        </InputWrapper>
        <BodyWrapper>
          <Label>Body</Label>
          <BodyContent>
            {body}
          </BodyContent>
        </BodyWrapper>
        <br />
        <br />
        <ViewTemplateButtonWrapper>
          <PurpleButton>VIEW QUOTE</PurpleButton>
        </ViewTemplateButtonWrapper>
        <FieldWrapper>
          <TextArea
            value={quote}
            onChange={this.changeQuote}
          />
        </FieldWrapper>
      </Wrapper>
    );
  }
}
