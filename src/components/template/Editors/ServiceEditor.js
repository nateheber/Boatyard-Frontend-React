import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  Select,
  TextArea,
  CheckField
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class ServiceEditor extends React.Component {
  render() {
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Service Type</InputLabel>
            <Select>
              <option value="service">Service</option>
              <option value="part">Part</option>
              <option value="product">Product</option>
              <option value="other">Other</option>
            </Select>
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Service Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Price</InputLabel>
            <Input type="text" placeholder="e.g, 23.00" />
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Price Type</InputLabel>
            <Select>
              <option value="none">None</option>
              <option value="length">Length</option>
              <option value="gallons">Gallons</option>
              <option value="hour">Hour</option>
              <option value="quality">Quality</option>
            </Select>
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Price Unit</InputLabel>
            <Input type="text" placeholder="i.e /gal /hr" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Description</InputLabel>
            <TextArea />
          </InputWrapper>
          <InputWrapper>
            <CheckField
              title="Is taxable"
              checked
              onClick={() => {
                console.log('Check clicked');
              }}
            />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = [
      <HollowButton>Cancel</HollowButton>,
      <OrangeButton>Save</OrangeButton>
    ];
    return <EditorSection content={fields} actions={actions} />;
  }
}
