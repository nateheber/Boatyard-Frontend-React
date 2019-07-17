import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames'

import LoadingSpinner from 'components/basic/LoadingSpinner';

import { TableHeader } from './Header';
import { Record } from './Record';
import Paginator from './Paginator';

const ContentWrapper =styled.div`
  width: 100%;
`

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const TableWrapper = styled.div`
  &.tile {
    width: initial;
    display: flex;
    flex-wrap: wrap;
    padding: 0 12px;
  }
`;

const PaginatorWrapper = styled.div`
  padding: 18px 50px;
  display: flex;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    const { sort } = props;
    this.state = {
      sortColumn: sort ? sort.col : null,
      isAsc: sort ? (sort.direction === 'asc' ? true : false) : false,
      sizes: [],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimension);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimension);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.columns.length !== prevProps.columns.length) {
      this.updateDimension();
    }
    return null;
  }
  setWrapperRef = (ref) => {
    this.wrapper = ref;
  }

  setHeaderRef = (ref) => {
    this.header = ref;
  }

  onChangeSize = (sizes) => {
    this.setState({ sizes });
  }

  sort = col => {
    const { onSortChange } = this.props;
    const { sortColumn, isAsc } = this.state;
    let direction = isAsc, column = sortColumn;
    if (column && col === column) {
      direction = !direction;
    } else {
      column = col;
      direction = false;
    }
    this.setState({
      sortColumn: column,
      isAsc: direction
    });
    if (onSortChange) {
      onSortChange({
        col: column,
        direction: direction ? 'asc' : 'desc'
      });
    }
  };

  updateDimension = () => {
    const { width } = this.wrapper.getBoundingClientRect();
    if (this.header) {
      this.header.updateDimensions(width);
    }
  }

  toDetails = record => {
    const { toDetails } = this.props;
    if (toDetails) {
      toDetails(record);
    }
  };

  renderContent = () => {
    const { columns, records, type, loading } = this.props;
    const { sizes } = this.state;
    return loading ? <LoadingSpinner /> :
    (
      <React.Fragment>
        {records.map((rec, idx) => (
          <Record
            sizes={sizes}
            type={type}
            toDetails={() => this.toDetails(rec)}
            columns={columns}
            record={rec}
            key={`rec_${idx}`}
          />
        ))}
      </React.Fragment>
    );
  };

  renderLoading = () => {
    return false;
  };

  render() {
    const { columns, page, pageCount, onPageChange, type, loading } = this.props;
    const { sortColumn, isAsc } = this.state;
    return (
      <ContentWrapper>
        <Wrapper ref={this.setWrapperRef}>
          <TableWrapper className={classNames(type)}>
            {type !== 'tile' && <TableHeader
              ref={this.setHeaderRef}
              type={type}
              columns={columns}
              sortColumn={sortColumn}
              isAsc={isAsc}
              onSort={this.sort}
              onChangeSize={this.onChangeSize}
            />}
            {this.renderContent()}
          </TableWrapper>
        </Wrapper>
        {
          !loading && pageCount > 1 && (
            <PaginatorWrapper>
              <Paginator page={page} totalPages={pageCount} onChange={onPageChange} />
            </PaginatorWrapper>
          )
        }        
      </ContentWrapper>
    );
  }
}
