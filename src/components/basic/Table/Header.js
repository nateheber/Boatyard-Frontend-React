import React from 'react'
import styled from 'styled-components'
import className from 'classnames'

import ArrBlueIcon from '../../../resources/arrow-blue.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media (max-width: 843px) {
    display: none;
  }
`
const ColumnHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: 34px;
  box-sizing: border-box;
  border: #eaeaea solid 1px;
  border-left: none;
  background-color: white;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #07384b;
  cursor: pointer;
  padding: 8px;
  padding-left: 30px;
  line-height: 1.42857;
  border-collapse: collapse;
  &:first-child {
    border: #eaeaea solid 1px;
  }
  white-space: nowrap;
  text-transform: uppercase;
  &.secondary {
    border: none;
    font-size: 14px;
    font-weight: 700;
    padding: 20px 8px;
    padding-left: 30px;
    background-color: rgb(249, 249, 249);
    height: auto;
  }
`
const ArrBlue = styled.span`
  margin-left: 2px;
  background-image: url(${ArrBlueIcon});
  height: 12px;
  width: 12px;
  background-size: 9px 9px;
  background-repeat: no-repeat;
  background-position: center;
  &.ascending {
    transform: rotate(180deg);
  }
`

export const TableHeader = ({ columns, sortColumn, isAsc, onSort, type = 'primary' }) => (
  <Wrapper className={className(type)}>
    {columns.map((col, idx) => (
      <ColumnHeader
        key={`col_${idx}`}
        onClick={() => {
          if (type === 'primary' && col.sort) {
            onSort(col.sort);
          }
        }}
        className={className(type)}
      >
        {col.label}
        {col.sort === sortColumn && type === 'primary' && (
          <ArrBlue className={isAsc ? 'ascending' : 'descending'} />
        )}
      </ColumnHeader>
    ))}
  </Wrapper>
)
