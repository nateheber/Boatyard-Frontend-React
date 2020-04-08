import React from 'react';
import styled from 'styled-components';
import { find, startCase } from 'lodash';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AttachImg from 'resources/attach.svg';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
`;

const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
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
    files: []
  };

  setFileRef = (ref) => {
    this.fileComponent = ref;
  };

  onSendCallback = () => {
    const { files } = this.state;
    if (files.length === this.attachments.length) {
      this.props.onSend(this.attachments);
    }
  }
  
  onSend = () => {
    const { onSend } = this.props;
    const { files } = this.state;
    this.attachments = [];
    if (files.length > 0) {
      for(let i=0; i<files.length; i++) {
        const reader = new FileReader();
        reader.onload = e => {
          this.attachments.push({filename: files[i].name, attachment: reader.result});
          this.onSendCallback();
        };  
        reader.readAsDataURL(files[i]);  
      }
    } else {
      onSend();
    }
  };

  uploadFile = () => {
    this.fileComponent.click();
  };

  fileChanged = (evt) => {
    const files = [];
    for (let i =0; i < evt.target.files.length; i++) {
      const file = evt.target.files[i];
      if (!find(this.state.files, {name: file.name})) {
        files.push(file);
      }  
    }
    this.setState({
      files: [...this.state.files, ...files]
    });
  };

  resetFile = () => {
    this.setState({
      files: []
    });
  };

  removeFile = (idx) => {
    let files =  this.state.files;
    files.splice(idx, 1);
    this.setState({files});
  }

  render() {
    const { onCancel, type } =  this.props;
    const { files } = this.state;
    return (
      <Wrapper>
        <LeftWrapper>
          <AttachButton onClick={this.uploadFile} />
          <div>
          {files.map((file, idx) => 
            <div key={`file-${idx}`}>
              <React.Fragment >
                <CloseButton onClick={ev => this.removeFile(idx)}>
                  <FontAwesomeIcon icon="times" size="lg" />
                </CloseButton>
                <FileName>{file.name}</FileName>
              </React.Fragment>
            </div>
          )}
          </div>
          <HiddenFileInput ref={this.setFileRef} type="file" onChange={this.fileChanged} key={files.length > 0 ? 'full' : 'empty'} multiple/>
        </LeftWrapper>
        <ActionButtons>
          <HollowButton onClick={onCancel} key="modal_btn_cancel" style={{ width: 130 }}>Cancel</HollowButton>
          <OrangeButton onClick={this.onSend} key="modal_btn_save">{`Send ${startCase(type)}`}</OrangeButton>
        </ActionButtons>
      </Wrapper>
    )
  }
}