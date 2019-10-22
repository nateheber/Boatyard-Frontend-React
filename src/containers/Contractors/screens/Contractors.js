import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Table from 'components/basic/Table';
import { GetContractors } from 'store/actions/contractors';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class TeamList extends React.Component {
  componentDidMount() {
    this.props.GetContractors({});
  }

  toDetails = contractor => {
    this.props.history.push(`/team/contractor-details/?id=${contractor.id}`);
  };

  render() {
    const { contractors } = this.props;
    // const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'user.attributes.firstName/user.attributes.lastName', },
      { label: 'company', value: 'company'},
      { label: 'phone number', value: 'user.attributes.phoneNumber', isPhone: true },
      { label: 'email', value: 'user.attributes.email'}
    ];

    return (
      <Wrapper>
        <Table
          columns={columns}
          records={contractors}
          toDetails={this.toDetails}
          page={1}
          pageCount={1}
          onPageChange={this.changePage}

        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ contractor: {contractors, currentStatus}}) => ({
  contractors,
  currentStatus
});

const mapDispatchToProps = {
  GetContractors
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamList));
