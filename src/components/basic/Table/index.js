import React from 'react';
import styled from 'styled-components';

import { TableHeader } from './Header';
import { Record } from './Record';
import Paginator from './Paginator';

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
`;

const PaginatorWrapper = styled.div`
  padding: 18px 50px;
  display: flex;
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
      isAsc: sort ? (sort.direction === 'asc' ? true : false) : false
    };
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

  setVisitRef = ref => {
    this.visitRef = ref;
  };

  renderContent = () => {
    const { columns, records, type } = this.props;
    return (
      <React.Fragment>
        {records.map((rec, idx) => (
          <Record
            type={type}
            toDetails={() => this.props.toDetails(rec.id)}
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
    const { columns, page, pageCount, onPageChange, type } = this.props;
    const { sortColumn, isAsc } = this.state;
    return (
      <Wrapper>
        <TableHeader
          type={type}
          columns={columns}
          sortColumn={sortColumn}
          isAsc={isAsc}
          onSort={this.sort}
        />
        {this.renderContent()}
        {
          pageCount > 1 && (
            <PaginatorWrapper>
              <Paginator page={page} totalPages={pageCount} onChange={onPageChange} />
            </PaginatorWrapper>
          )
        }        
      </Wrapper>
    );
  }
}
