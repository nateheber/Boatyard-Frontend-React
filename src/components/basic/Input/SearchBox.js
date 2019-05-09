import React from 'react';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import { isEmpty } from 'lodash';
import className from 'classnames';

const InputWrapper = styled.div`
  flex: 1;
  display: inline-block;
  position: relative;
  height: 30px;
  border-radius: 6px !important;
  border: 1px solid rgb(223, 223, 223);
  background-color: transparent;
  align-items: center;
  background-color: white;
  &.secondary {
    background-color: #265B70;
    border: none;
  }
`;

const Input = styled.input`
  display: flex;
  flex-grow: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  border: none;
  height: 30px;
  width: calc(100% - 40px) !important;
  font-weight: 600;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 30px;
  background-color: transparent;
  color: rgb(51, 51, 51);
  &:focus {
    outline: none;
  }
  &.secondary {
    color: white;
    &::placeholder {
      color: white;
    }
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 4px;
  right: 0px;
  background-color: transparent;
  color: white;
  border: none;
  &:focus {
    outline: none;
  }
  .search-icon {
    color: #A9B5BB;
    width: 20px;
    height: 20px;
    &.secondary {
      color: white;
    }
  }
`;

export class SearchBox extends React.Component {
  state = {
    focused: false,
    value: ''
  };
  onChangeInput = evt => {
    const { onChange } = this.props;
    this.setState({
      value: evt.target.value
    });
    if (onChange) {
      onChange(evt.target.value);
    }
  };
  onClick = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    if (!isEmpty(value)) {
      this.setState({
        value: ''
      });
      if (onChange) {
        onChange('');
      }
    }
  };
  render() {
    const { value } = this.state;
    const { secondary, style } = this.props;
    return (
      <InputWrapper className={secondary ? 'secondary' : 'primary'} style={style}>
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
              className={className('search-icon', { secondary: secondary })}
            />
          ) : (
            <EvilIcon
              name="ei-search"
              size="s"
              className={className('search-icon', { secondary: secondary })}
            />
          )}
        </SearchButton>
      </InputWrapper>
    );
  }
}
