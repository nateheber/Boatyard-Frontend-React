import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import { AccountHeader, CompanyInfo, ContactInfo } from './components';

const Wrapper = styled.div`
  padding-top: 18px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  margin: 27px 24px;
  padding: 38px 77px 26px;
`;

const EditorContent = styled.div`
  border-bottom: 1px solid #dfdfdf;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 24px;
`

class AccountEditor extends React.Component {
  getName = () => {
    const { provider } = this.props;
    return get(provider, 'name', '');
  }
  render() {
    const name = this.getName();
    return (
      <Wrapper>
        <AccountHeader name={name} />
        <EditorWrapper>
          <EditorContent>
            <CompanyInfo />
            <ContactInfo />
          </EditorContent>
          <ButtonWrapper>
            <OrangeButton>SAVE</OrangeButton>
          </ButtonWrapper>
        </EditorWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: get(state, 'provider.currentProvider')
});

export default connect(mapStateToProps)(AccountEditor);