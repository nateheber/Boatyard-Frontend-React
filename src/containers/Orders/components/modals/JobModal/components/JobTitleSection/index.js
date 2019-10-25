import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';

import { SetWorkOrder } from 'store/actions/workorders';
import { Input } from 'components/basic/Input';
import { Section, SectionHeader, Column } from '../Section';

const HeaderInputLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #003247;
  text-align: center;
  text-transform: uppercase;
  margin-right: 5px;
  width: 80px;
  font-weight: bold;
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
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 400,
    letterSpacing: -0.3,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 200,
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
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#003247'
  }),
  option: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#003247'
  }),
  placeholder: styles => ({ ...styles }),
};

class JobTitleSection extends React.Component {
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
    const { managements, assignee } = this.props;
    if (managements) {
      const options = managements.map(management => (
        {
          value: management.id,
          label: `${management.fullName}`
        }
      ));
      return options.filter(o1 => !assignee || assignee.value !== o1.value);
    }
    return [];
  };

  render() {
    const { workorder, SetWorkOrder, assignee } = this.props;
    const { state } = workorder;
    const disabled = !(!state || state === 'draft' || state === 'declined');
    const options = this.getOptions();
    return (
      <Section>
        <SectionHeader>
          <Column>
          <HeaderInputLabel>Job Title:</HeaderInputLabel><Input disabled={disabled} style={{ width: 205 }} placeholder='Job Title' value={workorder.title} onChange={e => SetWorkOrder({title: e.target.value}) } />
          </Column>
          <Column>
            <HeaderInputLabel>Assign To:</HeaderInputLabel>
            {/* <Input style={{ width: 205 }} placeholder='Team Member' /> */}
            <Select
              value={assignee}
              onChange={this.handleChange}
              options={options}
              styles={colourStyles}
              isDisabled ={disabled}
            />

          </Column>
        </SectionHeader>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  managements: state.order.teamMemberData,
  workorder: state.workorders.workorder,
});

const mapDispatchToProps = {
  SetWorkOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(JobTitleSection);
