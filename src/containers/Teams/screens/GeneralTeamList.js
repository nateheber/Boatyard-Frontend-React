import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import Tab from 'components/basic/Tab';
import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
// import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';
import TeamMembersList from './TeamList';
import ContractorsList from '../../Contractors/screens/Contractors';

const TABS = [
  { title: 'TEAM MEMBERS', value: 'members', counts: 0 },
  { title: 'CONTRACTORS', value: 'contractors', counts: 0 },
];

const GeneralTeamList = ({providerLocationId, history, match: {params: {type: listType}}}) => {
  const headerLabel = listType === 'members' ? 'TEAM MEMBER' : 'CONTRACTOR';
  const goToAddPage = () => {
    if (listType === 'members') {
      history.push(`/team/member-details/`);
    } else {
      history.push(`/team/contractor-details/`);
    }
  }

  const onChangeTab = (tab) => {
    history.push(`/team/${tab}/list`);
  }

  useEffect(() => {
    if (!providerLocationId && listType === 'contractors') {
      history.push(`/team/members/list`);
    }
  });

  return (
    <>
      <SectionHeaderWrapper>
        <LeftPart>
          <PageTitle>{headerLabel}S</PageTitle>
          {/*<ActionDropdown
            items={[
              {
                title: 'Import',
                action: () => {
                  onAction('import');
                }
              },
              {
                title: 'Export',
                action: () => {
                  onAction('export');
                }
              }
            ]}
          />*/}
        </LeftPart>
        <RightPart>
          <OrangeButton className="desktop" onClick={goToAddPage}>ADD {headerLabel}</OrangeButton>
        </RightPart>
      </SectionHeaderWrapper>
      { providerLocationId && <Tab tabs={TABS} selected={listType} onChange={onChangeTab} /> }
      {
        listType === 'members' ? <TeamMembersList /> : <ContractorsList />
      }
    </>
  );
}

const mapStateToProps = ({ auth: { providerLocationId } }) => ({
  providerLocationId
});

export default connect(mapStateToProps)(GeneralTeamList);
