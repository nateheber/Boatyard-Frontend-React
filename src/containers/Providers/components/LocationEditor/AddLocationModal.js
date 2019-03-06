import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

const InfoSection = styled.div`
  padding: 15px 7px;
  &:first-child {
    margin-bottom: 25px;
    border-bottom: 1px solid #dfdfdf;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 7px;
`;

export default class AddConfirmationModal extends React.Component {
  getBasicInfoFields = () => {
    const { providerLocation } = this.props;
    if (providerLocation) {
      return [];
    } else {
      return [
        {
          field: 'locationName',
          label: 'Location Name',
          type: 'text_field',
          errorMessage: 'Enter location name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'contactName',
          label: 'Contact Name',
          type: 'text_field',
          errorMessage: 'Enter contact name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'phoneNumber',
          label: 'Phone',
          type: 'text_field',
          errorMessage: 'Enter the phone number',
          mask: '(999)999-9999',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'email',
          label: 'Email',
          type: 'text_field',
          errorMessage: 'Enter email',
          required: true,
          xs: 12,
          md: 6,
        },
      ]
    }
  }

  getAddressFields = () => {
    const { providerLocation } = this.props;
    if (providerLocation) {
      return [];
    } else {
      return [
        {
          field: 'address',
          label: 'Address',
          type: 'text_field',
          errorMessage: 'Enter address',
          required: true,
          xs: 12,
        },
        {
          field: 'city',
          label: 'City',
          type: 'text_field',
          errorMessage: 'Enter city',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'state',
          label: 'State',
          type: 'text_field',
          errorMessage: 'Enter state',
          required: true,
          xs: 6,
          md: 3,
        },
        {
          field: 'zipCode',
          label: 'Zip Code',
          type: 'text_field',
          errorMessage: 'Enter Zip Code',
          required: true,
          xs: 6,
          md: 3,
        },
      ]
    }
  }

  render() {
    const { open, onClose } = this.props;
    const basicInfoFields = this.getBasicInfoFields();
    const addressFields = this.getAddressFields();
    return (
      <Modal
        title="Add Location"
        open={open}
        onClose={onClose}
      >
        <InfoSection>
          <FormFields fieldSize="big" fields={basicInfoFields} />
        </InfoSection>
        <InfoSection>
          <FormFields fieldSize="big" fields={addressFields} />
        </InfoSection>
        <ButtonWrapper>
          <OrangeButton className="big thin-font">
            Add Location
          </OrangeButton>
        </ButtonWrapper>
      </Modal>
    );
  }
}
