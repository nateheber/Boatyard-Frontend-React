import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import ChooseProviderLocation from './ChooseProviderLocation';
import MapMarkerIcon from '../../../resources/map-marker-alt-solid.svg';
import styled from 'styled-components';
import Bell from '../../../resources/notification-bell.svg';
import MessageBox from '../../../resources/messages-icon.png';
import ChevronIcon from '../../../resources/down-chevron.svg';

import AlertIcon from '../../../resources/icons/notifications/alert.png';
import InvoiceQuoteIcon from '../../../resources/icons/notifications/invoice-quote.png';
import JobIcon from '../../../resources/icons/notifications/job.png';
import MsgIcon from '../../../resources/icons/notifications/message.png';
import OrderIcon from '../../../resources/icons/notifications/order.png';
import ScheduleIcon from '../../../resources/icons/notifications/schedule.png';


import { SetRefreshFlag } from 'store/actions/auth';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import { Logout } from '../../../store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import { readNotification, GetNotifications } from 'store/actions/notifications';
import { notificationsSelector, unreadNotifications } from 'store/selectors/notifications';
import { SetMessageBarUIStatus } from 'store/actions/conversations';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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

const DropdownItem = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 68px;
  text-align: center;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #265B70;
    cursor: pointer;
  }
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
  float: left;
