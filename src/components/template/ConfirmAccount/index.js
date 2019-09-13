import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { apiBaseUrl } from 'api/config';
import { Logo, WelcomeTitle, WelcomeDescription, WelcomeWrapper } from '../CreatePassword';
import BoatYardLogoImage from '../../../resources/by_logo_2.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  @media (max-width: 402px) {
    width: calc(100% - 20px);
  }
`;

const SideContent =styled.div`
  display: flex;
  width: 382px;
  min-height: 514px;
  background-color: #ECECEC;
  @media (max-width: 402px) {
    width: 100%;
    flex-direction: column;
  }
`;

class ConfirmAccountComponent extends React.Component {
  state = {
    done: false,
    errorMsg: false
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if (query && !isEmpty(query) && Object.prototype.hasOwnProperty.call(query, 'token')) {
      const token = query.token;
      axios.get(`${apiBaseUrl}/users/confirmations/${token}`).then(() => {
        this.setState({done: true});
      }).catch(e =>  {
        this.setState({errorMsg: e.response.data[0]});
      })
    } else {
      toastr.error('Error', 'Missing token to confirm account');
    }
  };

  render() {
    const { errorMsg } = this.state;

    return (
      <Wrapper>
        <SideContent>

            <WelcomeWrapper>
              <Logo src={BoatYardLogoImage} />
              { !errorMsg && !this.state.done && <span>Checking...</span> }
              {
                errorMsg && <WelcomeDescription>{errorMsg}</WelcomeDescription>
              }
              {
                this.state.done &&
                <>
                  <WelcomeTitle>Thank you!</WelcomeTitle>
                  <WelcomeDescription>Your email has been confirmed.<br />You can now log in to your account.</WelcomeDescription>
                </>
              }
            </WelcomeWrapper>
        </SideContent>
      </Wrapper>
    );
  }
}

export default ConfirmAccountComponent;
