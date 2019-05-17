import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: none;
`;

const Button = styled.label`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  outline: none;
  cursor: pointer;
  background: #FFFFFF;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.12) 100%);
  border: 1px solid #A9B5BB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Montserrat',sans-serif;
  font-weight: 700;
  color: #003247;
  text-transform: uppercase;
`;

export class FileInput extends React.Component{
  handleChange = (e, file) => {
    const { onChange } = this.props;

    const newFile = file || e.target.files[0],
          reader = new FileReader();
    if (newFile) {
      this.setState({ loaded: false });

      reader.onload = e => {
        if (onChange) {
          onChange(newFile, reader.result, this.refs.input);
        }
      };
  
      reader.readAsDataURL(newFile);  
    }
  }

  render() {
    const { title, accept, icon, ...rest } = this.props;
    return (
      <Button {...rest} >
        {title && <label>title</label>}
          
        <Input type="file" accept={accept || '*.*'} onChange={this.handleChange} ref="input" />
      </Button>  
    );
  }
}