import React from 'react';
import { hasIn } from 'lodash';

import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';

export class CategoryEditor extends React.Component {
  state = {
    newFields: []
  };

  onSave = () => {
    this.props.onSave({ ...this.state });
  };

  setMainFieldsRef = ref => {
    this.mainFieldsRef = ref;
  };

  setAdditionalFieldsRef = (ref, idx) => {
    this.additionalFieldRef[idx] = ref;
  };

  setNewAdditionalFieldsRef = (ref, idx) => {
    this.newAddtionalFieldRef[idx] = ref;
  };

  addAdditionalField = (ref, idx) => {
    const newFields = [...this.state.newFields];
    newFields.push({
      fieldInfo: [
        {
          field: 'name',
          label: 'Name',
          type: 'text_input',
          errorMessage: 'Enter the field name',
          required: true,
          defaultValue: '',
          xs: 6,
          sm: 6,
          md: 4,
          lg: 4,
          xl: 4
        },
        {
          field: 'fieldType',
          label: 'Field Type',
          type: 'select_box',
          errorMessage: 'Select Field Type',
          required: true,
          defaultValue: 'text_input',
          xs: 6,
          sm: 6,
          md: 4,
          lg: 4,
          xl: 4
        },
        {
          field: 'required',
          label: 'Field Type',
          type: 'check_box',
          defaultValue: false,
          xs: 6,
          sm: 6,
          md: 4,
          lg: 4,
          xl: 4
        }
      ]
    });
  };

  render() {
    const { mainFields, additionalFields } = this.props;
    const { newFields } = this.state;
    const fields = (
      <React.Fragment>
        <FormFields ref={this.setMainFieldsRef} fields={mainFields} />
        <OrangeButton title="Add Field" onClick={this.addAdditionalField} />
        {additionalFields.map((val, idx) => (
          <React.Fragment>
            <FormFields
              ref={ref => this.setAdditionalFieldsRef(ref, idx)}
              fields={val.fieldsInfo}
            />
            <OrangeButton
              title="Remove Field"
              onClick={() => this.removeAdditionalFields(idx)}
            />
          </React.Fragment>
        ))}
        {newFields.map((val, idx) => (
          <React.Fragment>
            <FormFields
              ref={ref => this.setNewAdditionalFieldsRef(ref, idx)}
              fields={val}
            />
            <OrangeButton
              title="Remove Field"
              onClick={() => this.removeNewAdditionalFields(idx)}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.props.onCancel}>Cancel</HollowButton>,
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
