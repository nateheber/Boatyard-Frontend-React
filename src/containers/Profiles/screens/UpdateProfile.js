import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import ProfileEditor from './template/ProfileEditor';

import { updateProfile } from 'store/reducers/profile';

const Wrapper = styled.div`
  height: 100%;
`;

class UpdateProfile extends React.Component {
  render() {
    return (
      <Wrapper>
        <ProfileEditor {...this.props} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ profile, auth }) => ({ profile, privilege: auth.privilege });
const mapDispatchToProps = { updateProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProfile));
