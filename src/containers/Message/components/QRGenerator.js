import React from 'react';
import styled from 'styled-components';
import { set, get } from 'lodash';

import { Input, TextArea } from 'components/basic/Input';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

export class QRGenerator extends React.Component {
  constructor(props) {
    super(props);
    const { showItem } = props;
    const name = get(showItem, 'attributes.name', '');
    const body = get(showItem, 'attributes.body', '');
    this.state = { name, body };
  }

  componentDidUpdate(prevProps) {
    const { showItem } = this.props;
    if (get(showItem, 'id') !== get(prevProps, 'showItem.id')) {
      const name = get(showItem, 'attributes.name', '');
      const body = get(showItem, 'attributes.body', '');
      this.setState({ name, body });
    }
  }

  onChange = field => (e) => {
    const updateObj = {};
    set(updateObj, field, e.target.value);
    this.setState(updateObj);
  }

  onSave = () => {
    const { name, body } = this.state;
    this.props.onSave({name, body})
  }

  render() {
    const { onCancel } = this.props;
    const { name, body } = this.state;
    return (
      <Wrapper>
        <Input value={name} type="text" placeholder="Quick Reply Name" onChange={this.onChange('name')} />
        <TextArea value={body} onChange={this.onChange('body')} />
        <ActionWrapper>
          <HollowButton onClick={onCancel}>CANCEL</HollowButton>
          <OrangeButton onClick={this.onSave}>SAVE</OrangeButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
