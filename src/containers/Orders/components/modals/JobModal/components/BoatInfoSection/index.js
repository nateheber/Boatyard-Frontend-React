import React from 'react';
import { get } from 'lodash';
import FormFields from 'components/template/FormFields';
import Switch from 'react-switch';

import { Section, SectionHeader, SectionContent, HeaderTitle } from '../Section';

export default class BoatInfoSection extends React.Component {
  setBoatInfoFieldRef = (ref) => {
    this.boatInfoFields = ref;
  };

  getBoatInfoFieldsInfo = () => {
    const boatInfo = get(this.props, 'boatInfo', {
      name: '',
      make: '',
      model: '',
      length: ''
    });
    const {
      name,
      make,
      model,
      length
    } = boatInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'name',
        className: 'primary',
        label: 'Name',
        errorMessage: 'Enter Name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'make',
        className: 'primary',
        label: 'Make',
        errorMessage: 'Enter Make',
        required: true,
        defaultValue: make,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'model',
        className: 'primary',
        label: 'Model',
        errorMessage: 'Enter Model',
        required: true,
        defaultValue: model,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'length',
        className: 'primary',
        label: 'Length',
        errorMessage: 'Enter Length',
        required: true,
        defaultValue: length,
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
    const boatFields = this.getBoatInfoFieldsInfo();
    return (
        <Section>
          <SectionHeader>
            <HeaderTitle>Boat Info</HeaderTitle>
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
              ref={this.setBoatInfoFieldRef}
              fields={boatFields}
            />
          </SectionContent>}
        </Section>

    );
  }
}
