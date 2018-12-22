import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import classNames from 'classnames';

import { HollowButton } from '../Buttons';

const Input = styled.input`
  display: none;
`;

const Button = styled(HollowButton)`
  width: 100% !important;
  &:disabled {
    color: #c9d2d6;
    cursor: default;
    background-color: #f2f2f1;
    .active: {
      color: #ffffff;
    }
  }
`;

const Wrapper = styled(Row)`
  width: 100%;
  margin-top: 16px;
`;

export class ImageUploader extends React.Component {
  state = {
    active: false
  };

  onDragEnter = () => {
    this.setState({
      active: true
    });
  };

  onDragLeave = () => {
    this.setState({
      active: false
    });
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = e => {
    e.preventDefault();
    this.setState({ active: false });
    this.onFileChange(e, e.dataTransfer.files[0]);
  };
  onFileChange = (e, file) => {
    const newFile = file || e.target.files[0],
      pattern = /image-*/,
      reader = new FileReader();

    if (!newFile.type.match(pattern)) {
      alert('Formato inválido');
      return;
    }

    this.setState({ loaded: false });

    reader.onload = e => {
      this.props.onChange(reader.result);
    };

    reader.readAsDataURL(newFile);
  };
  handleClick = () => {
    this.refs.input.click();
  };
  render() {
    const { title } = this.props;
    const { active } = this.state;
    return (
      <Wrapper
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <Col xs={12} md={6}>
          <Button onClick={this.handleClick}>{title}</Button>
        </Col>
        <Col md={6}>
          <Button disabled className={classNames({ active })}>
            OR DRAG PNG HERE
          </Button>
        </Col>
        <Input type="file" onChange={this.onFileChange} ref="input" />
      </Wrapper>
    );
  }
}
