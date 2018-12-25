import React from 'react';
import styled from 'styled-components';

import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';

const ModalText = styled.div`
  font-size: 16px;
  display: block;
  color: #8f8f8f;
  font-family: 'Open sans-serif', sans-serif;
  margin: 20px 0px;
`;

export class AccountCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      websiteUrl: '',
      taxRate: '0',
      subscriptionFee: '0',
      transactionFee: '0',
      email: '',
      logo: '',
      showModal: false
    };
  }
  getFormFieldsInfo = () => {
    const {
      name,
      email,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee
    } = this.props;
    return [
      {
        field: 'name',
        label: 'Name',
        type: 'text_field',
        errorMessage: 'Enter the company name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'email',
        label: 'Email',
        type: 'text_field',
        errorMessage: 'Enter the Email',
        required: true,
        defaultValue: email,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'phoneNumber',
        label: 'Phone',
        type: 'text_field',
        mask: '(999) 999-9999',
        maskChar: '_',
        required: true,
        errorMessage: 'Enter a phone number',
        defaultValue: phoneNumber,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'websiteUrl',
        label: 'Website URL',
        type: 'text_field',
        defaultValue: websiteUrl,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'subscriptionFee',
        label: 'Monthly Subscription Fee',
        type: 'text_field',
        required: true,
        errorMessage: 'Subscription Fee Must have at least 1 digit',
        defaultValue: subscriptionFee,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'transactionFee',
        label: 'Transaction Fee',
        type: 'text_field',
        required: true,
        errorMessage: 'Transaction Fee Must have at least 1 digit',
        defaultValue: transactionFee,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'taxRate',
        label: 'Tax Rate',
        type: 'text_field',
        required: true,
        errorMessage: 'Tax Rate Must have at least 1 digit',
        defaultValue: taxRate,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    ];
  };
  onChangeField = (field, evt) => {
    const updateObj = {};
    updateObj[field] = evt.target.value;
    this.setState(updateObj);
  };
  setFormFieldsRef = ref => {
    this.fields = ref;
  };
  save = () => {
    if (this.fields.validateFields()) {
      const {
        name,
        phoneNumber,
        websiteUrl,
        taxRate,
        subscriptionFee,
        transactionFee,
        email
      } = this.fields.getFieldValues();
      this.props.save({
        name,
        phoneNumber,
        websiteUrl,
        taxRate: parseFloat(taxRate),
        subscriptionFee: parseFloat(subscriptionFee),
        transactionFee: parseFloat(transactionFee),
        email
      });
    } else {
      this.props.setErrorState('Please fill out all required fields');
      setTimeout(this.props.resetErrorState, 3000);
    }
  };
  renderFields = () => {
    const formFieldInfo = this.getFormFieldsInfo();
    return <FormFields ref={this.setFormFieldsRef} fields={formFieldInfo} />;
  };
  moveWithOutSaving = () => {
    this.closeModal();
    this.save();
  };
  openModal = () => {
    this.setState({
      showModal: true
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false
    });
  };
  renderActions = () => {
    return (
      <React.Fragment>
        <HollowButton onClick={this.save}>SAVE</HollowButton>
        <OrangeButton onClick={this.openModal}>NEXT</OrangeButton>
      </React.Fragment>
    );
  };
  renderModalActions = () => {
    return (
      <React.Fragment>
        <HollowButton onClick={this.closeModal}>Cancel</HollowButton>
        <OrangeButton onClick={this.moveWithOutSaving}>OK</OrangeButton>
      </React.Fragment>
    );
  };
  render() {
    const { showModal } = this.state;
    return (
      <React.Fragment>
        <EditorSection
          content={this.renderFields()}
          actions={this.renderActions()}
        />
        <Modal
          open={showModal}
          onClose={this.closeModal}
          title="Unsaved Changes"
          actions={this.renderModalActions()}
        >
          <ModalText>Save changes and continue?</ModalText>
        </Modal>
      </React.Fragment>
    );
  }
}
