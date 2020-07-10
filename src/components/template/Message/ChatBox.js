import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { thumbnailify, getFormData, base64toBlob } from 'utils/thumbnail';
import { apiBaseUrl } from 'api/config';
import { OrangeButton } from 'components/basic/Buttons';
import { GetQuickReplies } from 'store/actions/quickReplies';
import Attach from 'resources/attach.svg';
import { getToken } from 'store/selectors/auth';
import QuickReplySelector from './QuickReplySelector';
import QuickReplyModal from './QuickReplyModal';

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
    showQRModal: false,
  };

  componentDidMount() {
    this.props.GetQuickReplies({ params: {} });
  }

  onChangeText = evt => {
    this.setState({
      text: evt.target.value
    });
  }; 

  checkFirstName = (text, name) => {
    const updatedText = text.replace(
      '[[first_name]]',
      name,
    );
    return updatedText;
  }

  onSend = () => {
    const { onSend, token, recipientInfo } = this.props;
    const { text, origin, thumb, name } = this.state;
    let updatedText = this.checkFirstName(text, recipientInfo);
    if (origin && thumb && name) {
      const attachmentApi = axios.create({
        baseURL: apiBaseUrl,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': token
        }
      });

      const promises = [];
      promises.push(
        attachmentApi.post(
          '/file_attachments',
          {
            "file_attachment": {
              "file_attachment_name": `thumb-${name}`
            },
            "type": "file_attachments"
          }
        )
      );
      promises.push(
        attachmentApi.post(
          '/file_attachments',
          {
            "file_attachment": {
              "file_attachment_name": `origin-${name}`
            },
            "type": "file_attachments"
          }
        )
      );

      Promise.all(promises).then(results => {
        const attachments = results.map(({data: {data}}) => data);
        const ids = attachments.map(a => a.id);
        const payload = {content: text, file_attachment_ids: ids.join(', ')};
        let thumbUrl = attachments[0].attributes.presigned_url;
        let originUrl = attachments[1].attributes.presigned_url;
        let formData = getFormData(thumbUrl.url_fields);
        formData.append('file', thumb);
        axios.post(thumbUrl.url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).finally(() => onSend(payload));

        formData = getFormData(originUrl.url_fields);
        formData.append('file', origin);
        axios.post(originUrl.url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // onSend(payload);
      })
    } else {
      onSend({content: updatedText});
    }
    this.setState({ text: '', origin: null, thumb: null, name: null, thumb64: null });
  }

  onAddNewReply = () => {
    this.setState({ showQRModal: true });
  }

  hideQRModal = () => {
    this.setState({ showQRModal: false });
  }

  applyQuickReply = (body) => {
    this.setState({ text: body });
  }

  removeImage = () => {
    this.setState({ thumb: null, origin: null, name: null, thumb64: null });
  };

  showInput = () => {
    this.fileInput.click();
  };

  handleChange = event => {
    const reader = new FileReader();
    reader.onloadend = () => {
      thumbnailify(reader.result, 200, (base64) => {
        const data = base64.split(',');
        const thumb = base64toBlob(data[1], data[0]);
        this.setState({thumb64: base64, thumb});
      });
    };
    this.setState({name: event.target.files[0].name, origin: event.target.files[0]})
    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    const { secondary, third, noBorder, quickReplies } = this.props;
    const { text, thumb64, showQRModal } = this.state;
    return (
      <Wrapper className={classNames({ secondary, third, noBorder })}>
        <InputGroup>
          <InputView>
            <TextArea value={text} onChange={this.onChangeText} placeholder="Write ss reply..." />
            {!isEmpty(thumb64) && (
              <ImageArea>
                  <ImageContainer>
                    <Image src={thumb64} />
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
              <QuickReplySelector quickReplies={quickReplies} onSelect={this.applyQuickReply} onAddNewReply={this.onAddNewReply} />
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
            accept="image/*"
            style={{ display: 'none' }}
            onChange={this.handleChange}
            key={isEmpty(thumb64)}
          />
        </InputGroup>
        <QuickReplyModal
          open={showQRModal}
          onClose={this.hideQRModal}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  quickReplies: state.quickReply.quickReplies,
  token: getToken(state),
});

const mapDispatchToProps = {
  GetQuickReplies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
