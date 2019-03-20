import React from 'react';
import styled from 'styled-components';
import deepEqual from 'deep-equal';
import { get } from 'lodash';

import {
  Input,
  TextArea,
  InputWrapper,
  InputLabel
} from 'components/basic/Input';
import {
  HollowButton,
  OrangeButton,
  PurpleButton
} from 'components/basic/Buttons';

import { keyToSnakeCase } from 'utils/object';

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
  state = {
    templateInfo: {}
  }

  componentDidMount() {
    const { defaultTemplateInfo } = this.props;
    this.setState({ templateInfo: {...defaultTemplateInfo} });
  }

  componentDidUpdate(prevProps) {
    const { defaultTemplateInfo } = this.props;
    if (!deepEqual(defaultTemplateInfo, prevProps.defaultTemplateInfo)) {
      this.setState({ templateInfo: {...defaultTemplateInfo} });
    }
  }

  onChangeBodyText = (evt) => {
    const emailBody = evt.target.value;
    const { templateInfo } = this.state;
    this.setState({ templateInfo: { ...templateInfo, emailBody } });
  }

  onSave = () => {
    const { templateInfo } = this.state;
    this.props.onSave(keyToSnakeCase(templateInfo));
  }

  render() {
    const { onCancel } = this.props;
    const { templateInfo } = this.state;
    const emailGreeting = get(templateInfo, 'emailGreeting');
    const buttonText = get(templateInfo, 'buttonText');
    const emailBody = get(templateInfo, 'emailBody');
    return (
      <Wrapper>
        <InputWrapper className="primary">
          <InputLabel>Greeting</InputLabel>
          <Input type="text" placeholder={emailGreeting} disabled />
        </InputWrapper>
        <InputWrapper className="primary">
          <InputLabel>Email Body</InputLabel>
          <TextArea value={emailBody} onChange={this.onChangeBodyText} />
        </InputWrapper>
        <ViewTemplateButtonWrapper>
          <PurpleButton>{buttonText}</PurpleButton>
        </ViewTemplateButtonWrapper>
        <ActionWrapper>
          <HollowButton onClick={onCancel}>CANCEL</HollowButton>
          <OrangeButton onClick={this.onSave}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
