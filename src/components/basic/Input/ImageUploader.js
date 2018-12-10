import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  color: #f00;
`;

export class ImageUploader extends React.Component {
  handleChange = evt => {
    const reader = new FileReader();
    const file = evt.target.files[0];
    const self = this;

    reader.onload = function(upload) {
      self.props.onChange(upload.target.result);
    };
    reader.readAsDataURL(file);
  };
  render() {
    return (
      <Input
        type="file"
        onChange={this.handleChange}
        encType="multipart/form-data"
      />
    );
  }
}
