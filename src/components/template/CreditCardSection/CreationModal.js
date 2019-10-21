import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get } from 'lodash';

import { actionTypes, CreateCreditCard } from 'store/actions/credit-cards';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

const Divider = styled.hr`
  margin: 20px 0;
  border-top: 1px solid #f1f1f1;
`;

const coutries = [
  {
    label: 'United States',
    value: 'US'
  }
];

const cardFields = [
  {
    type: 'text_field',
    field: 'card_number',
    className: 'primary',
    label: 'CARD NUMBER',
    errorMessage: 'Please enter a valid card number.',
    required: true,
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'month',
    className: 'primary',
    label: 'MONTH',
    mask: '99',
    required: true,
    errorMessage: 'Required',
    xs: 12,
    sm: 6,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'year',
    className: 'primary',
    label: 'YEAR',
    required: true,
    errorMessage: 'Required',
    mask: '9999',
    xs: 12,
    sm: 6,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'cvv',
    className: 'primary',
    label: 'CVV',
    required: true,
    errorMessage: 'Required',
    xs: 12,
    sm: 6,
    md: 2,
    lg: 2,
    xl: 2
  },
];

let infoFields = [
  {
    type: 'text_field',
    field: 'first_name',
    className: 'primary',
    label: 'First Name',
    required: true,
    errorMessage: 'Required',
    defaultValue: '',
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'last_name',
    className: 'primary',
    label: 'Last Name',
    required: true,
    errorMessage: 'Required',
    defaultValue: '',
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'zip',
    className: 'primary',
    label: 'Zip Code',
    required: true,
    errorMessage: 'Required',
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'select_box',
    field: 'country',
    className: 'primary',
    label: 'Country',
    options: coutries,
    defaultValue: coutries[0].value,
    required: true,
    errorMessage: 'Choose Country',
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  }
];

class CreateModal extends React.Component {
  onSuccess = () => {
    this.props.refreshCards();
    this.props.onClose();
  };

  setCardFieldsRef = (ref) => {
    this.cardFields = ref;
  };

  setInfoFieldsRef = (ref) => {
    this.infoFields = ref;
  };

  save = () => {
    const cardsVailid = this.cardFields.validateFields();
    const infoValid = this.infoFields.validateFields();
    const { user } = this.props;
    if (cardsVailid && infoValid) {
      const cardValue = this.cardFields.getFieldValues();
      const infoValues = this.infoFields.getFieldValues();
      const data = { ...cardValue, ...infoValues };
      if (user.type === 'child_accounts') {
        data['child_account_id'] = user.id;
      } else {
        data['user_id'] = user.id;
      }
      this.props.CreateCreditCard({
        data,
        success: this.onSuccess,
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    }
  };

  render() {
    const { open, onClose, currentStatus, user } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={this.save} key="modal_btn_save">SAVE</OrangeButton>
    ];
    infoFields[0].defaultValue = get(user, 'firstName');
    infoFields[1].defaultValue = get(user, 'lastName');
    return (
      <Modal
        title="New Payment Method"
        actions={actions}
        loading={currentStatus === actionTypes.CREATE_CREDIT_CARD}
        open={open}
        onClose={onClose}
      >
        <FormFields ref={this.setCardFieldsRef} fields={cardFields} />
        <Divider />
        <FormFields ref={this.setInfoFieldsRef} fields={infoFields} />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.creditCard.currentStatus
});

const mapDispatchToProps = {
  CreateCreditCard
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
