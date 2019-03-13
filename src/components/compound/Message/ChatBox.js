import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';

import { GetQuickReplies } from 'store/actions/quickReplies';

import QuickReply from 'resources/quick-reply.svg';
import Attach from 'resources/attach.svg';

const Wrapper = styled.div`
  border-top: 1px solid #e6e6e6;
  &.noBorder {
    border: none;
  }
`;

const InputGroup = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 6px !important;
  overflow: hidden;
  margin: 30px 30px 0 30px;
  .secondary & {
    border: none;
    background-color: transparent;
  }
  .noBorder * {
    border: none;
  }
  background-color: white;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 15px;
  resize: none;
  width: 100%;
  min-height: 60px;
  border: none;
  overflow: auto;
  outline: none;
  box-shadow: none;
  min-height: 100px;
  font-size: 14px;
  font-family: "Source Sans",sans-serif;
  font-weight: 400;
  color: #333333;
`;

const InputView = styled.div`
  padding: 0px 15px;
  .secondary &{
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  }
  .third & {
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  }
`

const ImageArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ImageContainer = styled.div`
  max-width: 160px;
  padding: 15px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 14px;
`;

const ChatBoxFooter = styled.div`
  border-top: 1px solid #e6e6e6;
  .secondary & {
    border: none;
  }
  .third & {
    border: none;
  }
  padding: 12px 15px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  &.right {
    margin-left: 20px;
  }
`;

const ButtonIcon = styled.div`
  width: 22px;
  height: 22px;
  mask: url(${props => props.src});
  mask-repeat: no-repeat;
  mask-size: 22px 22px;
  background-color: rgb(19, 48, 68);
  .secondary & {
    background-color: white;
  }
`;

class ChatBox extends React.Component {
  state = {
    text: '',
    image: '',
  };

  componentDidMount() {
    this.props.GetQuickReplies({ params: {} });
  }

  handleChange = event => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        image: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0]);
  };

  onChangeText = evt => {
    this.setState({
      text: evt.target.value
    });
  };

  removeImage = () => {
    this.setState({ image: '' });
  };

  showInput = () => {
    this.fileInput.click();
  };

  onSend = () => {
    const { onSend } = this.props;
    const { text, image } = this.state;
    onSend({text, image});
    this.setState({ text: '', image: '' });
  }

  render() {
    const { secondary, third, noBorder } = this.props;
    const { text, image } = this.state;
    return (
      <Wrapper className={classNames({ secondary, third, noBorder })}>
        <InputGroup>
          <InputView>
            <TextArea value={text} onChange={this.onChangeText} placeholder="Write reply..." />
            {!isEmpty(image) && (
              <ImageArea>
                  <ImageContainer>
                    <Image src={image} />
                    <CloseButton
                      onClick={this.removeImage}
                    >
                      <EvilIcon name="ei-close-o" size="s" />
                    </CloseButton>
                  </ImageContainer>
              </ImageArea>
            )}
          </InputView>
          <ChatBoxFooter>
            <IconWrapper>
              <IconButton>
                <ButtonIcon src={QuickReply} />
              </IconButton>
              <IconButton className="right" onClick={this.showInput}>
                <ButtonIcon src={Attach} />
              </IconButton>
            </IconWrapper>
            <OrangeButton onClick={this.onSend}>Send</OrangeButton>
          </ChatBoxFooter>
          <input
            ref={ref => {
              this.fileInput = ref;
            }}
            type="file"
            style={{ display: 'none' }}
            onChange={this.handleChange}
            key={isEmpty(image)}
          />
        </InputGroup>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ quickReply: { quickReplies } }) => ({ quickReplies });
const mapDispatchToProps = {
  GetQuickReplies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
