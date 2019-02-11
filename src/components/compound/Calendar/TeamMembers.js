import React from 'react';
import styled from 'styled-components';

import { CheckBox } from '../../basic/Input';

const Wrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  background: transparent;
`;

const Title = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: 300;
  color: #004258;
  padding: 15px;
  text-transform: uppercase;
  background-color: #fafafa;
`;

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const Name = styled.div`
  flex: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 12px;
  color: #333;
  position: relative;
  display: block;
  padding-left: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const Color = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-top: 5px;
`;

export class TeamMembers extends React.PureComponent {
  render() {
    const { members } = this.props;
    return (
      <Wrapper>
        <Title>team members</Title>
        {members.map((member, idx) => (
          <MemberWrapper key={`member_${idx}`}>
            <CheckBox />
            <Name>{member.name}</Name>
            <Color style={{ backgroundColor: member.color }} />
          </MemberWrapper>
        ))}
      </Wrapper>
    );
  }
}
