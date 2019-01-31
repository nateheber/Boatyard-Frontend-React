import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { findIndex } from 'lodash';

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

const getPageCount = (perPage, total) => Math.ceil(total/perPage)

class ProviderSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: "",
      showMenu: false,
      dispatchIds: props.dispatchIds || [],
      providers: [],
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.GetProviders({params: {page: 1}, success: this.onFetchProviders});
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeFilter = (evt) => {
    this.setState({ keyword: evt.target.value, providers: [] }, this.filterProviders);
  }

  onFetchProviders = (providers, page) => {
    if (page === 1) {
      this.setState({ providers })
    } else {
      this.setState({ providers: [...this.state.providers, ...providers] })
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  filterProviders = () => {
    const { keyword } = this.state;
    this.props.GetProviders({params: { 'provider[name]': keyword }, success: this.onFetchProviders})
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.showMenu) {
        this.submitData();
      }
      this.setState({
        showMenu: false
      });
    }
  }

  submitData = () => {
    const { dispatchIds } = this.state;
    this.props.onChange(dispatchIds);
  }

  isChecked = (providerId) => {
    const { dispatchIds } = this.state;
    const idx= findIndex(dispatchIds, id => providerId === id);
    return idx >= 0;
  }

  onScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const { page, total, perPage } = this.props;
    const { keyword } = this.state;
    if (bottom) {
      const pageCount = getPageCount(parseInt(perPage), parseInt(total));
      if (page + 1 < pageCount) {
        if (keyword === '') {
          this.props.GetProviders({ params: { page: page + 1 }, success: this.onFetchProviders })
        } else {
          this.props.GetProviders({ params: { page: page + 1, 'provider[name]': keyword }, success: this.onFetchProviders })
        }
      }
    }
  }

  onChangeSelection = (providerId) => {
    const { dispatchIds } = this.state;
    const idx = findIndex(dispatchIds, id => id === providerId);
    if (idx >= 0) {
      const result = [...dispatchIds.slice(0, idx), ...dispatchIds.slice(idx + 1)];
      this.setState({ dispatchIds: result });
    } else {
      this.setState({ dispatchIds: [...dispatchIds, providerId] });
    }
  }

  render() {
    const { showMenu, keyword, providers } = this.state;
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
                  <ProviderCheck checked={this.isChecked(provider.id)} provider={provider} onClick={() => this.onChangeSelection(provider.id)} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ provider: { providers, page, total, perPage} }) => ({
  providers,
  page,
  total,
  perPage
});

const mapDispatchToProps = {
  GetProviders
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSelector);