import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';

import { TableHeader } from './Header';
import { Record } from './Record';

const Wrapper = styled.div`
  background-color: white;
`;

const LoadWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const LoadButtonWrapper = styled.div`
  width: 150px;
`;

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
  setVisitRef = ref => {
    this.visitRef = ref;
  };
  renderContent = () => {
    const { columns, records } = this.props;
    return (
      <React.Fragment>
        {records.map((rec, idx) => (
          <Record
            toDetails={() => this.props.toDetails(rec.id)}
            columns={columns}
            record={rec}
            key={`rec_${idx}`}
          />
        ))}
      </React.Fragment>
    );
  };
  renderLoadButton = () => (
    <LoadWrapper>
      <LoadButtonWrapper>
        <OrangeButton onClick={this.props.loadMore}>Load More</OrangeButton>
      </LoadButtonWrapper>
    </LoadWrapper>
  );
  renderLoading = () => {
    return false;
  };
  render() {
    const { columns, hasMore } = this.props;
    const { sortColumn, isAsc } = this.state;
    return (
      <Wrapper>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          isAsc={isAsc}
          onSort={this.sort}
        />
        {this.renderContent()}
        {hasMore && this.renderLoadButton()}
      </Wrapper>
    );
  }
}
