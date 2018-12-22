import React from 'react';
import { isEmpty } from 'lodash';

import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import FormFields from 'components/template/FormFields';

export class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data
    };
  }

  onSave = () => {
    if (
      this.mainFields.validateFields() &&
      (this.propertyFields && this.propertyFields.validateFields())
    ) {
      const mainFieldValues = this.mainFields.getFieldValues();
      const propertyFieldValues = this.propertyFields
        ? this.propertyFields.getFieldValues()
        : [];
      this.props.onSave(mainFieldValues, propertyFieldValues);
    } else {
      this.props.setErrorState('Please fill out all required fields');
      setTimeout(this.props.resetErrorState, 3000);
    }
  };

  onChange = (value, field) => {
    if (field === 'categoryId') {
      this.props.onChangeCategory(value.categoryId);
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setPropertyFieldsRef = ref => {
    this.propertyFields = ref;
  };

  render() {
    const { mainFields, propertyFields, onCancel } = this.props;
    const fields = (
      <React.Fragment>
        <FormFields
          ref={this.setMainFieldsRef}
          onChange={this.onChange}
          fields={mainFields}
        />
        {!isEmpty(propertyFields) && (
          <FormFields ref={this.setPropertyFieldsRef} fields={propertyFields} />
        )}
      </React.Fragment>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={onCancel}>Cancel</HollowButton>,
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
