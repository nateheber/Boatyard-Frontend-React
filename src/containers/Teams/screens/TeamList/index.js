import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { GetManagements } from 'store/actions/managements';
import { refinedManagementsSelector } from 'store/selectors/managements';
import Table from 'components/basic/Table';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class TeamList extends React.Component {
  componentDidMount() {
    this.props.GetManagements({});
  }

  toDetails = member => {
    this.props.history.push(`/team/member-details/?id=${member.id}`);
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    this.props.GetManagements({ params: { page } });
  }

  render() {
    const { managements, page } = this.props;
    const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName', },
      { label: 'phone number', value: 'relationships.user.attributes.phoneNumber', isPhone: true },
      { label: 'email', value: 'relationships.user.attributes.email' },
      { label: 'permissions', value: 'access' }
    ];
    return (
      <Wrapper>
        <Table
          columns={columns}
          records={managements}
          toDetails={this.toDetails}
          page={page}
          pageCount={pageCount}
          onPageChange={this.changePage}

        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  page: get(state, 'management.page', 1),
  perPage: get(state, 'management.perPage', 20),
  total: get(state, 'management.total', 0),
  managements: refinedManagementsSelector(state)
});

const mapDispatchToProps = {
  GetManagements
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamList));
