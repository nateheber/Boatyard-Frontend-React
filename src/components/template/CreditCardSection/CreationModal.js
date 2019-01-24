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
const cardFields = [
  {
    type: 'text_field',
    field: 'cardNumber',
    label: 'CARD NUMBER',
    mask: '9999 9999 9999 9999',
    errorMessage: 'Please enter a valid card number.',
    required: true,
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'month',
    label: 'MONTH',
    mask: '99',
    required: true,
    errorMessage: 'Required',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'year',
    label: 'YEAR',
    required: true,
    errorMessage: 'Required',
    mask: '99',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'cvv',
    label: 'CVV',
    mask: '999',
    required: true,
    errorMessage: 'Required',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
];

let infoFields = [
  {
    type: 'text_field',
    field: 'firstName',
    label: 'First Name',
    required: true,
    errorMessage: 'Required',
    defaultValue: '',
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'lastName',
    label: 'Last Name',
    required: true,
    errorMessage: 'Required',
    defaultValue: '',
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'zipCode',
    label: 'Zip Code',
    required: true,
    errorMessage: 'Required',
    xs: 4,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 4
  },
  // {
  //   type: 'select_box',
  //   field: 'country',
  //   label: 'Country',
  //   required: true,
  //   errorMessage: 'Required',
  //   defaultValue: 'United States',
  //   options: [
  //     { label: 'United States', value: 'United States' },
  //     { label: 'United States Minor Outlying Islands', value: 'United States Minor Outlying Islands' }
  //   ],
  //   xs: 5,
  //   sm: 5,
  //   md: 5,
  //   lg: 5,
  //   xl: 5
  // },
];

class CreateModal extends React.Component {
  // componentDidUpdate(prevProps) {
  //   const { errors } = this.props;
  //   if (!prevProps.errors && errors) {
  //     if (!isEmpty(this.cardFields) && !isEmpty(this.cardFields.setErrorFields)) {
  //       this.cardFields.setErrorFields(['cardNumber']);
  //     }
  //   } else {
  //     if (!isEmpty(this.cardFields) && !isEmpty(this.cardFields.setErrorFields)) {
  //       this.cardFields.setErrorFields([]);
  //     }
  //   }
  // }

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
    const { userId } = this.props;
    if (cardsVailid && infoValid) {
      const cardValue = this.cardFields.getFieldValues();
      const infoValues = this.infoFields.getFieldValues();
      this.props.CreateCreditCard({
        data: { userId, ...cardValue, ...infoValues },
        success: this.onSuccess,
        error: () => {
          const { errors } = this.props;
          if (errors && errors.length > 0) {
            toastr.error(errors[0].message);
          }
        }
      });
    }
  };

  render() {
    const { open, onClose, currentStatus, currentUser } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={this.save} key="modal_btn_save">SAVE</OrangeButton>
    ];
    infoFields[0].defaultValue = get(currentUser, 'attributes.firstName');
    infoFields[1].defaultValue = get(currentUser, 'attributes.lastName');
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
  currentUser: state.user.currentUser,
  currentStatus: state.creditCard.currentStatus,
  errors: state.creditCard.errors
});

const mapDispatchToProps = {
  CreateCreditCard
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
