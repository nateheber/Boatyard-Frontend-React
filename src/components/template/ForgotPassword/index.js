import React from 'react';
import styled from 'styled-components';

import RequestForm from '../Forms/RequestForm';


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

class ForgotPassword extends React.Component {
  handleSendRequest = (email) => {
    console.log('---------------Email-----------', email);
  };
  render() {
    return (
      <Wrapper>
        <SideContent>
          <RequestForm onSendRquest={this.handleSendRequest} />
        </SideContent>
      </Wrapper>
    );
  }
}

export default ForgotPassword;
