import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty, startCase } from 'lodash';

import {
  InputWrapper,
  InputLabel
} from 'components/basic/Input';
import { PurpleButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import ActionFooter from './ActionFooter';
import { getUserFromOrder } from 'utils/order';

const Label = styled(InputLabel)`
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Open sans-serif-Semi-bold", sans-serif;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const BodyWrapper = styled.div`
  margin: 20px 0;
`;

const BodyContent = styled.div`
  font-family: "Source Sans",sans-serif !important;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  text-transform: initial;
  white-space: pre-wrap;
`;

const ViewTemplateButtonWrapper = styled.div`
  padding: 10px 0;
`;

class SendModal extends React.Component {
  handleSend = (file = null, uri = null) => {
    const { onSend } = this.props;
    if (onSend) {
      onSend(file, uri);
    }
  };
  
  render() {
    const { onClose, open, loading, privilege, globalTemplates, localTemplates, order, type } = this.props;
    const provider = get(order, 'relationships.provider');
    let template = globalTemplates.find(item => item.triggerKey === (type === 'quote' ? 'quote_for_customer' : 'invoice_for_customer'));
    if (privilege === 'provider') {
      const localTemplate = localTemplates.find(item => item.triggerKey === (type === 'quote' ? 'quote_for_customer' : 'invoice_for_customer'));
      if (localTemplate && !isEmpty(localTemplate)) {
        template = localTemplate;
      }
    }
    const providerName = get(provider, 'attributes.name');
    const customer = getUserFromOrder(order, privilege);
    const toFirstName = get(customer, 'firstName') || '';
    const subject = get(template, 'subject').replace('[[PROVIDER_NAME]]', providerName);
    const greeting = get(template, 'emailOptions.emailGreeting').replace('[[DEAR]]', 'Hi').replace('[[TO_FIRST_NAME]]', toFirstName);
    const emailBody = get(template, 'emailOptions.emailBody').replace(/<br>/g, '').replace('[[PROVIDER_NAME]]', providerName);
    const buttonText = get(template, 'emailOptions.buttonText');
    const secondaryEmailBody = get(template, 'emailOptions.secondaryEmailBody').replace(/<br>/g, '').replace('[[PROVIDER_NAME]]', providerName);
    const emailSenderCompany = get(template, 'emailOptions.emailSenderCompany').replace('[[PROVIDER_NAME]]', providerName).replace('[[PROVIDER_ADMIN]]', '');
    const emailSenderName = get(template, 'emailOptions.emailSenderName').replace('[[PROVIDER_ADMIN]]', '').replace('[[PROVIDER_NAME]]', providerName);
    const action = [ <ActionFooter type={type} onCancel={onClose} onSend={this.handleSend} key="action_footer" /> ];
    return (
      <Modal
        loading={loading}
        title={`Send ${startCase(type)}`}
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Wrapper>
          <InputWrapper className="primary" style={{ margin: 0 }}>
            <Label>Subject</Label>
            <BodyContent>{subject}</BodyContent>
          </InputWrapper>
          <BodyWrapper>
            <Label>Body</Label>
            <BodyContent>
              {greeting}<br/>
              <br />
              {emailBody}
            </BodyContent>
          </BodyWrapper>
          <ViewTemplateButtonWrapper>
            <PurpleButton>{buttonText}</PurpleButton>
          </ViewTemplateButtonWrapper>
          <BodyWrapper style={{ marginBottom: 0 }}>
            <BodyContent>
              {secondaryEmailBody}
              <br /><br />
              {emailSenderCompany}
              {emailSenderName}
            </BodyContent>
          </BodyWrapper>
        </Wrapper>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates
})

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendModal);
