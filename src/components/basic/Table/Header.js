import React from 'react';
import styled from 'styled-components';
import className from 'classnames';
import { isBrowser } from 'react-device-detect';
import { ResizableBox } from 'react-resizable';

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
    widths: []
  }

  setWrapperInfo = (ref) => {
    if (ref) {
      const { width } = ref.getBoundingClientRect();
      const { columns } = this.props;
      const colWidth = width / columns.length;
      const widths = [];
      for(let i = 0; i < columns.length; i += 1) {
        widths.push(colWidth);
      }
      this.setState({ widths });
      this.props.onChangeSize(widths);
    }
  }

  onResize = (idx) => (evt, obj) => {
    const { size: { width } } = obj;
    const widths = [...this.state.widths];
    widths[idx] = width;
    this.setState({ widths });
    this.props.onChangeSize(widths);
  }

  render () {
    const { columns, sortColumn, isAsc, onSort, type = 'primary' } = this.props;
    const { widths } = this.state;
    return isBrowser ? (
      <Wrapper className={className(type)} ref={this.setWrapperInfo}>
        {columns.map((col, idx) => (
          <ColumnHeader className={className(type)} key={`col_${idx}`} axis="x" width={widths[idx]} height={34} onResize={this.onResize(idx)}>
            <div
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
            </div>
          </ColumnHeader>
        ))}
      </Wrapper>
    ) : false;
  }
}
