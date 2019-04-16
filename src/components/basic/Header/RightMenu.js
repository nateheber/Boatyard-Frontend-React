import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Bell from '../../../resources/notification-bell.svg';
import Message from '../../../resources/messages-icon.png';
import ChevronIcon from '../../../resources/down-chevron.svg';

import { logout } from '../../../store/reducers/auth';

const Wrapper = styled.div`
  display: inline-block;
  flex-direction: row;
  justify-content: flex-end;
`;

const MenuWrapper = styled.ul`
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  border-radius: 0 !important;
  list-style: none;
  margin: 0;
  display: block;
`;

const DropdownItem = styled.li`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 68px;
  padding: 20px 10px !important;
  text-align: center;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e17614;
    cursor: pointer;
  }
  float: left;
`;

const DropdownMenu = styled.ul`
  ${DropdownItem}:hover & {
    display: block;
  }
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  top: 68px;
  width: 200px;
  right: 0;
  min-height: 70px;
  padding: 0;
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
`;

const MenuItemLi = styled.div`
  padding: 8px 0;
  cursor: pointer;
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
  cursor: pointer;
`;

const IconItem = styled.li`
  float: left;
  position: relative;
  display: flex;
  width: 68px;
  height: 68px;
  box-sizing: border-box;
  padding: 20px 10px !important;
  text-align: center;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e17614;
    cursor: pointer;
  }
  @media (max-width: 843px) {
    &.hide-on-mobile {
      display: none !important;
    }
  }
`;

const Icon = styled.img``;

const UsernameWrapper = styled.a`
  color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Username = styled.div`
  display: inline-block;
  margin-right: 5px;
  @media (max-width: 843px) {
    display: none !important;
  }
`;

const Chevron = styled.div`
  display: inline-block;
  width: 15px;
  height: 20px;
  background-image: url(${ChevronIcon});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  content: ' ';
  @media (max-width: 843px) {
    margin: 0px 10px;
  }
`;

const MenuUI = ({ firstName, lastName, logout, history, toggleMessage, messageToggleRef }) => (
  <Wrapper>
    <MenuWrapper>
      <DropdownItem>
        <UsernameWrapper>
          <Username>{`${firstName} ${lastName}`}</Username>
          <Chevron />
        </UsernameWrapper>
        <DropdownMenu>
          <MenuItemLi>
            <MenuItem onClick={() => history.push('/update-profile/')}>
              Settings
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem onClick={() => logout(() => history.push('/'))}>
              Logout
            </MenuItem>
          </MenuItemLi>
        </DropdownMenu>
      </DropdownItem>
      <IconItem>
        <Icon width={20} height={20} src={Bell} alt="bell" />
      </IconItem>
      <IconItem ref={messageToggleRef} className="hide-on-mobile" onClick={toggleMessage}>
        <Icon width={32} height={20} src={Message} alt="bell" />
      </IconItem>
    </MenuWrapper>
  </Wrapper>
);

const mapStateToProps = ({ profile: { firstName, lastName } }) => ({
  firstName,
  lastName
});

const mapDispatchToProps = {
  logout
};

export const RightMenu = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuUI)
);
