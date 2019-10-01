import React from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { GetNetworks } from 'store/actions/networks';
import { GetConversations, SetMessageBarUIStatus } from 'store/actions/conversations';
import { LoginWithProvider } from 'store/actions/providers';
import { SetPrivilege, SetRefreshFlag } from 'store/actions/auth';
import Header from 'components/compound/Header';
import SideBar from 'components/compound/Sidebar';
import MessageBar from './MessageBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;


const PageContent = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: stretch;
  flex-direction: row;
  flex: 1;
  padding-top: 68px;
  height: 100%;
  width: 100vw;
  background-color: #e6e6e6;
  overflow: hidden;
  @media (max-width: 470px) {
    &.has-location {
      padding-top: 120px;
    }
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 991px) {
    flex: 1;
  }
  @media (max-width: 991px) {
    width: 100vw;
  }
`;

const LocationWrapper = styled.div`
  background: white;
  color: #004258;
  font-size: 15px;
  font-weight: bold;
  padding: 7px;
  // position: fixed;
  z-index: 100;
  width: 100%;
  // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
  display: flex;
  align-items: center;
  span {
    color: #f7941e;
    cursor: pointer;
  }
`;


class MainPageTemplate extends React.Component {
  state = {
    showSidebar: false,
  };

  toggleMenu = () => {
    const { showSidebar } = this.state;
    this.setState({
      showSidebar: !showSidebar
    });
  };

  toggleMessage() {
    const { GetNetworks, GetConversations, showMessage, SetMessageBarUIStatus } = this.props;
    if (!showMessage) {
      GetNetworks({ params: { page: 1, per_page: 1000 } });
      GetConversations({ params: { page: 1, per_page: 1000 } });
    }
    SetMessageBarUIStatus({opened: !showMessage});
  }

  hideMessage = (e) => {
    if (!(this.messageToggle && this.messageToggle.contains(e.target))) {
      SetMessageBarUIStatus({opened: false});
    }
  }

  messageToggleRef = (ref) => {
    this.messageToggle = ref;
  }

  switchBack = () => {
    const { providerId, accessRole } = this.props;
    if (accessRole === 'admin') {
      this.props.SetPrivilege({privilege: 'admin', isLocationAdmin: false});
      window.setTimeout(() => this.props.SetRefreshFlag({flag: true}));
    }
    if (accessRole === 'provider') {
      this.props.LoginWithProvider({providerId, success: () => this.props.SetRefreshFlag({flag: true}), error: (err) => {}});
    }
  }

  getProviderName = () => {
    const { providers, providerId } = this.props;
    if (providerId) {
      const provider = find(providers, p => `${p.id}` === `${providerId}`);
      return provider.name;
    }

    return '';
  }
  render() {
    const { showSidebar } = this.state;
    const { privilege, accessRole, providerLocationId, locationName, showMessage } = this.props;
    const isProvider = privilege === 'provider';
    return (
      <Wrapper>
        <Header messageToggleRef={this.messageToggleRef} onMenuToggle={this.toggleMenu} onToggleMessage={() => this.toggleMessage()} />
        <PageContent className={`${accessRole === 'admin' ? '' : 'has-location'}`}>
          <SideBar showSidebar={showSidebar} />
          <ContentWrapper>
            {(accessRole === 'admin' || (providerLocationId && accessRole === 'provider')) && isProvider &&
              <LocationWrapper>
                <FontAwesomeIcon icon="user-circle" />  You are logged in to {providerLocationId ? locationName : this.getProviderName()}. <span onClick={this.switchBack}>Switch Back</span>
              </LocationWrapper>
            }
            {this.props.children}
          </ContentWrapper>
          <MessageBar show={showMessage} onHide={this.hideMessage} />
        </PageContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  accessRole: state.auth.accessRole,
  locationName: state.auth.locationName,
  providerLocationId: state.auth.providerLocationId,
  providerId: state.auth.providerId,
  providers: state.provider.providers,
  showMessage: state.conversation.ui.opened,
});

const mapDispatchToProps = {
  GetNetworks,
  GetConversations,
  SetPrivilege,
  SetRefreshFlag,
  LoginWithProvider,
  SetMessageBarUIStatus,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageTemplate));
