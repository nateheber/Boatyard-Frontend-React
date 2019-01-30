import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Input } from 'components/basic/Input';

import ProviderCheck from '../basic/ProviderCheck';

import { GetProviders } from 'store/actions/providers';

const Button = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #A9B5BB;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Scroller = styled.div`
  height: 308px;
  overflow-y: scroll;
`

const DropdownMenu = styled.ul`
  &.show {
    display: block;
  }
  z-index: 100;
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  width: 200px;
  padding: 0;
  right: 0;
  height: 30px;
  &::before {
    height: 100%;
    display: block;
    width: 5px;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    right: -5px;
    position: absolute;
  }
  &::after {
    height: 5px;
    display: block;
    width: 100.5%;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    left: -1px;
    position: absolute;
  }
  margin-top: 8px;
`;

const MenuItemLi = styled.div`
  padding: 8px 0;
  &:hover {
    background-color: #f6f6f7;
  }
`;

const MenuItem = styled.button`
  border: none;
  width: 100%;
  padding: 0 15px;
  text-align: left;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  background: transparent;
  outline: none;
`;

class ProviderSelector extends React.Component {
  constructor() {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: "",
      showMenu: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.GetProviders({});
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      });
    }
  }

  render() {
    const { showMenu, keyword } = this.state;
    const { providers } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef}>
        <Button
          onClick={() => {
            this.setState({ showMenu: true });
          }}
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          <Input type="text" value={keyword} />
          <Scroller>
            {
              providers.map((provider, idx) => (
                <ProviderCheck provider={provider} key={`provider_${idx}`} />
              ))
            }
          </Scroller>
        </DropdownMenu>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ provider: { providers, page, total} }) => ({
  providers,
  page,
  total,
});

const mapDispatchToProps = {
  GetProviders
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSelector);