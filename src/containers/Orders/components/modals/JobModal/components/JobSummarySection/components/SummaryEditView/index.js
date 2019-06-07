import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import EvilIcon from 'react-evil-icons';

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
    label: 'Date & Time Range'
  }
];

export default class SummaryEditView extends React.Component {
  constructor(props) {
    super(props);
    const hourOptions = [];
    for(let index = 0; index < 48; index++) {
      const value = index * 30;
      // const hours = ('0' + Math.floor(value / 60)).slice(-2);
      const hours = Math.floor(value / 60);
      const minutes = ('0' + value % 60).slice(-2);
      const label = `${hours > 12 ? hours - 12 : hours}:${minutes} ${index > 24 ? 'pm' : 'am'}`;
      hourOptions.push({ value, label });
    }
    const afterOptions = hourOptions.slice(0);
    this.state = {
      service: { label: '', value: '' },
      hourOptions,
      afterOptions,
      summaryInfoFields: [],
      dueTimeRange: { time_start: '', time_end: ''}
    };
  }

  componentDidMount() {
    this.getSummaryInfoFieldsInfo();
  }

  setSummaryInfoFieldRef = (ref) => {
    this.summaryInfoFields = ref;
  };

  getSummaryInfoFieldsInfo = (dueType = 'flexible') => {
    const summaryInfoFields = [
      {
        type: 'select_box',
        field: 'service',
        className: 'primary upper',
        label: 'Service:',
        errorMessage: 'Choose Service',
        options: [],
        required: true,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'select_box',
        field: 'due_type',
        className: 'primary upper',
        label: 'Due Date:',
        errorMessage: 'Choose Due Date',
        options: dueTypes,
        required: true,
        defaultValue: dueType,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      }
    ];

    switch(dueType) {
      case 'specific_date': {
        summaryInfoFields.push({
          type: 'date',
          field: 'due_date',
          className: 'primary upper',
          dateFormat: 'MM/dd/yyyy',
          label: 'Date:',
          errorMessage: 'Choose Date',
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        });
        break;
      }
      case 'specific_date_time': {
        summaryInfoFields.push({
          type: 'date',
          field: 'due_date',
          className: 'primary upper',
          dateFormat: 'MM/dd/yyyy',
          label: 'Date:',
          errorMessage: 'Choose Date',
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        });
        summaryInfoFields.push({
          type: 'inputable_time',
          field: 'due_time',
          className: 'primary upper',
          label: 'Time:',
          placeholder: '',
          errorMessage: 'Choose Time',
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        });
        break;
      }
      case 'data_time_range': {
        summaryInfoFields.push({
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        });
        summaryInfoFields.push({
          type: 'date',
          field: 'due_date',
          className: 'primary upper',
          dateFormat: 'MM/dd/yyyy',
          label: 'Date:',
          errorMessage: 'Choose Date',
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        });
        summaryInfoFields.push({
          type: 'inputable_time_range',
          field: 'due_time_range',
          className: 'primary upper',
          label: 'Time:',
          errorMessage: 'Choose Time Range',
          required: true,
          xs: 12,
          sm: 6,
          md: 5,
          lg: 5,
          xl: 5
        });
        break;
      }
      default: {
      }
    }
    this.setState({ summaryInfoFields });
  };

  handleChangeVisible = (contentVisible) => {
    const { onChangeVisible } = this.props;
    if (onChangeVisible) {
      onChangeVisible(contentVisible);
    }
  };

  handleFieldChange = (value, field) => {
    if (field === 'due_type') {
      this.getSummaryInfoFieldsInfo(value[field]);
    }
  };

  render() {
    const { summaryInfoFields } = this.state;
    return (
        <ContentWrapper>
          <Divider />
          <FormFields
            ref={this.setSummaryInfoFieldRef}
            fields={summaryInfoFields}
            onChange={this.handleFieldChange}
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
