import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BackgroundImage from '../../resources/auth/login-bg.png';

const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
class AuthPageTemplate extends React.Component {
  render() {
    console.log("Auth page temp");
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(AuthPageTemplate));
