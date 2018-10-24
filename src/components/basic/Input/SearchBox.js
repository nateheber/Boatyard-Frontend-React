import React from 'react';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import { isEmpty } from 'lodash';

import './style.css';

const Wrapper = styled.div`
  flex-grow: 1;
  justify-content: center;
`;

const InputWrapper = styled.div`
  position: relative;
  max-width: 280px;
  height: 35px;
  border-radius: 6px !important;
  background-color: #ffaa5c;
  display: flex;
  flex-direction: row;
  align-items: center;
  &.secondary {
    border: 1px solid rgb(223, 223, 223);
    background-color: transparent;
  }
`;

const Input = styled.input`
  display: flex;
  flex-grow: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  border: none;
  height: 35px;
  color: white;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 0px;
  background-color: transparent;
  &::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
  }
  &.secondary {
    color: rgb(51, 51, 51);
  }
`;

const SearchButton = styled.button`
  display: flex;
  background-color: transparent;
  color: white;
  border: none;
  &:focus {
    outline: none;
  }
`;

export class SearchBox extends React.Component {
  state = {
    focused: false,
    value: ''
  };
  onChangeInput = evt => {
    this.setState({
      value: evt.target.value
    });
    this.props.onChange(evt.target.value);
  };
  onClick = () => {
    const { value } = this.state;
    if (!isEmpty(value)) {
      this.setState({
        value: ''
      });
      this.props.onChange('');
    }
  };
  render() {
    const { value } = this.state;
    const { secondary } = this.props;
    return (
      <Wrapper>
        <InputWrapper className={secondary ? 'secondary' : 'primary'}>
          <Input
            className={secondary ? 'secondary' : 'primary'}
            {...this.props}
            value={value}
            onChange={this.onChangeInput}
            onFocus={() => {
              this.setState({ focused: true });
            }}
            onBlur={() => {
              this.setState({ focused: false });
            }}
          />
          <SearchButton
            className={secondary ? 'secondary' : 'primary'}
            onClick={this.onClick}
          >
            {!isEmpty(value) ? (
              <EvilIcon
                name="ei-close-o"
                size="s"
                className="searchIcon secondary"
              />
            ) : (
              <EvilIcon
                name="ei-search"
                size="s"
                className="searchIcon secondary"
              />
            )}
          </SearchButton>
        </InputWrapper>
      </Wrapper>
    );
  }
}
