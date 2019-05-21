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


const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const InputFieldWrapper= styled(InputWrapper)`
  margin-left: 10px !important;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #e6e6e6;
  margin: 30px 0;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 10px;
`;

const ViewTemplateButtonWrapper = styled.div`
  margin: 0 10px 20px;
`;

export class TemplateEditor extends React.Component {
  state = {
    subject: '',
    emailOptions: {
      emailGreeting: '',
      buttonText: '',
      emailBody: '',
      secondaryEmailBody: null,
      emailSenderName: null,
      emailSenderCompany: null
    },
    hasSecondSection: false,
    hasFooter: false
  }

  componentDidMount() {
    const { defaultTemplateInfo } = this.props;
    this.updateState(defaultTemplateInfo);
  }

  updateState = (templateInfo) => {
    const { subject, smsText, emailOptions } = templateInfo;
    const emailGreeting = get(emailOptions, 'emailGreeting');
    const buttonText = get(emailOptions, 'buttonText');
    const emailBody = get(emailOptions, 'emailBody');
    // if (emailBody) {
    //   emailBody = emailBody.replace(/<br>/g, '\n');
    // }
    const secondaryEmailBody = get(emailOptions, 'secondaryEmailBody');
    // if (secondaryEmailBody) {
    //   secondaryEmailBody = secondaryEmailBody.replace(/<br>/g, '\n');
    // }
    const emailSenderName = get(emailOptions, 'emailSenderName');
    const emailSenderCompany = get(emailOptions, 'emailSenderCompany');
    const hasSecondSection = !(secondaryEmailBody === undefined || secondaryEmailBody === null);
    const hasFooter = !(emailSenderName === undefined || emailSenderName === null) ||
                      !(emailSenderCompany === undefined || emailSenderCompany === null);
    this.setState({
      subject,
      smsText,
      emailOptions: {
        emailGreeting,
        buttonText,
        emailBody,
        secondaryEmailBody,
        emailSenderName,
        emailSenderCompany
      },
      hasSecondSection,
      hasFooter
    });
  };

  componentDidUpdate(prevProps) {
    const { defaultTemplateInfo } = this.props;
    if (!deepEqual(defaultTemplateInfo, prevProps.defaultTemplateInfo)) {
      this.updateState(defaultTemplateInfo);
      // this.setState({ templateInfo: {...defaultTemplateInfo} });
    }
  }

  onChangeSubject = (evt) => {
    const subject = evt.target.value;
    this.setState({ subject });
  };

  onChangeBodyText = (evt) => {
    const emailBody = evt.target.value;
    const { emailOptions } = this.state;
    this.setState({ emailOptions: { ...emailOptions, emailBody } });
  };

  onChangeGreeting = (evt) => {
    const emailGreeting = evt.target.value;
    const { emailOptions } = this.state;
    this.setState({ emailOptions: { ...emailOptions, emailGreeting } });
  }

  onChangeSecondBodyText = (evt) => {
    const secondaryEmailBody = evt.target.value;
    const { emailOptions } = this.state;
    this.setState({ emailOptions: { ...emailOptions, secondaryEmailBody } });
  };

  onChangeSMSText = (evt) => {
    const smsText = evt.target.value;
    this.setState({ smsText });
  };

  onSave = () => {
    const { subject, smsText, emailOptions } = this.state;
    const email_options = {};
    if (emailOptions.emailBody) {
      // email_options['email_body'] = emailOptions.emailBody.replace(/\n/g, '<br>');
      email_options['email_body'] = emailOptions.emailBody;
    }
    if (Object.prototype.hasOwnProperty.call(emailOptions, 'emailGreeting')) {
      if (emailOptions.emailGreeting !== null && emailOptions.emailGreeting !== undefined && emailOptions.emailGreeting.trim().length > 0) {
        email_options['email_greeting'] = emailOptions.emailGreeting;
      } else {
        email_options['email_greeting'] = '';
      }
    } else {
      email_options['email_greeting'] = null;
    }
    if (emailOptions.secondaryEmailBody) {
      // email_options['secondary_email_body'] = emailOptions.secondaryEmailBody.replace(/\n/g, '<br>');
      email_options['secondary_email_body'] = emailOptions.secondaryEmailBody;
    }
    const messageTemplate = {
      subject,
      sms_text: smsText,
      email_options
    };
    this.props.onSave(messageTemplate);
  }

  render() {
    const { onCancel } = this.props;
    const { subject, smsText, emailOptions, hasSecondSection, hasFooter } = this.state;
    return (
      <Wrapper>
        <InputFieldWrapper className="primary">
          <InputLabel>Subject</InputLabel>
          <Input type="text" value={subject} onChange={this.onChangeSubject} />
        </InputFieldWrapper>
        <InputFieldWrapper className="primary">
          <InputLabel>Greeting</InputLabel>
          <Input type="text" value={emailOptions.emailGreeting} onChange={this.onChangeGreeting} />
        </InputFieldWrapper>
        <InputFieldWrapper className="primary">
          <InputLabel>Email Body{hasSecondSection && ' Section 1'}</InputLabel>
          <TextArea value={emailOptions.emailBody} onChange={this.onChangeBodyText} />
        </InputFieldWrapper>
        {emailOptions.buttonText && <ViewTemplateButtonWrapper>
          <PurpleButton>{emailOptions.buttonText}</PurpleButton>
        </ViewTemplateButtonWrapper>}
        {hasSecondSection && <InputFieldWrapper className="primary">
            <InputLabel>Email Body Section 2</InputLabel>
            <TextArea value={emailOptions.secondaryEmailBody} onChange={this.onChangeSecondBodyText} />
          </InputFieldWrapper>}
        {hasFooter && <InputFieldWrapper className="primary">
          <TextArea placeholder={`${emailOptions.emailSenderName}\n${emailOptions.emailSenderCompany}`} disabled />
        </InputFieldWrapper>}
        <Divider />
        <InputFieldWrapper className="primary">
          <InputLabel>Push Notification</InputLabel>
          <TextArea value={smsText} onChange={this.onChangeSMSText} />
        </InputFieldWrapper>
        <ActionWrapper>
          <HollowButton onClick={onCancel}>CANCEL</HollowButton>
          <OrangeButton onClick={this.onSave}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
