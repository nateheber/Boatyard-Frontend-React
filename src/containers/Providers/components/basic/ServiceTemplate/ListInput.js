import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: 223px;
  padding-left: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  height: auto;
  &::before {
    content: '•';
    color: #094359;
    font-size: 7px;
    position: absolute;
    top: 5px;
    left: 11px;
  }
`;

const ListItemText = styled(TextareaAutosize)`
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
`;

export default class ListInput extends React.Component {
  constructor(props) {
    super(props);
    const { items } = props;
    this.state = { items };
  }

  list = [];

  onChange = idx => (e) => {
    const newItems = [...this.state.items];
    newItems[idx] = e.target.value;
    this.setState({ items: newItems });
  }
  
  onKeyPress = idx => (e) => {
    console.log(e.keyCode);
  }

  setRef = idx => (ref) => {
    this.list[idx] = ref;
  }

  render() {
    const { items } = this.state;
    return (
      <Wrapper>
        {
          items.map((item, idx) => (
            <ItemWrapper key={`list_item_${idx}`}>
              <ListItemText
                ref={this.setRef(idx)}
                value={item}
                onChange={this.onChange(idx)}
                onKeyDown={this.onKeyPress(idx)}
              />
            </ItemWrapper>
          ))
        }
      </Wrapper>
    )
  }
}