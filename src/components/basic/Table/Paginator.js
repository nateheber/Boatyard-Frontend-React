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
  padding: 10px;
  background-color: #FFF;
  color: #898889;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    color: #E49853;
    svg {
      fill: #E49853;
    }
  }
  &.active {
    color: #E49853;
    border: 1px solid #E49853;
    border-radius: 3px;
    svg {
      fill: #E49853;
    }
  }
  &.-special {
    padding: 10px 7px;
    &.-shrink {
      svg {
        animation-duration: 0.5s;
        &.shrink {
          display: block;
        }
        &.action {
          display: none;
        }
      }  
      &:hover {
        svg {
          &.shrink {
            display: none;
          }
          &.action {
            display: block;
          }
        }  
      }
    }
  }
  &.disabled {
    &:hover {
      background-color: #FFF;
      color: #898889;
      cursor: default;
      svg {
        fill: #898889;
      }
    }
  }
`;

const SVG = styled.svg`
  fill: gray;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 24px;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  flex-shrink: 0;
`;

export default class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleOfLeftShrink: false,
      visibleOfRightShrink: false,
    };
  }

  onChange = (page) => {
    const { totalPages, onChange } = this.props;
    if (page <= 0) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    onChange(page);
  }
  renderPageNum () {
    const { page, totalPages } = this.props;
    let startNumber = page - 2 <= 0 ? 1 : page - 2;
    let endNumber = page + 2 > totalPages ? totalPages : page + 2 ;
    return (
      <React.Fragment>
        { startNumber === 2 && <React.Fragment>
          {
            <Button
              className={classNames({ active: page === 1 })}
              onClick={() => this.onChange(1)}
              key='button_pos_1'
            >1</Button>
          }
          </React.Fragment>
        }
        { startNumber > 2 && <Button className="-special -shrink" onClick={() => this.onChange(page - 5)}>
          <SVG className="shrink" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </SVG>
          <SVG className="action" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <defs><path id="a" d="M0 0h24v24H0V0z"/></defs>
            <path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z" clip-path="url(#b)"/>
          </SVG>
        </Button>}
        {
          times(endNumber - startNumber + 1, (pos) => (
            <Button
              className={classNames({ active: page === startNumber + pos })}
              onClick={() => this.onChange(startNumber + pos)}
              key={`button_pos_${pos}`}
            >
              {startNumber + pos}
            </Button>
          ))
        }
        { endNumber < totalPages - 2 && <Button className="-special -shrink" onClick={() => this.onChange(page + 5)}>
          <SVG className="shrink" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </SVG>
          <SVG className="action" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <defs><path id="a" d="M24 24H0V0h24v24z"/></defs>
            <path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z" clip-path="url(#b)"/>
          </SVG>
        </Button>}
        { endNumber === totalPages - 2 && <React.Fragment>
          {
            <Button
              className={classNames({ active: page === totalPages })}
              onClick={() => this.onChange(totalPages)}
              key='button_pos_totalPages'
            >1</Button>
          }
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
  render() {
    const { page, totalPages } = this.props;
    return (
      <Wrapper>
        <ButtonWrapper>
          <Button className="-special" onClick={() => this.onChange(1)}>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
              <path fill="none" d="M24 24H0V0h24v24z"></path>
            </SVG>
          </Button>
          <Button className="-special" onClick={() => this.onChange(page - 1)}>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
              <path fill="none" d="M24 24H0V0h24v24z"></path>
            </SVG>
          </Button>
          {this.renderPageNum()}
          <Button className="-special" onClick={() => this.onChange(page + 1)}>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              <path fill="none" d="M0 0h24v24H0V0z"></path>
            </SVG>
          </Button>
          <Button className="-special" onClick={() => this.onChange(totalPages)}>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
              <path fill="none" d="M0 0h24v24H0V0z"></path>
            </SVG>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}
