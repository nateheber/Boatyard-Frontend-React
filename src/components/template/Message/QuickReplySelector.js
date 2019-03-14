import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { get } from 'lodash';

import QuickReply from 'resources/quick-reply.svg';

const IconButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  position: relative;
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

const SelectorWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 101%;
  left: 0px;
  width: 230px;
  max-height: 100px;
  color: #787f82;
  background: white;
  border: 1px solid #e6e6e6;
  overflow-y: scroll;
  &.show {
    display: block;
  }
`;

const Item = styled.div`
  padding: 5px 15px;
  cusor: pointer;
  font-size: 14px;
  font-family: "Source Sans",sans-serif !important;
  text-align: left;
`;

export default class QuickReplySelector extends React.Component {
  state = {
    text: '',
    image: '',
    showMenu: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onSelect = reply => () => {
    const body = get(reply, 'attributes.body');
    this.props.onSelect(body);
    this.setState({ showMenu: false });
  }

  showSelector = () => {
    this.setState({ showMenu: true });
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  }

  render() {
    const { showMenu } = this.state;
    const { quickReplies, onAddNewReply } = this.props;
    return (
      <IconButton ref={this.setWrapperRef}>
        <ButtonIcon src={QuickReply} onClick={this.showSelector} />
        <SelectorWrapper className={classNames({ show: showMenu })}>
          {quickReplies.map((reply) => (
            <Item onClick={this.onSelect(reply)} key={`reply_${get(reply, 'id')}`}>{get(reply, 'attributes.name')}</Item>
          ))}
          <Item onClick={onAddNewReply}> Add New Reply </Item>
        </SelectorWrapper>
      </IconButton>
    );
  }
}
