import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  Select,
  TextArea
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data
    };
  }

  onChangeValue = (field, val) => {
    const obj = {};
    obj[field] = val;
    this.setState({ ...obj });
  };

  onSave = () => {
    this.props.onSave(this.state);
  };

  render() {
    const { categoryOptions, onCancel } = this.props;
    const {
      categoryId,
      name,
      subtitle,
      label,
      description,
      secondaryDescription
    } = this.state;
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Service Category</InputLabel>
            <Select
              onChange={evt =>
                this.onChangeValue('categoryId', parseInt(evt.target.value))
              }
              defaultValue={categoryId}
            >
              {categoryOptions.map((val, idx) => (
                <option value={val.id} key={`categoryOption_${idx}`}>
                  {val.name}
                </option>
              ))}
            </Select>
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Service Name</InputLabel>
            <Input
              type="text"
              defaultValue={name}
              onChange={evt => this.onChangeValue('name', evt.target.value)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Subtitle</InputLabel>
            <Input
              type="text"
              defaultValue={subtitle}
              onChange={evt => this.onChangeValue('subtitle', evt.target.value)}
            />
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Label</InputLabel>
            <Input
              type="text"
              defaultValue={label}
              onChange={evt => this.onChangeValue('label', evt.target.value)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Description</InputLabel>
            <TextArea
              defaultValue={description}
              onChange={evt =>
                this.onChangeValue('description', evt.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Secondary Description</InputLabel>
            <TextArea
              defaultValue={secondaryDescription}
              onChange={evt =>
                this.onChangeValue('secondaryDescription', evt.target.value)
              }
            />
          </InputWrapper>
        </InputRow>
      </div>
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
