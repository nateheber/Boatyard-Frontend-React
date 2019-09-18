import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Table from 'components/basic/Table';
import ContractorListHeader from '../components/ContractorListHeader';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class TeamList extends React.Component {
  componentDidMount() {
    // this.props.GetManagements({});
  }

  toDetails = member => {
    this.props.history.push(`/contractor-details/?id=${member.id}`);
  };

  // getPageCount = () => {
  //   const { perPage, total } = this.props;
  //   return Math.ceil(total/perPage);
  // };

  // changePage = (page) => {
  //   this.props.GetManagements({ params: { page } });
  // }

  render() {
    // const { managements, page } = this.props;
    // const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'name', },
      { label: 'company', value: 'company'},
      { label: 'phone number', value: 'phone_number', isPhone: true },
      { label: 'email', value: 'email'}
    ];
    const data = [
      {id: 1, name: 'Contractor1', company: 'Company1', phone_number: '123456789', email: 'contractor1@test.com'},
      {id: 2, name: 'Contractor2', company: 'Company1', phone_number: '123456789', email: 'contractor2@test.com'},
      {id: 3, name: 'Contractor3', company: 'Company1', phone_number: '123456789', email: 'contractor3@test.com'},
      {id: 4, name: 'Contractor4', company: 'Company2', phone_number: '123456789', email: 'contractor4@test.com'},
      {id: 5, name: 'Contractor5', company: 'Company2', phone_number: '123456789', email: 'contractor5@test.com'},
      {id: 6, name: 'Contractor6', company: 'Company2', phone_number: '123456789', email: 'contractor6@test.com'},
      {id: 7, name: 'Contractor7', company: 'Company3', phone_number: '123456789', email: 'contractor7@test.com'},
    ];
    return (
      <Wrapper>
        <ContractorListHeader />
        <Table
          columns={columns}
          records={data}
          toDetails={this.toDetails}
          page={1}
          pageCount={1}
          onPageChange={this.changePage}

        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  // page: get(state, 'management.page', 1),
  // perPage: get(state, 'management.perPage', 20),
  // total: get(state, 'management.total', 0),
  // managements: refinedManagementsSelector(state)
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamList));
