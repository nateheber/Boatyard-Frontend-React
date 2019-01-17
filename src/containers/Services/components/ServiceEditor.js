import React from 'react';

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
    if (this.mainFields.validateFields()) {
      const mainFieldValues = this.mainFields.getFieldValues();
      this.props.onSave(mainFieldValues);
    } else {
      this.props.setErrorState('Please fill out all required fields');
      setTimeout(this.props.resetErrorState, 3000);
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  render() {
    const { mainFields, onCancel } = this.props;
    const fields = (
      <React.Fragment>
        <FormFields
          ref={this.setMainFieldsRef}
          fields={mainFields}
        />
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
