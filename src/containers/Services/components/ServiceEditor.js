import React from 'react';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import FormFields from 'components/template/FormFields';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

export class ServiceEditor extends React.Component {
  onSave = () => {
    const { serviceFields } = this.props;
    const { onSave } = this.props;
    if (this.mainFields.validateFields() &&  (!isEmpty(serviceFields) && this.serviceFields.validateFields())) {
      const mainValues = {
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      if (!isEmpty(serviceFields)) {
        onSave({
          ...mainValues,
          properties: this.serviceFields.getFieldValues()
        });
      } else {
        onSave(mainValues);
      }
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setServiceFieldsRef = ref => {
    this.serviceFields = ref;
  };

  setdescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { mainFields, serviceFields, descriptionField, onCancel } = this.props;
    const fields = (
      <React.Fragment>
        { !isEmpty(mainFields) && <FormFields
          ref={this.setMainFieldsRef}
          fields={mainFields}
        />}
        { !isEmpty(serviceFields) && <FormFields
          ref={this.setServiceFieldsRef}
          fields={serviceFields}
        />}
        <Divider />
        { !isEmpty(descriptionField) && <FormFields
          ref={this.setdescriptionFieldRef}
          fields={descriptionField}
        />}
      </React.Fragment>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
