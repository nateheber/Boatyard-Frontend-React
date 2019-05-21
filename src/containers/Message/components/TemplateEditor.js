import React from 'react';
import styled from 'styled-components';
import deepEqual from 'deep-equal';
import { get } from 'lodash';

import {
  Input,
  TextArea,
  InputWrapper,
  InputLabel,
  CheckBox
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

const CheckBoxes = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const CheckBoxLabel = styled(InputLabel)`
  margin: 0;
  color: #555;
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

const DELIVERY_OPTIONS = [
  'email',
  'push',
  'sms'
];

const DELIVERY_LABELS = {
  email: 'Email',
  push: 'Push Notification',
  sms: 'SMS'
};

export class TemplateEditor extends React.Component {
  constructor(props) {
    super(props);
    const states = this.updateState();
    this.state = { ...states };
  }

  updateState = () => {
    const { defaultTemplateInfo } = this.props;
    const { id: templateId, subject, smsText, deliveryDestinations, emailOptions } = defaultTemplateInfo;
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
    return {
      templateId,
      subject,
      smsText,
      deliveryDestinations: deliveryDestinations || [],
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
    };
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

  isChecked = (value) => {
    const { deliveryDestinations } = this.state;
    if (deliveryDestinations.indexOf(value) > -1) {
      return true;
    }
    return false;
  };

  handleChangeDeliveryOption = (value) => () => {
    const { deliveryDestinations } = this.state;
    const destinations = deliveryDestinations.slice(0);
    const index = destinations.indexOf(value);
    if (index > -1) {
      destinations.splice(index, 1);
    } else {
      destinations.push(value);
    }
    this.setState({ deliveryDestinations: destinations })
  }

  handleSaveTemplate = () => {
    const { onSave } = this.props;
    const { templateId, subject, smsText, deliveryDestinations, emailOptions } = this.state;
    if (onSave) {
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
        templateId,
        subject,
        sms_text: smsText,
        delivery_destinations: deliveryDestinations,
        email_options
      };
      onSave(messageTemplate);
    }
  }

  render() {
    const { onCancel } = this.props;
    const { subject, smsText, emailOptions, hasSecondSection, hasFooter } = this.state;
    return (
      <Wrapper>
        <InputFieldWrapper className="primary">
          <InputLabel>Delivery Options</InputLabel>
          <CheckBoxes>
            {DELIVERY_OPTIONS.map(option => (
              <CheckBoxWrapper key={`delivery_destination_${option}`}>
                <CheckBox
                  small
                  checked={this.isChecked(option)}
                  onClick={this.handleChangeDeliveryOption(option)}
                />
                <CheckBoxLabel>{DELIVERY_LABELS[option]}</CheckBoxLabel>
              </CheckBoxWrapper>
            ))}
          </CheckBoxes>
        </InputFieldWrapper>
        <Divider />
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
          <OrangeButton onClick={this.handleSaveTemplate}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
