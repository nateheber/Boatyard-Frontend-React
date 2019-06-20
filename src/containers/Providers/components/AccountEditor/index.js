import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import { AccountHeader, CompanyInfo, ContactInfo } from './components';
import LoadingSpinner from 'components/basic/LoadingSpinner';

import { getProviderPrimaryLocation } from 'utils/provider';
import { formatPhoneNumber } from 'utils/basic';

import { CreateProvider, UpdateProvider, LoginWithProvider } from 'store/actions/providers';
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
  @media (max-width: 900px) {
    padding: 30px 50px 26px;
  }
  @media (max-width: 600px) {
    padding: 25px;
  }
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
  constructor(props) {
    super(props);
    this.state = {
      saving: false
    };
  }
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
        logo: null
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
      const logo = get(provider, 'logo.url');
      return {
        name,
        street,
        city,
        state,
        zip,
        websiteUrl,
        logo
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
      const contactName = get(provider, 'contactName', '');
      const contactEmail = get(provider, 'contactEmail', '');
      const contactPhone = get(provider, 'phoneNumber', '');
      return {
        contactName,
        contactEmail,
        contactPhone: formatPhoneNumber(contactPhone),
      };
    }
  }

  createProvider = () => {
    const companyInfo = this.companyFields.getFieldValues();
    const contactInfo = this.contactFields.getFieldValues();
    const { CreateProvider, onCreation } = this.props;
    const { name, websiteUrl, street, city, state, zip, email, logo } = companyInfo;
    const { contactName, contactPhone, contactEmail } = contactInfo;
    const locationInfo = {
      primary_location_attributes: {
        location_type: 'business_address',
        name,
        address_attributes: {
          street, city, state, zip, country: 'USA'
        }
      }
    };
    const params = {
      name,
      email,
      website_url: websiteUrl,
      phone_number: contactPhone,
      contact_name: contactName,
      contact_email: contactEmail,
      ...locationInfo
    };
    if (logo.baseString && logo.baseString.indexOf('http') !== 0) {
      params['logo'] = logo.baseString;
    };
    CreateProvider({
      data: {
        provider: params
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
    const { name, websiteUrl, street, city, state, zip, logo } = companyInfo;
    const { contactName, contactPhone, contactEmail } = contactInfo;
    const providerLocation = get(provider, 'relationships.primaryLocation.data');
    const locationInfo = providerLocation ? {
      primary_location_attributes: {
        id: providerLocation.id,
        location_type: 'business_address',
        name,
        address_attributes: {
          street, city, state, zip, country: 'USA'
        }
      }
    } : {
      primary_location_attributes: {
        location_type: 'business_address',
        name,
        address_attributes: {
          street, city, state, zip, country: 'USA'
        }
      }
    };
    const params = {
      name,
      website_url: websiteUrl,
      contact_name: contactName,
      contact_email: contactEmail,
      phone_number: contactPhone,
      ...locationInfo,
    };
    if (logo.baseString && logo.baseString.indexOf('http') !== 0) {
      params['logo'] = logo.baseString;
    };
    UpdateProvider({
      data: {
        provider: params
      },
      providerId,
      success: () => {
        this.setState({ saving: false });
        onUpdate();
      },
      error: (e) => {
        this.setState({ saving: false });
        toastr.error('Error', e.message);
      }
    })
  }

  selectProvider = () => {
    const { provider, LoginWithProvider } = this.props;
    LoginWithProvider({
      providerId: provider.id,
      success: () => {
        this.setState({ saving: false });
        this.props.history.push('/dashboard');
      },
      error: (e) => {
        this.setState({ saving: false });
        toastr.error('Error', e.message);
      }
    });
  };

  saveData = () => {
    const { newFlg } = this.props;
    const isCompanyValid = this.companyFields.validateFields();
    const isContactValid = this.contactFields.validateFields();
    if (isCompanyValid && isContactValid) {
      this.setState({ saving: true });
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
    const { saving } = this.state;
    const { newFlg } = this.props;
    const name = this.getName();
    const companyInfo = this.getDefaultCompanyInfo();
    const contactInfo = this.getDefaultContactInfo();
    return (
      <Wrapper>
        <AccountHeader name={name} onLogin={this.selectProvider} />
        <EditorWrapper>
          <EditorContent>
            <CompanyInfo newFlg={newFlg} ref={this.setCompanyFieldsRef} defaultValues={companyInfo} />
            <ContactInfo ref={this.setContactFieldsRef} defaultValues={contactInfo} />
          </EditorContent>
          <ButtonWrapper>
            <OrangeButton onClick={this.saveData}>SAVE</OrangeButton>
          </ButtonWrapper>
        </EditorWrapper>
        {saving && <LoadingSpinner loading={saving}/>}
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
  LoginWithProvider
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountEditor));