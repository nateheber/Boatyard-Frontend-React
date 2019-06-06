import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, findIndex, sortBy } from 'lodash';
import deepEqual from 'deep-equal';

import { Input } from 'components/basic/Input';

import { GetProviders } from 'store/actions/providers';

import GearIcon from 'resources/gear.png';
import CloseIcon from 'resources/close.png';
import ProviderCheck from '../basic/ProviderCheck';

import AssignConfirmModal from '../modals/AssignConfirmModal';

const Button = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #A9B5BB;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  cursor: pointer;
`;

const ClearButton = styled.button`
  position: relative;
  height: 30px;
  width: 240px;
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #003247;
  background-color: white;
  outline: none;
  border: 1px solid #A9B5BB;
  border-radius: 5px;
  &::after {
    display: inline-block;
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    right: 5px;
    background-image: url(${CloseIcon})
  }
  cursor: pointer;
`

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
  width: 304px;
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

const ClearAssigneeWrapper = styled.div`
  height: 51px;
  background-color: #F5F5F5;
  border-top: 1px solid #DBDBDB;
  border-bottom: 1px solid #DBDBDB;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

// const getPageCount = (perPage, total) => Math.ceil(total/perPage);

class ProviderSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: '',
      showMenu: false,
      showModal: false,
      providers: [],
      dispatchedProviders: [],
      filteredProviders: []
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.dispatchIds, prevProps.dispatchIds)) {
      this.setState({ dispatchIds: this.props.dispatchIds });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeFilter = (evt) => {
    this.setState({ keyword: evt.target.value }, () => {
      this.filterProviders();
    });
  };

  onFetchProviders = () => {
    const { dispatchIds, providers } = this.props;
    const dispatchedProviders = dispatchIds.map(id => {
      return providers.find(item => `${item.id}` === `${id}`);
    });
    this.setState({
      providers: providers.slice(0),
      dispatchedProviders,
      filteredProviders: providers.slice(0)
    });
  };

  onScroll = (e) => {
  //   const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //   const { page, total, perPage } = this.props;
  //   const { keyword } = this.state;
  //   if (bottom) {
  //     const pageCount = getPageCount(parseInt(perPage), parseInt(total));
  //     if (page + 1 < pageCount) {
  //       if (keyword === '') {
  //         this.props.GetProviders({ params: { page: page + 1 }, success: this.onFetchProviders })
  //       } else {
  //         this.props.GetProviders({ params: { page: page + 1, 'provider[name]': keyword }, success: this.onFetchProviders })
  //       }
  //     }
  //   }
  };

  onChangeSelection = (provider) => {
    const { dispatchedProviders } = this.state;
    const idx = findIndex(dispatchedProviders, item => `${item.id}` === `${provider.id}`);
    let result = [];
    if (idx >= 0) {
      result = [...dispatchedProviders.slice(0, idx), ...dispatchedProviders.slice(idx + 1)];
    } else {
      result = [...dispatchedProviders, provider];
    }
    this.setState({ dispatchedProviders: result });
  };

  showMenu = () => {
    this.props.GetProviders({params: { page: 1, per_page: 1000 }, success: this.onFetchProviders});
    this.setState({ showMenu: true });
  };

  clearAssignees = () => {
    this.setState({ dispatchedProviders: [] });
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  filterProviders = () => {
    const { keyword, providers } = this.state;
    let filteredProviders = providers.slice(0);
    if (keyword && keyword.trim().length > 0) {
      filteredProviders = providers.filter(provider => get(provider, 'name', '').toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1);
    }
    this.setState({ filteredProviders });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.showMenu) {
        this.showModal();
      }
      this.setState({
        showMenu: false
      });
    }
  }

  showModal = () => {
    const { dispatchedProviders } = this.state;
    const { dispatchIds } = this.props;
    const originalArray = sortBy(dispatchIds);
    const targetArray = sortBy(dispatchedProviders.map(provider => provider.id));
    if (!deepEqual(originalArray, targetArray)) {
      this.setState({ showModal: true });
    }
  };

  closeModal = () => {
    this.setState({ dispatchedProviders: [], showModal: false });
  };

  submitData = () => {
    const { dispatchedProviders } = this.state;
    const dispatchIds = dispatchedProviders.map(provider => provider.id);
    this.props.onChange(dispatchIds);
    this.setState({ showModal: false, dispatchedProviders: [] });
  };

  isChecked = (provider) => {
    const { dispatchedProviders } = this.state;
    const idx= findIndex(dispatchedProviders, item => `${provider.id}` === `${item.id}`);
    return idx >= 0;
  };

  filterShowingProviders = () => {
    const { filteredProviders, dispatchedProviders } = this.state;
    const result = filteredProviders.filter((provider) => {
      const idx = dispatchedProviders.findIndex(item => `${item.id}` === `${provider.id}`);
      return idx === -1;
    });
    return result;
  };

  render() {
    const { showMenu, showModal, keyword, dispatchedProviders } = this.state;
    const filteredProviders = this.filterShowingProviders();
    return (
      <Wrapper ref={this.setWrapperRef}>
        <Button onClick={this.showMenu}>
          <img src={GearIcon} alt="gear_icon" />
        </Button>
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          <FitlerWrapper>
            <Input type="text" value={keyword} onChange={this.onChangeFilter} />
          </FitlerWrapper>
          <ClearAssigneeWrapper>
            <ClearButton onClick={this.clearAssignees}>Clear Assignees</ClearButton>
          </ClearAssigneeWrapper>
          <Scroller onScroll={this.onScroll}>
            {
              dispatchedProviders.map(( provider, idx ) => (
                <MenuItemLi key={`provider_${provider.id}`} >
                  <ProviderCheck checked={this.isChecked(provider)} provider={provider} onClick={() => this.onChangeSelection(provider)} />
                </MenuItemLi>
              ))
            }
            {
              filteredProviders.map((provider, idx) => (
                <MenuItemLi key={`provider_${provider.id}`} >
                  <ProviderCheck checked={this.isChecked(provider)} provider={provider} onClick={() => this.onChangeSelection(provider)} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>
        <AssignConfirmModal open={showModal} onClose={this.closeModal} onConfirm={this.submitData} assignees={dispatchedProviders} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ provider: { providers, page, total, perPage } }) => ({
  providers,
  page,
  total,
  perPage
});

const mapDispatchToProps = {
  GetProviders
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSelector);