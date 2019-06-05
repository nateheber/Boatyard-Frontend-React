import React from 'react';
import { get } from 'lodash';
import FormFields from 'components/template/FormFields';
import Switch from 'react-switch';

import { formatPhoneNumber } from 'utils/basic';
import { Section, SectionHeader, SectionContent, HeaderTitle } from '../Section';

export default class CustomerInfoSection extends React.Component {
  setCustomerInfoFieldRef = (ref) => {
    this.customerInfoFields = ref;
  };

  getCustomerInfoFieldsInfo = () => {
    const customerInfo = get(this.props, 'customerInfo', {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    });
    const {
      firstName,
      lastName,
      phoneNumber,
      email
    } = customerInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'first_name',
        className: 'primary',
        label: 'First Name',
        errorMessage: 'Enter First Name',
        required: true,
        defaultValue: firstName,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'last_name',
        className: 'primary',
        label: 'Last Name',
        errorMessage: 'Enter Last Name',
        required: true,
        defaultValue: lastName,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'email',
        className: 'primary',
        label: 'Email',
        errorMessage: 'Enter Email',
        required: true,
        defaultValue: email,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'phone_number',
        className: 'primary',
        label: 'Phone Number',
        errorMessage: 'Enter Phone Number',
        mask: '(999) 999-9999',
        required: true,
        defaultValue: formatPhoneNumber(phoneNumber),
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      }
    ]
    return fields;
  };

  handleChangeVisible = (contentVisible) => {
    const { onChangeVisible } = this.props;
    if (onChangeVisible) {
      onChangeVisible(contentVisible);
    }
  };

  render() {
    const { contentVisible } = this.props;
    const customerFields = this.getCustomerInfoFieldsInfo();
    return (
      <Section>
        <SectionHeader>
          <HeaderTitle>Customer Info</HeaderTitle>
          <Switch
            checked={contentVisible}
            onChange={this.handleChangeVisible}
            onColor={'transparent'}
            offColor={'transparent'}
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 12,
                  color: '#FFFFFF',
                  paddingRight: 2,
                  backgroundColor: '#A9B5BB',
                  borderRadius: '0 6px 6px 0'
                }}
              >
                OFF
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 12,
                  color: '#FFFFFF',
                  paddingRight: 2,
                  backgroundColor: '#F38118',
                  borderRadius: '6px 0 0  6px'
                }}
              >
                ON
              </div>
            }
            className='switch-job'
            id='icon-switch'
          />
        </SectionHeader>
        {contentVisible && <SectionContent>
          <FormFields
            ref={this.setCustomerInfoFieldRef}
            fields={customerFields}
          />
        </SectionContent>}
      </Section>
    );
  }
}
