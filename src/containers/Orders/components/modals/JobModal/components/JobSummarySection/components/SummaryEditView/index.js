import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import EvilIcon from 'react-evil-icons';
import { get } from 'lodash';

import FormFields from 'components/template/FormFields';
import { InputWrapper, InputLabel, TextArea } from 'components/basic/Input';
import { DeleteButton } from '../../../Section';

const ContentWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  .btn-delete {
    position: absolute;
    top: 30px;
    right: -15px;
  }
`;

export const Divider = styled.div`
  border-top: 1px solid #A9B5BB;
  margin: 20px -25px;
`;

const dueTypes = [
  {
    value: 'flexible',
    label: 'Flexible'
  },
  {
    value: 'asap',
    label: 'As Soon As Possible'
  },
  {
    value: 'specific_date',
    label: 'On a Specific Date'
  },
  {
    value: 'specific_date_time',
    label: 'Specific Date & Time'
  },
  {
    value: 'data_time_range',
    label: 'Date & Time range'
  }
]

export default class SummaryEditView extends React.Component {
  getSummaryInfoFieldsInfo = () => {
    const summaryInfo = get(this.props, 'summaryInfo', {
      serviceId: '',
      dueType: '',
      dueDate: new Date(),
      timeStart: '13:00',
      timeEnd: '15:00'
    });
    const {
      serviceId,
      dueType,
      dueDate,
      timeStart,
      timeEnd
    } = summaryInfo;

    const fields = [
      {
        type: 'select_box',
        field: 'service',
        className: 'primary upper',
        label: 'Service:',
        errorMessage: 'Choose Service',
        options: [],
        required: true,
        defaultValue: serviceId,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'select_box',
        field: 'due_date',
        className: 'primary upper',
        label: 'Due Date:',
        errorMessage: 'Choose Due Date',
        options: dueTypes,
        required: true,
        defaultValue: dueType,
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        type: 'date',
        field: 'date',
        className: 'primary upper',
        label: 'Date:',
        errorMessage: 'Choose Date',
        required: true,
        defaultValue: dueDate,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'time_range',
        field: 'time_range',
        className: 'primary upper',
        label: 'Time:',
        errorMessage: 'Choose Time Range',
        required: true,
        defaultValue: { time_start: timeStart, time_end: timeEnd },
        xs: 12,
        sm: 6,
        md: 5,
        lg: 5,
        xl: 5
      }
    ]
    return fields;
  };

  handleChangeVisible = (contentVisible) => {
    const { onChangeVisible } = this.props;
    if (onChangeVisible) {
      onChangeVisible(contentVisible);
    }
  };

  render() {
    const summaryFields = this.getSummaryInfoFieldsInfo();
    return (
        <ContentWrapper>
          <Divider />
          <FormFields
            ref={this.setSummaryInfoFieldRef}
            fields={summaryFields}
          />
          <Row>
            <Col xs={12}>
              <InputWrapper className='primary upper'>
                <InputLabel>Special Instructions:</InputLabel>
                <TextArea
                  style={{ marginBottom: 0, border: '1px solid #A9B5BB' }}
                  onChange={this.handleChangeInstructions}
                />
              </InputWrapper>
            </Col>
          </Row>
          <DeleteButton className="btn-delete" onClick={() => this.handleDelete}>
            <EvilIcon name="ei-close" size="s" className="close-icon" />
          </DeleteButton>
        </ContentWrapper>
    );
  }
}
