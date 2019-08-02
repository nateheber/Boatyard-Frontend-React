import React from 'react';
import { get } from 'lodash';
import FormFields from 'components/template/FormFields';
import Switch from 'react-switch';

import { Section, SectionHeader, SectionContent, HeaderTitle } from '../Section';

const LOCATION_TYPES = [
  { value: 'marina', label: 'Marina' },
  { value: 'private_dock', label: 'Private Dock' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'dry_storage', label: 'Dry Storage' }
];

export default class LocationInfoSection extends React.Component {
  setLocationInfoFieldRef = (ref) => {
    this.locationInfoFields = ref;
  };

  getLocationInfoFieldsInfo = () => {
    const { boatInfo } = this.props;
    const slip = get(boatInfo, 'slip', '') || '';
    const locationType = get(boatInfo, 'location.attributes.locationType', '') || '';
    const blankAddress = {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    };
    const locationInfo = get(boatInfo, 'location.relationships.address.data', blankAddress) || blankAddress;
    const { street, city, state, zipcode } = locationInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'address',
        className: 'primary',
        label: 'Address',
        errorMessage: 'Enter Address',
        required: true,
        defaultValue: `${street}, ${city}, ${state}${zipcode}`,
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'select_box',
        field: 'location_type',
        className: 'primary',
        label: 'Location Type',
        errorMessage: 'Select Location Type',
        required: true,
        defaultValue: locationType,
        options: LOCATION_TYPES,
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'slip',
        className: 'primary',
        label: 'Slip #',
        errorMessage: 'Enter Slip Number',
        required: true,
        defaultValue: slip,
        // disabled: locationType !== 'mariana',
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
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
    const locationFields = this.getLocationInfoFieldsInfo();
    return (
      <Section>
        <SectionHeader>
          <HeaderTitle>Location</HeaderTitle>
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
            ref={this.setLocationInfoFieldRef}
            fields={locationFields}
          />
        </SectionContent>}
      </Section>
    );
  }
}
