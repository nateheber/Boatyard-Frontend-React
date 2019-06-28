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
import Message from '../../../resources/message.png';
import CheckCircle from '../../../resources/check_circle.png';
import Document from '../../../resources/document.png';
import { SetRefreshFlag } from 'store/actions/auth';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import { Logout } from '../../../store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';

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
  min-width: 200px;
  right: 0;
  min-height: 70px;
  padding: 0;
  &.notifications {
    min-width: 300px;
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
  &:hover {
    background-color: #f6f6f7;
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
  &:hover {
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
  height: 22px;
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
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  position: relative;
  img {
    height: 18px;
    margin-right: 10px;
  }
`;
class MenuUI extends React.Component {
  state = {
    open: false,
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

  render() {
    const { providerLocationId, providerLocations, firstName, lastName, history, toggleMessage, messageToggleRef, 
      locationName, accessRole } = this.props;
    const { open } = this.state;
   
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
          <DropdownItem style={{ display: 'none' }}>
            <IconItem>
              <Icon width={20} height={20} src={Bell} alt="bell" />
            </IconItem>
            <BadgeNum>{'3'}</BadgeNum>
            {/* <BadgePlus /> */}
            <DropdownMenu className="notifications">
              <MenuItemLi>
                <MenuItem onClick={() => history.push('/')}>
                  <MenuItemIcon src={Message} />You have a new message.
                </MenuItem>
              </MenuItemLi>
              <MenuItemLi>
                <MenuItem onClick={() => history.push('/')}>
                  <MenuItemIcon src={CheckCircle} />Brock has accepted your quote
                </MenuItem>
              </MenuItemLi>
              <MenuItemLi>
                <MenuItem onClick={() => history.push('/')}>
                  <MenuItemIcon src={Document} />You have received a new order from Brock
                </MenuItem>
              </MenuItemLi>
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
});

const mapDispatchToProps = {
  Logout,
  LoginWithProvider,
  SetRefreshFlag,
};

export const RightMenu = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuUI)
);
