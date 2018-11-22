import React from 'react';
import styled from 'styled-components';

import { TableHeader } from './Header';
import { Record } from './Record';

const Wrapper = styled.div``;

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    const { columns } = props;
    this.state = {
      sortColumn: columns[0].value,
      isAsc: false
    };
  }
  sort = col => {
    const { sortColumn, isAsc } = this.state;
    if (col === sortColumn) {
      this.setState({
        isAsc: !isAsc
      });
    } else {
      this.setState({
        sortColumn: col,
        isAsc: false
      });
    }
  };
  render() {
    const { columns, records } = this.props;
    const { sortColumn, isAsc } = this.state;
    return (
      <Wrapper>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          isAsc={isAsc}
          onSort={this.sort}
        />
        {records.map((rec, idx) => (
          <Record
            toDetails={() => this.props.toDetails(rec.id)}
            columns={columns}
            record={rec}
            key={`rec_${idx}`}
          />
        ))}
      </Wrapper>
    );
  }
}
