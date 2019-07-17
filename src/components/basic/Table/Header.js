import React from 'react';
import styled from 'styled-components';
import className from 'classnames';
import { isBrowser } from 'react-device-detect';
import { ResizableBox } from 'react-resizable';
import { get } from 'lodash';

import 'react-resizable/css/styles.css';
import './style.css';

import ArrBlueIcon from '../../../resources/arrow-blue.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  @media (max-width: 843px) {
    display: none !important;
  }
`;

const ColumnHeader = styled(ResizableBox)`
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
`;

const NormalHeader = styled.div`
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
`;

const ColumnHeaderContent = styled.div`
  min-width: 130px;
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
`;

export class TableHeader extends React.Component {
  state = {
    widths: [],
    entireWidth: 0,
  }

  setWrapperInfo = (ref) => {
    if (ref) {
      const { width } = ref.getBoundingClientRect();
      const { columns } = this.props;
      const totalPortion = columns.reduce((prev, column) => {
        const width = get(column, 'width', 1);
        return prev + width;
      }, 0);
      const widths = columns.map(column => Math.max(width * get(column, 'width', 1) / totalPortion, 140));
      this.setState({ widths, entireWidth: width });
      this.props.onChangeSize(widths);
    }
  }

  updateDimensions = (width) => {
    const { columns } = this.props;
    const totalPortion = columns.reduce((prev, column) => {
      const width = get(column, 'width', 1);
      return prev + width;
    }, 0);
    const widths = columns.map(column => Math.max(width * get(column, 'width', 1) / totalPortion, 140));
    this.setState({ widths, entireWidth: width });
    this.props.onChangeSize(widths);
  }

  onResize = (idx) => (evt, obj) => {
    const { size: { width } } = obj;
    const { entireWidth } = this.state;
    const widths = [...this.state.widths];
    widths[idx] = width;
    const actualWidth = widths.reduce((prev, width) => prev + width, 0);
    if (actualWidth < entireWidth) {
      widths[widths.length - 1] = widths[widths.length - 1] - actualWidth + entireWidth;
    }
    this.setState({ widths });
    this.props.onChangeSize(widths);
  }
  
  render () {
    const { columns, sortColumn, isAsc, onSort, type = 'primary' } = this.props;
    const { widths } = this.state;
    return isBrowser ? (
      <Wrapper className={className(type)} ref={this.setWrapperInfo}>
        {columns.map((col, idx) => {
          const width = get(widths, `[${idx}]`, 130);
          return  columns.length - 1 === idx ? (
            <NormalHeader
              className={className(type)}
              key={`col_${idx}`}
              style={{ width: `${width}px` }}
            >
              <ColumnHeaderContent
                onClick={() => {
                  if (type === 'primary' && col.sort) {
                    onSort(col.sort);
                  }
                }}
                style={{ width: `${widths[idx]}px` }}
              >
                {col.label}
                {col.sort === sortColumn && type === 'primary' && (
                  <ArrBlue className={isAsc ? 'ascending' : 'descending'} />
                )}
              </ColumnHeaderContent>
            </NormalHeader>
          ) : (
            <ColumnHeader className={className(type)} key={`col_${idx}`} axis="x" width={width} height={type === 'secondary' ? 59 : 34} onResize={this.onResize(idx)} minConstraints={[130, 34]}>
              <ColumnHeaderContent
                onClick={() => {
                  if (type === 'primary' && col.sort) {
                    onSort(col.sort);
                  }
                }}
                style={{ width: `${widths[idx]}px` }}
              >
                {col.label}
                {col.sort === sortColumn && type === 'primary' && (
                  <ArrBlue className={isAsc ? 'ascending' : 'descending'} />
                )}
              </ColumnHeaderContent>
            </ColumnHeader>
          );
        })}
      </Wrapper>
    ) : false;
  }
}
