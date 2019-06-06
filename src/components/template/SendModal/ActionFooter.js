import React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AttachImg from 'resources/attach.svg';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
`;

const LeftWrapper = styled.div`
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AttachButton = styled.button`
  display: inline-block;
  width: 20px;
  height: 20px;
  outline: none;
  cursor: pointer;
  margin-left: 15px;
  background-color: transparent;
  background-image: url(${AttachImg});
  background-position: center center;
  background-size: 20px 20px;
  border: none;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #333;
  font-family: "Source Sans", sans-serif;
`;

const CloseButton = styled.button`
  display: inline-block;
  background: transparent;
  height: 14px;
  outline: none;
  cursor: pointer;
  margin-left: 15px;
  border: none;
`;

export default class ActionFooter extends React.Component {
  state = {
    file: null
  };

  setFileRef = (ref) => {
    this.fileComponent = ref;
  };

  getFileName = () => {
    return this.state.file.name
  };

  onSend = () => {
    const { onSend } = this.props;
    const { file } = this.state;
    const reader = new FileReader();
    if (file) {
      reader.onload = e => {
        if (onSend) {
          onSend(file, reader.result);
        }
      };  
      reader.readAsDataURL(file);  
    } else {
      onSend();
    }
  };

  uploadFile = () => {
    this.fileComponent.click();
  };

  fileChanged = (evt) => {
    this.setState({
      file: evt.target.files[0]
    });
  };

  resetFile = () => {
    this.setState({
      file: null
    });
  };

  render() {
    const { onCancel, type } =  this.props;
    const { file } = this.state;
    return (
      <Wrapper>
        <LeftWrapper>
          {
            !file ? (
              <AttachButton onClick={this.uploadFile} />
            ) : (
              <React.Fragment>
                <CloseButton onClick={this.resetFile}>
                  <FontAwesomeIcon icon="times" size="lg" />
                </CloseButton>
                <FileName>{file.name}</FileName>
              </React.Fragment>
            )
          }
          <HiddenFileInput ref={this.setFileRef} type="file" onChange={this.fileChanged} key={file? 'full' : 'empty'} />
        </LeftWrapper>
        <ActionButtons>
          <HollowButton onClick={onCancel} key="modal_btn_cancel">Cancel</HollowButton>
          <OrangeButton onClick={this.onSend} key="modal_btn_save">{`Send ${startCase(type)}`}</OrangeButton>
        </ActionButtons>
      </Wrapper>
    )
  }
}