import React from 'react';
import styled from 'styled-components';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import AttachImg from 'resources/attach.svg';

library.add(faTimes)

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
`

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
`

const CloseButton = styled.button`
  display: inline-block;
  background: transparent;
  height: 14px;
  outline: none;
  cursor: pointer;
  margin-left: 15px;
  border: none;
`

export default class ActionFooter extends React.Component {
  state = {
    file: null
  };

  setFileRef = (ref) => {
    this.fileComponent = ref;
  }

  getFileName = () => {

    return this.state.file.name
  }

  onSend = () => {
    const { file } = this.state;
    this.props.onSend(file);
  }

  uploadFile = () => {
    this.fileComponent.click();
  }

  fileChanged = (evt) => {
    this.setState({
      file: evt.target.files[0]
    });
  }

  resetFile = () => {
    this.setState({
      file: null
    });
  }

  render() {
    const { onCancel } =  this.props;
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
          <OrangeButton onClick={this.onSend} key="modal_btn_save">Send Quote</OrangeButton>
        </ActionButtons>
      </Wrapper>
    )
  }
}