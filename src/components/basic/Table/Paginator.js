import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { times } from 'lodash';

const Wrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 44px;
  border: 2px solid #A1ACB7;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
`

const Button = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 11px 16px;
  background-color: #FFF;
  color: #898889;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;
  border-right: 2px solid #A1ACB7;
  &:hover {
    background-color: #E49853;
    color: white;
  }
  &.active {
    background-color: #E49853;
    color: white;
    border-right: 2px solid #E49853;
  }
  &.before-active {
    border-right: 2px solid #E49853;
  }
  &.prev {
    padding-left: 32px;
    ::after {
      position: absolute;
      content: '<';
      width: 16px;
      height: 12px;
      left: 10px;
      top: 8px;
    }
  }
  &.next {
    padding-right: 32px;
    ::after {
      position: absolute;
      content: '>';
      width: 16px;
      height: 12px;
      right: 10px;
      top: 8px;
    }
  }
  &:last-child {
    border-right: none;
  }
  &.disabled {
    &:hover {
      background-color: #FFF;
      color: #898889;
      cursor: default;
    }
  }
`;

export default class Paginator extends React.Component {
  onChange = (page) => {
    const { totalPages, onChange } = this.props;
    if (page >= 1 && page <= totalPages) {
      onChange(page)
    }
  }
  renderLeft () {
    const { page } = this.props;
    return (
      <React.Fragment>
        <Button className={classNames('prev', { 'before-active': page === 1 })} onClick={() => this.onChange(page - 1)}>Prev</Button>
        <Button className={classNames({ active: page === 1 })} onClick={() => this.onChange(1)}>1</Button>
        { page > 3 && <Button className="disabled">...</Button> }
      </React.Fragment>
    )
  }
  renderRight () {
    const { page, totalPages } = this.props;
    return (
      <React.Fragment>
        { totalPages > page + 3 && <Button className="disabled">...</Button> }
        <Button className={classNames({ active: page === totalPages })} onClick={() => this.onChange(totalPages)}>{totalPages}</Button>
        <Button className="next" onClick={() => this.onChange(page + 1)}>Next</Button>
      </React.Fragment>
    )
  }
  renderMain () {
    const { page, totalPages } = this.props;
    const startNumber = Math.max(page - 1, 2);
    const endNumber = Math.min(totalPages > page + 3 ? page + 1 : totalPages - 1, totalPages - 1);
    return (
      <React.Fragment>
        {
          times(endNumber - startNumber + 1, (pos) => (
            <Button
              className={classNames({ active: page === startNumber + pos, 'before-active': page - 1 === startNumber + pos })}
              onClick={() => this.onChange(startNumber + pos)}
              key={`button_pos_${pos}`}
            >
              {startNumber + pos}
            </Button>
          ))
        }
      </React.Fragment>
    )
  }
  render() {
    return (
      <Wrapper>
        <ButtonWrapper>
          {this.renderLeft()}
          {this.renderMain()}
          {this.renderRight()}
        </ButtonWrapper>
      </Wrapper>
    )
  }
}
