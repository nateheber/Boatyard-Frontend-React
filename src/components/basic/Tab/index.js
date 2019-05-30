import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px !important;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  text-align: center;
  background-color: #f1f1f1;
  padding: 0;
  height: 55px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-family: Montserrat, sans-serif;
  color: #8f8f8f;
  font-weight: 700;
  &.active {
    border-bottom: 4px solid #f7941e;
    color: #003247;
  }
`;

const Count = styled.span`
  &.active {
    color: #457a91;
  }
  color: #b7b7b7;
`;

export default ({ tabs, selected, onChange }) => (
  <Wrapper>
    {tabs && tabs.map((tab, idx) => (
      <Tab
        key={`tab_${idx}`}
        onClick={() => {
          onChange(tab.value);
        }}
        className={selected === tab.value ? 'active' : 'deactive'}
      >
        {tab.title}
        {tab.counts > 0 && (
          <Count className={selected === tab.value ? 'active' : 'deactive'}>
            ({tab.counts})
          </Count>
        )}
      </Tab>
    ))}
  </Wrapper>
);
