import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Tab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid #dcdcdc;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #f1efef;
  background-color: #f1efef;
  padding-left: 20px;
  width: 145px;
  height: 35px;
  margin-top: 15px;
  font-family: "Montserrat";
  font-size: 10pt;
  font-weight: bold;
  &.active {
    background-color: white;
    border-bottom: 1px solid white;
  }
  &:last-child {
    border-right: 1px solid #dcdcdc;
  }
  margin-bottom: -1px;
  color: #004258;
`;

const TabWrapper = styled.div`
  background-color: #fafafa;
  padding: 0px 25px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export default ({ tabs, selected, onSelect }) => (
  <TabWrapper>
    {
      tabs.map((tab, idx) => (
        <Tab
          className={classNames({ active: selected === tab })}
          onClick={() => onSelect(tab)}
          key={`tab_${idx}`}
        >{tab}</Tab>
      ))
    }
  </TabWrapper>
)