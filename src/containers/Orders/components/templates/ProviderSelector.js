import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { findIndex, get } from 'lodash';

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
  background-color: white;
`;

const FitlerWrapper = styled.div`
  padding: 25px 30px;
`

const Scroller = styled.div`
  height: 308px;
  padding: 25px 30px;
  overflow-y: scroll;
`

const DropdownMenu = styled.div`
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
  width: 439px;
  padding: 0;
  right: 0;
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
`;

class ProviderSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: "",
      showMenu: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.GetProviders({page: 1});
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeFilter = (evt) => {
    this.setState({ keyword: evt.target.value, providers: [] }, this.filterProviders);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  filterProviders = () => {
    const { keyword } = this.state;
    this.props.GetProviders({params: { 'provider[name]': keyword }})
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      });
    }
  }

  isChecked = (providerId) => {
    const dispatchIds = get(this.props, 'dispatchIds', []);
    const idx= findIndex(dispatchIds, id => providerId === id);
    return idx >= 0;
  }

  onScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const { page, total } = this.props;
    const { keyword } = this.state;
    if (bottom) {
      if (page + 1 < parseInt(total)) {
        if (keyword === '') {
          this.props.GetProviders({ params: { page: page + 1 } })
        } else {
          this.props.GetProviders({ params: { page: page + 1, 'provider[name]': keyword } })
        }
      }
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
          <FitlerWrapper>
            <Input type="text" value={keyword} onChange={this.onChangeFilter} />
          </FitlerWrapper>
          <Scroller onScroll={this.onScroll}>
            {
              providers.map((provider, idx) => (
                <MenuItemLi key={`provider_${idx}`} >
                  <ProviderCheck checked={this.isChecked(provider.id)} provider={provider} />
                </MenuItemLi>
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