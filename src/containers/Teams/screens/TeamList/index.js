import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { get, sortBy } from 'lodash';

import { GetManagements } from 'store/actions/managements';
import { refinedManagementsSelector } from 'store/selectors/managements';
import Table from 'components/basic/Table';
import { SearchBox } from 'components/basic/Input';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const SearchSection = styled(Row)`
  border-top: 1px solid #D5DBDE;
  border-bottom: 1px solid #D5DBDE;
  margin: 0 0 20px 0 !important;
`;

const SearchCotainer = styled(Col)`
  padding: 24px 20px;
  width: 305px;
`;

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      members: props.managements,
    }
  }

  componentDidMount() {
    this.props.GetManagements({
      params: { per_page: 1000 }
    });
  }

  handleInputChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.loadPage();
    });
  }

  loadPage = () => {
    const { keyword } = this.state;
    const { managements } = this.props;
    let members = managements;
    if (keyword && keyword.trim().length > 0) {
      members = managements.filter(member => get(member, 'relationships.user.attributes.firstName', '').toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1);
    }
    this.setState({ members });
  }

  toDetails = member => {
    this.props.history.push(`/team/member-details/?id=${member.id}`);
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    this.props.GetManagements({ params: { page, per_page: 1000 } });
  }

  render() {
    const { members } = this.state;
    const { page } = this.props;
    // const { managements, page } = this.props;
    // const sortedManagements = sortBy(managements, 'relationships.user.attributes.lastName', 'relationships.user.attributes.firstName');
    const sortedManagements = sortBy(members, 'relationships.user.attributes.lastName', 'relationships.user.attributes.firstName');
    const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName', },
      { label: 'phone number', value: 'relationships.user.attributes.phoneNumber', isPhone: true },
      { label: 'email', value: 'relationships.user.attributes.email' },
      { label: 'permissions', value: 'access' }
    ];
    return (
      <Wrapper>
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH TEAM MEMBERS" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          columns={columns}
          records={sortedManagements}
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
