import React from 'react';
import styled from  'styled-components';
import { get, find } from 'lodash';

import EditIcon from 'resources/edit.svg';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  width: 281px;
  height: 406px;
  border: solid 1px #979797;
  background-color: #ffffff;
  margin-bottom: 20px;
  margin-right: 23px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 104.9px;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const ProviderName = styled.div`
  font-family: DIN-Regular;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.3px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;

const LocationName = styled.div`
  font-family: DIN-Regular;
  font-size: 18px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 23px 30px;
`;

const AddressWrapper = styled.div`
  padding-bottom: 18px;
  margin-bottom: 17px;
  border-bottom: 1px solid #d4d9e0;
`;

const AddressLine1 = styled.div`
  font-family: DIN-Light;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #04416a;
`;

const AddressLine2 = styled.div`
  font-family: DIN;
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #04416a;
`;

const ContactField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: DIN-Light;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #04416a;
  height: 28px;
`;

const ContactFieldLabel = styled.div`
  width: 50px;
`;

const ContactTrigger = styled.div`
  display: inline-block;
  position: relative;
  height: 23px;
  width: 86px;
  font-family: DIN;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #bbbbbb;
  &::after {
    content: '';
    position: absolute;
    right: 6px;
    top: 7px;
    display: inline-block;
    width: 11.2px;
    height: 11.2px;
    background-color: #04416a;
    mask-image: url(${EditIcon});
    mask-size: 11.2px;
    mask-repeat: no-repeat;
    mask-position: center center;
  }
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
`;

const LoginButton = styled(HollowButton)`
  min-width: 110px;
  width: 110px;
  padding: 5px;
  margin: 0px;
`;

const CreateButton = styled(OrangeButton)`
  min-width: 110px;
  width: 110px;
  padding: 5px;
  margin: 0px;
`;

const getAddressInformation = (location) => {
  const relationships = get(location, 'relationships');
  const locationInfo = find(relationships, r => r.type === 'locations');
  const locationName = get(locationInfo, 'attributes.name');
  const address = get(locationInfo, 'relationships.address.data');
  const street = get(address, 'street');
  const city = get(address, 'city');
  const state = get(address, 'state');
  const zip = get(address, 'zip');
  return ({
    locationName,
    street,
    city,
    state,
    zip
  });
}

export default ({ providerName, location }) => {
  const headerImage = get(location, 'homeImage.url');
  const contactName = get(location, 'contactName');
  const contactPhone = get(location, 'contactPhone');
  const contactEmail = get(location, 'contactEmail');
  const { locationName, street, city, state, zip } = getAddressInformation(location);
  return (
    <Wrapper>
      <Header src={headerImage}>
        <ProviderName>{providerName}</ProviderName>
        <LocationName>{locationName}</LocationName>
      </Header>
      <Content>
        <AddressWrapper>
          <AddressLine1>{street}</AddressLine1>
          <AddressLine2>{city}, {state} {zip}</AddressLine2>
        </AddressWrapper>
        <ContactTrigger>CONTACT</ContactTrigger>
        <ContactField>
          <ContactFieldLabel>Name:</ContactFieldLabel>{contactName}
        </ContactField>
        <ContactField>
          <ContactFieldLabel>Phone:</ContactFieldLabel>{contactPhone}
        </ContactField>
        <ContactField>
          <ContactFieldLabel>Email:</ContactFieldLabel>{contactEmail}
        </ContactField>
        <ButtonWrapper>
          <LoginButton className="thin-font">LOGIN</LoginButton>
          <CreateButton className="thin-font">CREATE APP</CreateButton>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  )
}

