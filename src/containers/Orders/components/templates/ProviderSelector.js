import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { findIndex } from 'lodash';

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
  font-family: Montserrat;
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
      showModal: false,
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

  clearAssignees = () => {
    this.setState({
      dispatchIds: []
    });
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
        this.showModal();
      }
      this.setState({
        showMenu: false
      });
    }
  }

  showModal = () => {
    const { dispatchIds } = this.state;
    if (dispatchIds.length > 0) {
      this.setState({ showModal: true });
    }
  }

  closeModal = () => {
    this.setState({ dispatchIds: [], showModal: false });
  }

  submitData = () => {
    const { dispatchIds } = this.state;
    this.props.onChange(dispatchIds);
    this.setState({ showModal: false });
  }

  isChecked = (providerId) => {
    const { dispatchIds } = this.state;
    const idx= findIndex(dispatchIds, id => providerId === id);
    return idx >= 0;
  }

  render() {
    const { showMenu, showModal, keyword, providers, dispatchIds } = this.state;
    return (
      <Wrapper ref={this.setWrapperRef}>
        <Button onClick={() => { this.setState({ showMenu: true }); }}>
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
              providers.map((provider, idx) => (
                <MenuItemLi key={`provider_${idx}`} >
                  <ProviderCheck checked={this.isChecked(provider.id)} provider={provider} onClick={() => this.onChangeSelection(provider.id)} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>
        <AssignConfirmModal open={showModal} onClose={this.closeModal} onConfirm={this.submitData} count={dispatchIds.length} />
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