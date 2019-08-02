import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';

import { SendResetRequest } from 'store/actions/auth';
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
    const { SendResetRequest } = this.props;
    SendResetRequest({
      email,
      success: () => {
        toastr.success('Success', 'Sent successfully!')
        this.props.history.push('/login');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
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

const mapDispatchToProps = {
  SendResetRequest
};

export default withRouter(connect(null, mapDispatchToProps)(ForgotPassword));
