import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { GetNetworks } from 'store/actions/networks';
import { GetConversations } from 'store/actions/conversations';
import Header from 'components/compound/Header';
import SideBar from 'components/compound/Sidebar';
import MessageBar from './MessageBar';

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

  render() {
    const { showSidebar, showMessage } = this.state;
    return (
      <Wrapper>
        <Header messageToggleRef={this.messageToggleRef} onMenuToggle={this.toggleMenu} onToggleMessage={this.toggleMessage} />
        <PageContent>
          <SideBar showSidebar={showSidebar} />
          <ContentWrapper>
            {this.props.children}
          </ContentWrapper>
          <MessageBar show={showMessage} onHide={this.hideMessage} />
        </PageContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  GetNetworks,
  GetConversations
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageTemplate));
