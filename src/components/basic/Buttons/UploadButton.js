import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: none;
`;

const Button = styled.label`
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169,181,187);
  border-image: initial;
  border-radius: 6px;
  cursor: pointer;
  color: #333;
  font-size: 12px;
  font-family: Montserrat,sans-serif;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  height: 30px;
  margin: 5px;
  padding: 0 15px;
  outline: none;
`;

export class UploadButton extends React.Component{
  handleChange = (e, file) => {
    const { onFileChange } = this.props;

    const newFile = file || e.target.files[0],
          reader = new FileReader();
    if (newFile) {
      this.setState({ loaded: false });

      reader.onload = e => {
        onFileChange(newFile, reader.result, this.refs.input);
      };
  
      reader.readAsDataURL(newFile);  
    }
  }

  render() {
    const { title, accept, ...rest } = this.props;
    return (
      <Button {...rest} >
        {title || 'Upload'}
        <Input type="file" accept={accept || '*.*'} onChange={this.handleChange} ref="input" />
      </Button>  
    );
  }
}