import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import BackgroundImage from '../resources/auth/login-bg.png';

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
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
  )} />
);

export default PublicRoute;