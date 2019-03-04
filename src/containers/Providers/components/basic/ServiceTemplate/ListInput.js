import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

const ListItemText = styled(TextareaAutosize)`
  position: relative;
  width: 223px;
  padding: 10px;
  padding-left: 15px;
  padding-top: 0px;
  height: auto;
  background: transparent;
  font-size: 8.4px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #094359;
  resize: vertical;
  border: none;
  outline: none;
  &:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
  &::before {
    content: '•';
    color: #094359;
    position: absolute;
  }
`;

export default class ListInput extends React.Component {
  constructor(props) {
    super(props);
    const { items } = props;
    this.state = { items };
  }

  render() {
    const { items } = this.state;
    return (
      items.map((item, idx) => (
        <ListItemText key={`list_item_${idx}`}>
          {item}
        </ListItemText>
      ))
    )
  }
}