`;

const DropdownMenu = styled.ul`
  ${DropdownItem}:hover &:not(.notifications) {
    display: block;
  }
  &.notifications {
    max-height: 650px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  top: 68px;
  min-width: 200px;
  right: 0;
  min-height: 70px;
  padding: 0;
  &.show {
    display: block;
  }
  &.notifications {
    min-width: 300px;
    background: white;
  }
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
  &:not(.unread):hover {
    background-color: #f6f6f7;
  }
  &.unread {
    background-color: #edf2fa;
  }
`;

const BadgeNum = styled.div`
  position: absolute;
  right: 12px;
  top: 10px;
  background: #e17614;
  border-radius: 100%;
  font-family: Helvetica;
  font-size: 14px;
  color: #0D485F;
  text-align: center;
  width: 18px;
  height: 18px;
  line-height: 18px;
`;

// const BadgePlus = styled.label`
//   position: absolute;
//   top: 6px;
//   right: 11px;
//   font-size: 12px;
//   color: #F38118;
//   font-weight: 900;
//   &::before {
//     content: '+';
//   }
// `;

const MenuItem = styled.button`
  border: none;
  width: 100%;
  color: #003247;
  display: flex;
  align-items: center;
  padding: 5px 15px;
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
  padding: 20px 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  &:not(.disabled):hover {
    background-color: #265B70;
    cursor: pointer;
  }
  @media (max-width: 843px) {
    &.hide-on-mobile {
      display: none !important;
    }
  }
`;

const MenuItemIcon = styled.img`
  width: 22px;
  height: auto;
  margin-right: 13px;
`;

const Icon = styled.img`
`;

const UsernameWrapper = styled.a`
  color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 10px;
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

const  LocationsWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
  border: 1px solid white;
  position: relative;
  img {
    height: 16px;
    margin-right: 10px;
  }
`;
class MenuUI extends React.Component {
  state = {
    open: false,
    notificationOpen: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.reloadNotifications();
    this.timerId = window.setInterval(this.reloadNotifications, 30*1000);
  }

  reloadNotifications = () => {
    this.props.GetNotifications({params: {per_page: 1000, page: 1, 'notification_delivery[order]': 'id', 'notification_delivery[sort]': 'desc'}});
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.clearInterval(this.timerId);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        notificationOpen: false
      });
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  logout = () => {
    const { Logout } = this.props;
    Logout();
  };

  onCloseLocationModal = () => {
    this.setState({open: false});
  }

  handleLocationChange = location => {
    this.props.LoginWithProvider({
      ...location,
      providerId: this.props.providerId,
      success: () => {
        this.props.SetRefreshFlag({flag: true});
      },
      error: (e) => {
        toastr.error('Error', e.message);
        this.setState({open: false});
      }
    })
  }

  _getIcon(text) {
    const txt = text.toLowerCase();
    if (txt.indexOf('alert') >= 0) {
      return AlertIcon;
    }
    if (txt.indexOf('job') >= 0) {
      return JobIcon;
    }
    if (txt.indexOf('schedule') >= 0) {
      return ScheduleIcon;
    }
    if (txt.indexOf('invoice') >= 0 || txt.indexOf('quote') >=0 ) {
      return InvoiceQuoteIcon;
    }
    if (txt.indexOf('message') >= 0) {
      return MsgIcon;
    }
    if (txt.indexOf('order')) {
      return OrderIcon;
    }
  }
  getNotificationIcon = ({subject, content}) => { 
    return this._getIcon(subject) || this._getIcon(content) || AlertIcon;
  }

  handleNotitificationClick({id, data}){
    const { type, order, conversation } = data;
    if (order) {
      this.props.history.push(`/orders/${order}/detail`);
    }
    if (type === 'message') {
      this.props.SetMessageBarUIStatus({opened: true, selected: conversation, newMessage: false});
    }
    this.props.readNotification({id});
  }

  handleNotificationsClick() {
    if (!this.state.notificationOpen) {
      this.props.GetNotifications({params: {per_page: 1000, page: 1, 'notification_delivery[order]': 'id', 'notification_delivery[sort]': 'desc', clear: true}});
    }
    this.setState({notificationOpen: !this.state.notificationOpen});
    
  }

  render() {
    const { providerLocationId, providerLocations, firstName, lastName, history, toggleMessage, messageToggleRef, 
      locationName, accessRole, notifications, unreadCount } = this.props;
    const showNotificationBadge = parseInt(unreadCount) > 0;
    const { open, notificationOpen } = this.state;
    

    return (
      <Wrapper>
        {
          accessRole !== 'admin' && providerLocations.length > 1 &&
          <>
            <LocationsWrapper onClick={e => this.setState({open: true})}>
              <img alt="Map Maker" src={MapMarkerIcon} /> { locationName ? locationName : 'LOCATIONS' }
              { 
                open && 
                <ChooseProviderLocation 
                  onClose={ev => this.setState({open: false})}
                  locations={providerLocations} 
                  selected={providerLocationId} 
                  onChangeSelection={this.handleLocationChange} 
                />
              }
            </LocationsWrapper>
          </>
        }
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
                <MenuItem onClick={this.logout}>
                  Logout
                </MenuItem>
              </MenuItemLi>
            </DropdownMenu>
          </DropdownItem>
          <DropdownItem className={`notifications ${notifications.length === 0 && 'disabled'}`}
              onClick={ev => notifications.length > 0 && this.handleNotificationsClick()} 
              ref={this.setWrapperRef}
          >
            <IconItem className={`${notifications.length === 0 && 'disabled'}`}>
              <Icon width={20} height={20} src={Bell} alt="bell" />
            </IconItem>
            { showNotificationBadge && <BadgeNum>{unreadCount}</BadgeNum> }
            <DropdownMenu className={`notifications ${notificationOpen ? 'show' : ''}`}>
              {
                notifications.map(n =>
                  <MenuItemLi key={`notification-${n.id}`} className={n.read ? '' : 'unread'}>
                    <MenuItem onClick={() => this.handleNotitificationClick(n)}>
                      <MenuItemIcon src={this.getNotificationIcon(n)} />{n.subject}
                    </MenuItem>
                  </MenuItemLi>
                )
              }
            </DropdownMenu>
          </DropdownItem>
          <IconItem ref={messageToggleRef} className="hide-on-mobile" onClick={toggleMessage}>
            <Icon width={32} height={20} src={MessageBox} alt="message" />
          </IconItem>
        </MenuWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
  isAuthenticated: isAuthenticatedSelector(state),
  providerToken: state.auth.providerToken,
  adminToken: state.auth.adminToken,
  providerLocations: state.auth.providerLocations,
  providerId: parseInt(state.auth.providerId),
  providerLocationId: state.auth.providerLocationId,
  locationName: state.auth.locationName,
  accessRole: state.auth.accessRole,
  notifications: notificationsSelector(state),
  unreadCount: unreadNotifications(state),
});

const mapDispatchToProps = {
  Logout,
  LoginWithProvider,
  SetRefreshFlag,
  readNotification,
  SetMessageBarUIStatus,
  GetNotifications,
};

export const RightMenu = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuUI)
);
