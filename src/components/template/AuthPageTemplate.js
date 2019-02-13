import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ByBg from '../../resources/by_bg.jpg';
import ByLogo from '../../resources/by_logo_2.png';

const Wrapper = styled.div`
  background-image: url(${ByBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 30px);
  max-width: 600px;
  margin-top: 50px !important;
  font-family: 'Source Sans Pro', sans-serif;
`;

const Logo = styled.img`
  max-width: 200px;
  margin-bottom: 15px;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #e7ecf1 !important;
`;

class AuthPageTemplate extends React.Component {
  render() {
    return (
      <Wrapper>
        <Content>
          <Logo src={ByLogo} />
          <MainContentWrapper>{this.props.children}</MainContentWrapper>
        </Content>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AuthPageTemplate);
