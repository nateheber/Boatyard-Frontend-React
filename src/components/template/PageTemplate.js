import React from 'react';
import styled from 'styled-components';

import Header from '../compound/Header';
import SideBar from '../compound/Sidebar';

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
  flex-grow: 1;
  padding-top: 68px;
  height: 100%;
  background-color: #e6e6e6;
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 991px) {
    flex-grow: 1;
  }
  @media (max-width: 991px) {
    width: 100vw;
  }
`;

export default class PageTemplate extends React.Component {
  state = {
    showSidebar: false
  };
  toggleMenu = () => {
    const { showSidebar } = this.state;
    this.setState({
      showSidebar: !showSidebar
    });
  };
  render() {
    const { showSidebar } = this.state;
    return (
      <Wrapper>
        <Header onMenuToggle={this.toggleMenu} />
        <PageContent>
          <SideBar showSidebar={showSidebar} />
          <ContentWrapper>{this.props.children}</ContentWrapper>
        </PageContent>
      </Wrapper>
    );
  }
}
