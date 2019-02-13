import React from 'react';
import { get } from 'lodash';
import deepEqual from 'deep-equal';

import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';

export class CategoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.mainFieldsRef = [];
    this.additionalFieldRef = [];
    this.newAdditionalFieldRef = [];
    this.state = {
      newFields: [],
      additionalFields: props.additionalFields
    };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.additionalFields, prevProps.additionalFields)) {
      this.setState({
        additionalFields: this.props.additionalFields
      });
    }
  }

  onSave = () => {
    const { additionalFields } = this.state;
    let state = true;
    state = this.mainFieldsRef.validateFields();
    for (let i = 0; i < additionalFields.length; i += 1) {
      if (!get(additionalFields[i], 'fieldInfo.Destroy', false)) {
        if (!this.additionalFieldRef[i].validateFields()) {
          state = false;
        }
      }
    }
    for (let i = 0; i < this.newAdditionalFieldRef.length; i += 1) {
      if (this.newAdditionalFieldRef[i]) {
        if (!this.newAdditionalFieldRef[i].validateFields()) {
          state = false;
        }
      }
    }
    if (state) {
      const mainValues = this.mainFieldsRef.getFieldValues();
      const additionalFieldValues = additionalFields.map((val, idx) => {
        if (get(val, 'fieldInfo.Destroy', false)) {
          return {
            id: val.id,
            destroy: true
          };
        }
        return {
          id: val.id,
          ...this.additionalFieldRef[idx].getFieldValues()
        };
      });
      const newAdditionalFieldValues = [];
      for (let i = 0; i < this.newAdditionalFieldRef.length; i += 1) {
        if (this.newAdditionalFieldRef[i]) {
          newAdditionalFieldValues.push(
            this.newAdditionalFieldRef[i].getFieldValues()
          );
        }
      }
      this.props.onSave({
        ...mainValues,
        fields_attributes: [
          ...additionalFieldValues,
          ...newAdditionalFieldValues
        ]
      });
    }
  };

  setMainFieldsRef = ref => {
    this.mainFieldsRef = ref;
  };

  setAdditionalFieldsRef = (ref, idx) => {
    this.additionalFieldRef[idx] = ref;
  };

  setNewAdditionalFieldsRef = (ref, idx) => {
    this.newAdditionalFieldRef[idx] = ref;
  };

  removeAdditionalFields = idx => {
    const additionalFields = [...this.state.additionalFields];
    additionalFields[idx].fieldInfo = {
      Destroy: true
    };
    this.setState({
      additionalFields
    });
  };

  removeNewAdditionalFields = idx => {
    const newFields = [...this.state.newFields];
    this.setState({
      newFields: [
        ...newFields.slice(0, idx),
        ...newFields.slice(idx + 1, newFields.length)
      ]
    });
  };

  addAdditionalField = (ref, idx) => {
    const newFields = [...this.state.newFields];
    newFields.push({
      fieldInfo: [
        {
          field: 'name',
          label: 'Name',
          type: 'text_field',
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
          field: 'field_type',
          label: 'Field Type',
          type: 'select_box',
          errorMessage: 'Select Field Type',
          required: true,
          defaultValue: 'text_field',
          options: [
            { value: 'check_box', label: 'CheckBox' },
            { value: 'text_area', label: 'TextArea' },
            { value: 'select_box', label: 'SelectBox' },
            { value: 'text_field', label: 'TextInput' }
          ],
          xs: 6,
          sm: 6,
          md: 4,
          lg: 4,
          xl: 4
        },
        {
          field: 'required',
          label: 'Required',
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
    this.setState({
      newFields
    });
  };

  render() {
    const { mainFields } = this.props;
    const { additionalFields } = this.state;
    const { newFields } = this.state;
    const fields = (
      <React.Fragment>
        <FormFields ref={this.setMainFieldsRef} fields={mainFields} />
        <OrangeButton onClick={this.addAdditionalField}>Add Field</OrangeButton>
        {additionalFields.map((val, idx) => {
          return get(val, 'fieldInfo.Destroy', false) ? (
            false
          ) : (
            <React.Fragment key={`additional_fields_${idx}`}>
              <FormFields
                ref={ref => this.setAdditionalFieldsRef(ref, idx)}
                fields={val.fieldInfo}
              />
              <OrangeButton onClick={() => this.removeAdditionalFields(idx)}>
                Remove Field
              </OrangeButton>
            </React.Fragment>
          );
        })}
        {newFields.map((val, idx) => (
          <React.Fragment key={`new_fields_${idx}`}>
            <FormFields
              ref={ref => this.setNewAdditionalFieldsRef(ref, idx)}
              fields={val.fieldInfo}
            />
            <OrangeButton onClick={() => this.removeNewAdditionalFields(idx)}>
              Remove Field
            </OrangeButton>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.props.onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
