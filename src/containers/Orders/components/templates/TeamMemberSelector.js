import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { findIndex, sortBy } from 'lodash';
import deepEqual from 'deep-equal';

import { Input } from 'components/basic/Input';

import { GetManagements } from 'store/actions/managements';
import { refinedManagementsSelector } from 'store/selectors/managements';
import TeamMemberCheck from '../basic/TeamMemberCheck';
import AssignConfirmModal from '../modals/AssignConfirmModal';
import GearIcon from 'resources/gear.png';
import CloseIcon from 'resources/close.png';

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

class TeamMemberSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: "",
      showMenu: false,
      dispatchIds: props.dispatchIds || [],
      managements: [],
      showModal: false,
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
    this.setState({ keyword: evt.target.value, managements: [] }, this.filterTeamMembers);
  }

  onFetchTeamMembers = () => {
    const { managements, page } = this.props;
    if (page === 1) {
      this.setState({ managements })
    } else {
      this.setState({ managements: [...this.state.managements, ...managements] })
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
          this.props.GetManagements({ params: { page: page + 1 }, success: this.onFetchTeamMembers })
        } else {
          this.props.GetManagements({ params: { page: page + 1, 'management[name]': keyword }, success: this.onFetchTeamMembers })
        }
      }
    }
  }

  onChangeSelection = (managementId) => {
    const { dispatchIds } = this.state;
    const idx = findIndex(dispatchIds, id => id === parseInt(managementId));
    if (idx >= 0) {
      const result = [...dispatchIds.slice(0, idx), ...dispatchIds.slice(idx + 1)];
      this.setState({ dispatchIds: result });
    } else {
      this.setState({ dispatchIds: [...dispatchIds, parseInt(managementId)] });
    }
  }

  showMenu = () => {
    this.props.GetManagements({params: {page: 1}, success: this.onFetchTeamMembers});
    this.setState({ showMenu: true });
  }

  clearAssignees = () => {
    this.setState({
      dispatchIds: []
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  filterTeamMembers = () => {
    const { keyword } = this.state;
    if (keyword === '') {
      this.props.GetManagements({ success: this.onFetchTeamMembers })
    } else {
      this.props.GetManagements({ params: { 'management[name]': keyword }, success: this.onFetchTeamMembers })
    }
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
    const originalArray = sortBy(this.props.dispatchIds);
    const targetArray = sortBy(dispatchIds);
    if (!deepEqual(originalArray, targetArray)) {
      this.setState({ showModal: true });
    }
  }

  closeModal = () => {
    this.setState({ dispatchIds: [], showModal: false });
  }

  submitData = () => {
    const { dispatchIds } = this.state;
    this.props.onChange(dispatchIds);
    this.setState({ showModal: false, dispatchIds: [] });
  }

  isChecked = (managementId) => {
    const { dispatchIds } = this.state;
    const idx= findIndex(dispatchIds, id => parseInt(managementId) === id);
    return idx >= 0;
  }

  filterShowingTeamMembers = () => {
    const { managements } = this.state;
    const { dispatchIds } = this.props;
    const result = managements.filter((management) => {
      const { id } = management;
      const idx = dispatchIds.findIndex(dispatchId => dispatchId === parseInt(id));
      return idx === -1;
    })
    return result;
  }

  render() {
    const { showMenu, showModal, keyword, dispatchIds } = this.state;
    const filteredTeamMembers = this.filterShowingTeamMembers();
    const { dispatchIds: originalIds } = this.props;
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
              originalIds.map(( managementId, idx ) => (
                <MenuItemLi key={`management_${managementId}`} >
                  <TeamMemberCheck checked={this.isChecked(managementId)} managementId={managementId} onClick={() => this.onChangeSelection(managementId)} />
                </MenuItemLi>
              ))
            }
            {
              filteredTeamMembers.map((management, idx) => (
                <MenuItemLi key={`management_${management.id}`} >
                  <TeamMemberCheck checked={this.isChecked(management.id)} management={management} onClick={() => this.onChangeSelection(management.id)} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>
        <AssignConfirmModal open={showModal} onClose={this.closeModal} onConfirm={this.submitData} count={dispatchIds.length} type={'management'} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  managements: refinedManagementsSelector(state),
  page: state.management.page,
  total: state.management.total,
  perPag: state.management.perPage
});

const mapDispatchToProps = {
  GetManagements
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberSelector);