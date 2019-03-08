import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import { AccountHeader, CompanyInfo, ContactInfo } from './components';

import { getProviderPrimaryLocation } from 'utils/provider';

import { CreateProvider, UpdateProvider } from 'store/actions/providers';
import { CreateProviderLocation, UpdateProviderLocation } from 'store/actions/providerLocations';

const Wrapper = styled.div`
  padding-top: 18px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  margin: 27px 24px;
  padding: 38px 77px 26px;
`;

const EditorContent = styled.div`
  border-bottom: 1px solid #dfdfdf;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 24px;
`

class AccountEditor extends React.Component {
  getName = () => {
    const { provider, newFlg } = this.props;
    return newFlg ? 'New Provider' : get(provider, 'name', '');
  }

  getDefaultCompanyInfo = () => {
    const { provider, newFlg } = this.props;
    if (newFlg) {
      return {
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        websiteUrl: '',
      };
    } else {
      const locationInfo = getProviderPrimaryLocation(provider);
      const websiteUrl = get(provider, 'websiteUrl', '');
      const name = get(provider, 'name', '');
      const address = get(locationInfo, 'relationships.address.data');
      const street = get(address, 'street', '');
      const city = get(address, 'city', '');
      const state = get(address, 'state', '');
      const zip = get(address, 'zip', '');
      return {
        name,
        street,
        city,
        state,
        zip,
        websiteUrl,
      };
    }
  }

  getDefaultContactInfo = () => {
    const { provider, newFlg } = this.props;
    if (newFlg) {
      return {
        contactName: '',
        contactEmail: '',
        contactPhone: '',
      };
    } else {
      const locationInfo = getProviderPrimaryLocation(provider);
      const contactName = get(locationInfo, 'contactName', '');
      const contactEmail = get(locationInfo, 'contactEmail', '');
      const contactPhone = get(locationInfo, 'contactPhone', '');
      return {
        contactName,
        contactEmail,
        contactPhone,
      };
    }
  }

  createProvider = () => {
    const companyInfo = this.companyFields.getFieldValues();
    const contactInfo = this.contactFields.getFieldValues();
    const { CreateProvider, onCreation } = this.props;
    const { name, websiteUrl, street, city, state, zip } = companyInfo;
    const { contactName, contactPhone, contactEmail } = contactInfo;
    CreateProvider({
      data: {
        name, website_url: websiteUrl, email: contactEmail,
        primary_location_attributes: {
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          location_type: 'business_address',
          name,
          address_attributes: {
            street, city, state, zip, country: 'USA'
          }
        }
      },
      success: (provider) => {
        const { id } = provider;
        onCreation(id);
      }
    });
  }

  updateProvider = () => {
    const companyInfo = this.companyFields.getFieldValues();
    const contactInfo = this.contactFields.getFieldValues();
    const { provider, UpdateProvider, onUpdate } = this.props;
    const providerId = get(provider, 'id');
    const { name, websiteUrl, street, city, state, zip } = companyInfo;
    const { contactName, contactPhone, contactEmail } = contactInfo;
    const providerLocation = get(provider, 'relationships.primaryLocation.data');
    const locationInfo = providerLocation ? {
      primary_location_attributes: {
        id: providerLocation.id,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        location_type: 'business_address',
        name,
        address_attributes: {
          street, city, state, zip, country: 'USA'
        }
      }
    } : {
      primary_location_attributes: {
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        location_type: 'business_address',
        name,
        address_attributes: {
          street, city, state, zip, country: 'USA'
        }
      }
    };
    UpdateProvider({
      data: {
        name,
        website_url: websiteUrl,
        email: contactEmail,
        ...locationInfo,
      },
      providerId,
      success: onUpdate
    })
  }

  saveData = () => {
    const { newFlg } = this.props;
    const isCompanyValid = this.companyFields.validateFields();
    const isContactValid = this.contactFields.validateFields();
    if (isCompanyValid && isContactValid) {
      if (newFlg) {
        this.createProvider();
      } else {
        this.updateProvider();
      }
    }
  }

  setCompanyFieldsRef = (ref) => {
    this.companyFields = ref;
  }

  setContactFieldsRef = (ref) => {
    this.contactFields = ref;
  }

  render() {
    const name = this.getName();
    const companyInfo = this.getDefaultCompanyInfo();
    const contactInfo = this.getDefaultContactInfo();
    return (
      <Wrapper>
        <AccountHeader name={name} />
        <EditorWrapper>
          <EditorContent>
            <CompanyInfo ref={this.setCompanyFieldsRef} defaultValues={companyInfo} />
            <ContactInfo ref={this.setContactFieldsRef} defaultValues={contactInfo} />
          </EditorContent>
          <ButtonWrapper>
            <OrangeButton onClick={this.saveData}>SAVE</OrangeButton>
          </ButtonWrapper>
        </EditorWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: get(state, 'provider.currentProvider')
});

const mapDispatchToProps = {
  CreateProvider,
  UpdateProvider,
  CreateProviderLocation,
  UpdateProviderLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditor);