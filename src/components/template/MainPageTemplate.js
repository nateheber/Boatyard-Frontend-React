import React from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { GetNetworks } from 'store/actions/networks';
import { GetConversations } from 'store/actions/conversations';
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
  padding: 10px 0 0 10px;
  font-weight: bold;
  span {
    color: #f7941e;
    cursor: pointer;
  }
`;


class MainPageTemplate extends React.Component {
  state = {
    showSidebar: false,
    showMessage: false,
  };

  toggleMenu = () => {
    const { showSidebar } = this.state;
    this.setState({
      showSidebar: !showSidebar
    });
  };

  toggleMessage = () => {
    const { GetNetworks, GetConversations } = this.props;
    const { showMessage } = this.state;
    if (!showMessage) {
      GetNetworks({ params: { page: 1, per_page: 1000 } });
      GetConversations({ params: { page: 1, per_page: 1000 } });
    }
    this.setState({
      showMessage: !showMessage
    });
  }

  hideMessage = (e) => {
    if (!(this.messageToggle && this.messageToggle.contains(e.target))) {
      this.setState({ showMessage: false });
    }
  }

  messageToggleRef = (ref) => {
    this.messageToggle = ref;
  }

  switchBack = () => {
    this.props.SetPrivilege({privilege: 'admin', isLocationAdmin: false});
    window.setTimeout(() => this.props.SetRefreshFlag({flag: true}));
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
    const { showSidebar, showMessage } = this.state;
    const { privilege, isAdmin, providerLocationId, locationName } = this.props;
    const isProvider = privilege === 'provider';

    return (
      <Wrapper>
        <Header messageToggleRef={this.messageToggleRef} onMenuToggle={this.toggleMenu} onToggleMessage={this.toggleMessage} />
        <PageContent>
          <SideBar showSidebar={showSidebar} />
          <ContentWrapper>
            {isAdmin && isProvider &&
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
  isAdmin: state.auth.isAdmin,
  locationName: state.auth.locationName,
  providerLocationId: state.auth.providerLocationId,
  providerId: state.auth.providerId,
  providers: state.provider.providers,
});

const mapDispatchToProps = {
  GetNetworks,
  GetConversations,
  SetPrivilege,
  SetRefreshFlag,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageTemplate));
