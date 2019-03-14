import React from 'react';
import { connect } from 'react-redux';
import { set } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { Input, TextArea, InputLabel, InputWrapper, InputRow } from 'components/basic/Input';
import Modal from 'components/compound/Modal';

import { CreateQuickReply } from 'store/actions/quickReplies';

class QuickReplyModal extends React.Component {
  state = { name: '', body: '' };

  componentDidUpdate(prevProps) {
    if(!prevProps.open && this.props.open) {
      this.setState({ name: '', body: '' });
    }
  }

  onChangeField = field => (e) => {
    const updateObj = {};
    set(updateObj, field, e.target.value);
    this.setState(updateObj);
  }

  onSave = () => {
    const { name, body } = this.state;
    const { CreateQuickReply, onClose } = this.props;
    CreateQuickReply({data: { name, body }, success: onClose, failure: this.onFail});
  }

  onFail = () => {
    toastr.error('Error', 'Error while creating new Quick Reply');
  }

  render() {
    const { open, onClose } = this.props;
    const { name, body } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_delete">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title="Add New Quick Reply"
        actions={actions}
        open={open}
        onClose={onClose}
        extraLarge
      >
        <InputRow>
          <InputWrapper className="third">
            <InputLabel style={{ marginTop: '10px' }}>Enter Quick Reply Name</InputLabel>
            <Input value={name} onChange={this.onChangeField('name')} />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="third">
            <InputLabel>Enter Quick Reply Text</InputLabel>
            <TextArea value={body} onChange={this.onChangeField('body')} />
          </InputWrapper>
        </InputRow>
      </Modal>
    );
  }
}

const mapDispatchToProps = { CreateQuickReply };

export default connect(null, mapDispatchToProps)(QuickReplyModal);
