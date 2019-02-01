import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { times } from 'lodash';

const Wrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 44px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
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
  &:hover {
    color: #E49853;
  }
  &.active {
    color: #E49853;
  }
  &.prev {
    padding-left: 22px;
    ::after {
      position: absolute;
      content: '<';
      width: 16px;
      height: 12px;
      left: 10px;
      top: 10px;
    }
  }
  &.next {
    padding-right: 22px;
    ::after {
      position: absolute;
      content: '>';
      width: 16px;
      height: 12px;
      right: 0px;
      top: 10px;
    }
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
  renderPageNum () {
    const { page, totalPages } = this.props;
    let startNumber = 1;
    let endNumber = totalPages;
    if (totalPages < 6) {
      startNumber = 1;
      endNumber = totalPages;
    } else if(page < 3) {
      startNumber = 1;
      if(page > totalPages - 2) {
        endNumber = totalPages
      } else {
        endNumber = startNumber + 3;
      }
    } else {
      startNumber = page - 2;
      endNumber = page + 1;
    }
    return (
      <React.Fragment>
        <Button className="prev" onClick={() => this.onChange(page - 1)}>Prev</Button>
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
        <Button className="next" onClick={() => this.onChange(page + 1)}>Next</Button>
      </React.Fragment>
    )
  }
  render() {
    return (
      <Wrapper>
        <ButtonWrapper>
          {this.renderPageNum()}
        </ButtonWrapper>
      </Wrapper>
    )
  }
}
