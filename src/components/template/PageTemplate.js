import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ErrorMessage from 'components/basic/ErrorMessage';
import Header from 'components/compound/Header';
import SideBar from 'components/compound/Sidebar';

import { setErrorState, resetErrorState } from 'reducers/appstate';

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
  background-color: #e6e6e6;
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

class PageTemplate extends React.Component {
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
    const { error, errorMessage } = this.props;
    return (
      <Wrapper>
        <Header onMenuToggle={this.toggleMenu} />
        <PageContent>
          <SideBar showSidebar={showSidebar} />
          <ContentWrapper>
            <ErrorMessage
              error={error}
              message={errorMessage}
              key={this.props.location}
            />
            {this.props.children}
          </ContentWrapper>
        </PageContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ appstate: { error, errorMessage } }) => ({
  error,
  errorMessage
});

const mapDispatchToProps = {
  resetErrorState,
  setErrorState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageTemplate)
);
