import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { Logo, HeaderWrapper, RightMenu } from 'components/basic/Header';
import { HamburgerButton } from 'components/basic/Buttons';
import { SearchBox } from 'components/basic/Input';
import { SetRefreshFlag } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import ChooseProviderLocation from '../basic/Header/ChooseProviderLocation';
import MapMarkerIcon from '../../resources/map-marker-alt-solid.svg';

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 470px) {
    &.has-location {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const  LocationsWrapper = styled.div`
  display: none;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  padding: 5px 20px;
  margin-right: 15px;
  color: white;
  border-radius: 5px;
  border: 1px solid white;
  position: relative;
  img {
    height: 16px;
    margin-right: 10px;
  }
  @media (max-width: 470px) {
    display: flex;
  }
`;

const SearchWrapper = styled.div`
  width: 228px;
`;

const RightPart = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 470px) {
    &.has-location {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
class Header extends React.PureComponent {
  state = {
    open: false
  };

  handleLocationChange = location => {
    this.props.LoginWithProvider({
      ...location,
      providerId: this.props.providerId,
      success: () => {
        this.props.SetRefreshFlag({ flag: true });
      },
      error: (e) => {
        toastr.error('Error', e.message);
        this.setState({ open: false });
      }
    })
  }

  render() {
    const { onMenuToggle, onToggleMessage, messageToggleRef, providerLocationId,
      providerLocations, locationName, accessRole } = this.props;
    const { open } = this.state;
    return (
      <HeaderWrapper>
        <LeftPart className={`${accessRole === 'admin' ? '' : 'has-location'}`}>
          <HamburgerButton onClick={onMenuToggle} />
          <Logo />
          <SearchWrapper style={{ display: 'none' }}>
            <SearchBox secondary placeholder="Search by order number, user, boat, etc" style={{ width: '100%' }} />
          </SearchWrapper>
          {
            accessRole !== 'admin'  &&
            <>
              <LocationsWrapper onClick={e => this.setState({open: true})}>
                <img alt="Map Maker" src={MapMarkerIcon} /> { locationName ? locationName : 'LOCATIONS' }
                {
                  open &&   providerLocations.length > 1 &&
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
        </LeftPart>
        <RightPart className={`${accessRole === 'admin' ? '' : 'has-location'}`}>
          <RightMenu messageToggleRef={messageToggleRef} toggleMessage={onToggleMessage} />
        </RightPart>
      </HeaderWrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  providerLocations: state.auth.providerLocations,
  providerId: parseInt(state.auth.providerId),
  providerLocationId: state.auth.providerLocationId,
  locationName: state.auth.locationName,
  accessRole: state.auth.accessRole
});

const mapDispatchToProps = {
  LoginWithProvider,
  SetRefreshFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
