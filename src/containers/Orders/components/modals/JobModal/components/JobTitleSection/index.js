import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import EvilIcon from 'react-evil-icons';

import { GetManagements } from 'store/actions/managements';
import { refinedManagementsSelector } from 'store/selectors/managements';
import { Input } from 'components/basic/Input';
import { Section, SectionHeader, SectionContent, Column, DeleteButton } from '../Section';

const HeaderInputLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #003247;
  text-align: center;
  text-decoration: uppercase;
  margin-right: 5px;
  width: 70px;
  font-weight: bold;
`;

const TeamMemberChip = styled.div`
  display: flex;
  padding: 4px 8px 4px 12px;
  margin: 5px;
  align-items: center;
  border: 1px solid #A9B5BB;
  border-radius: 6px;
`;

const TeamMemberName = styled.label`
  font-family: Helvetica;
  font-size: 15px;
  color: #003247;
`;

const colourStyles = {
  container: styles => ({
    ...styles,
    width: 205
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular, sans-serif',
    fontWeight: 400,
    letterSpacing: -0.3,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'OpenSans-Regular, sans-serif',
    fontSize: 14,
    color: '#003247',
    paddingTop: 1,
    paddingBottom: 1
  }),
  dropdownIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  singleValue: styles => ({
    ...styles,
    fontFamily: 'OpenSans-Regular, sans-serif',
    fontSize: 14,
    color: '#003247'
  }),
  option: styles => ({
    ...styles,
    fontFamily: 'OpenSans-Regular, sans-serif',
    fontSize: 14,
    color: '#003247'
  }),
  placeholder: styles => ({ ...styles }),
};

class JobTitleSection extends React.Component {
  componentDidMount() {
    const { GetManagements } = this.props;
    GetManagements({ params: { page: 1, per_page: 1000 } });
  }

  handleChange = member => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(member);
    }
  };

  handleDelete = member => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(member, true);
    }
  };

  getOptions = () => {
    const { managements, selected } = this.props;
    if (managements) {
      const options = managements.map(management => (
        {
          value: management.id,
          label: `${management.relationships.user.attributes.firstName} ${management.relationships.user.attributes.lastName}`
        }
      ));
      return options.filter(o1 => selected.filter(o2 => o2.value === o1.value).length === 0);
    }
    return [];
  };

  render() {
    const { selected } = this.props;
    const options = this.getOptions();
    return (
      <Section>
        <SectionHeader>
          <Column>
            <Input style={{ width: 205 }} placeholder='Job Title' />
          </Column>
          <Column>
            <HeaderInputLabel>Assign To:</HeaderInputLabel>
            {/* <Input style={{ width: 205 }} placeholder='Team Member' /> */}
            <Select
              value={null}
              onChange={this.handleChange}
              options={options}
              styles={colourStyles}
            />

          </Column>
        </SectionHeader>
        <SectionContent>
          <Column style={{ flexWrap: 'wrap' }}>
            {selected.map(member => (
              <TeamMemberChip key={`member_${member.value}`}>
                <TeamMemberName>{member.label}</TeamMemberName>
                <DeleteButton onClick={() => this.handleDelete(member)}>
                  <EvilIcon name="ei-close" size="s" className="close-icon" />
                </DeleteButton>
              </TeamMemberChip>
            ))}
          </Column>
        </SectionContent>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  managements: refinedManagementsSelector(state)
});

const mapDispatchToProps = {
  GetManagements
};

export default connect(mapStateToProps, mapDispatchToProps)(JobTitleSection);