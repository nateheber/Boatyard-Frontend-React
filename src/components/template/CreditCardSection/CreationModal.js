import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { createCreditCard } from 'store/reducers/creditCards';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal'
import FormFields from 'components/template/FormFields'

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
]

const infoFields = [
  {
    type: 'text_field',
    field: 'firstName',
    label: 'First Name',
    required: true,
    errorMessage: 'Required',
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
  {
    type: 'select_box',
    field: 'country',
    label: 'Country',
    required: true,
    errorMessage: 'Required',
    defaultValue: 'United States',
    options: [
      { label: 'United States', value: 'United States' },
      { label: 'United States Minor Outlying Islands', value: 'United States Minor Outlying Islands' }
    ],
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
    xl: 5
  },
]

class CreateModal extends React.Component {
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (!prevProps.error && error) {
      if (!isEmpty(this.cardFields) && !isEmpty(this.cardFields.setErrorFields)) {
        this.cardFields.setErrorFields(['cardNumber']);
      }
    } else {
      if (!isEmpty(this.cardFields) && !isEmpty(this.cardFields.setErrorFields)) {
        this.cardFields.setErrorFields([]);
      }
    }
  }

  onSuccess = () => {
    this.props.refreshCards();
    this.props.onClose();
  }

  setCardFieldsRef = (ref) => {
    this.cardFields = ref
  }

  setInfoFieldsRef = (ref) => {
    this.infoFields = ref
  }

  save = () => {
    const cardsVailid = this.cardFields.validateFields();
    const infoValid = this.infoFields.validateFields();
    const { userId } = this.props
    if (cardsVailid && infoValid) {
      const cardValue = this.cardFields.getFieldValues();
      const infoValues = this.infoFields.getFieldValues();
      this.props.createCreditCard({ data: { userId, ...cardValue, ...infoValues }, callback: this.onSuccess })
    }
  }

  render() {
    const { open, onClose } = this.props
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={this.save} key="modal_btn_save">SAVE</OrangeButton>
    ]
    return (
      <Modal
        title="Edit Customer Information"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <FormFields ref={this.setCardFieldsRef} fields={cardFields} />
        <FormFields ref={this.setInfoFieldsRef} fields={infoFields} />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.creditCard.error,
})

const mapDispatchToProps = {
  createCreditCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
