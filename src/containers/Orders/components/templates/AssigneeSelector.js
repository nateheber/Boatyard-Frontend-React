import React from 'react';
import styled from 'styled-components';
import { get, find } from 'lodash';

import { Input } from 'components/basic/Input';
import AssigneeCheck from '../basic/AssigneeCheck';
import AssignConfirmModal from '../modals/AssignConfirmModal';
import AddIcon from 'resources/job/add.png';
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

class AssigneeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: "",
      showMenu: false,
      selected: props.value,
      showModal: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  showMenu = () => {
    this.setState({ showMenu: true });
  }

  clearAssignees = () => {
    this.setState({
      value: undefined
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
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
    const { selected } = this.state;
    const { value } = this.props;
    if (selected !== value) {
      this.setState({ showModal: true });
    }
  }

  closeModal = () => {
    this.setState({ selected: this.props.value, showModal: false, keyword: '' });
  }

  submitData = () => {
    const { selected } = this.state;
    this.props.onChange(selected);
    this.setState({ showModal: false, keyword: '' });
  }


  render() {
    const { showMenu, showModal, keyword, selected } = this.state;
    const { options, labelField } = this.props;
    const selectedName = get(find(options, {id: selected}), labelField);
    let filteredOptions = options;
    console.log(selected);
    console.log(this.props.value);
    console.log(options);
    if (keyword && keyword.length > 0) {
      filteredOptions = filteredOptions.filter(op => op[labelField].toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    }
    return (
      <Wrapper ref={this.setWrapperRef}>
        <Button onClick={this.showMenu}>
          <img src={AddIcon} alt="gear_icon" />
        </Button>
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          <FitlerWrapper>
            <Input type="text" value={keyword} onChange={ev => this.setState({keyword: ev.target.value})} />
          </FitlerWrapper>
          <ClearAssigneeWrapper>
            <ClearButton onClick={this.clearAssignees}>Clear</ClearButton>
          </ClearAssigneeWrapper>
          <Scroller>
            {
              filteredOptions.map(option => (
                <MenuItemLi key={`option-${option.id}`} >
                  <AssigneeCheck checked={`${selected}` === `${option.id}`} label={option[labelField]} onClick={() => this.setState({selected: option.id})} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>
        <AssignConfirmModal open={showModal} onClose={this.closeModal} selected={selected} onConfirm={this.submitData} selectedName={selectedName} />
      </Wrapper>
    );
  }
}

export default AssigneeSelector;
