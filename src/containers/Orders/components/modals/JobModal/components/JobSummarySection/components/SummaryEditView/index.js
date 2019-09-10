import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import EvilIcon from 'react-evil-icons';
import FormFields from 'components/template/FormFields';
import { InputWrapper, InputLabel, TextArea } from 'components/basic/Input';
import  { find, debounce } from 'lodash';
import { DeleteButton } from '../../../Section';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormFieldWrapper = styled.div`
  position: relative;
  .btnAddService {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export const dueTypes = [
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
    value: 'date_time_range',
    label: 'Date & Time Range'
  }
];

export default class SummaryEditView extends React.Component {
  state = {
    summaryInfoFields: [],
    notes: ''
  }

  componentDidMount() {
    const { notes } = this.props.service;
    this.setState({notes});
    this.getSummaryInfoFieldsInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.servicesValidationCnt !== this.props.servicesValidationCnt && this.summaryInfoFields) {
      this.summaryInfoFields.validateFields();
    }
  }

  setSummaryInfoFieldRef = (ref) => {
    this.summaryInfoFields = ref;
  };

  getSummaryInfoFieldsInfo = (dueType) => {
    const { services, service: {service, due_type, due_date, due_time, due_time_range}, disabled } = this.props;
    const serviceOptions = services.map(s => {return {label: s.name, value: s.id}});
    const summaryInfoFields = [
      {
        type: 'auto_suggest',
        field: 'service',
        className: 'primary upper',
        label: 'Service:',
        errorMessage: 'Input Service',
        options: serviceOptions,
        required: true,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3,
        defaultValue: service,
        disabled
      },
      {
        type: 'select_box',
        field: 'due_type',
        className: 'primary upper',
        label: 'Due Date:',
        errorMessage: 'Choose Due Date',
        options: dueTypes,
        required: true,
        defaultValue: dueType ? dueType : (due_type || 'flexible'),
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3,
        disabled
      }
    ];

    switch(dueType || due_type) {
      case 'specific_date': {
        summaryInfoFields.push({
          type: 'date',
          field: 'due_date',
          className: 'primary upper',
          dateFormat: 'MM/dd/yyyy',
          label: 'Date:',
          errorMessage: 'Choose Date',
          defaultValue: due_date || new Date(),
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3,
          disabled
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
          defaultValue: due_date || new Date(),
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3,
          disabled
        });
        summaryInfoFields.push({
          type: 'inputable_time',
          field: 'due_time',
          className: 'primary upper',
          label: 'Time:',
          placeholder: '',
          errorMessage: 'Choose Time',
          required: true,
          defaultValue: due_time ? due_time : undefined,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3,
          disabled
        });
        break;
      }
      case 'date_time_range': {
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
          defaultValue: due_date || new Date(),
          required: true,
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3,
          disabled
        });
        summaryInfoFields.push({
          type: 'inputable_time_range',
          field: 'due_time_range',
          className: 'primary upper',
          label: 'Time:',
          errorMessage: 'Choose Time Range',
          required: true,
          defaultValue: due_time_range ? due_time_range : undefined,
          xs: 12,
          sm: 6,
          md: 4,
          lg: 4,
          xl: 4,
          disabled
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
    const { service } = this.props;
    this.handleServiceChange({...service, ...value});
    if (field === 'due_type') {
      this.getSummaryInfoFieldsInfo(value[field]);
    }
  };

  handleServiceChange = debounce((service) => {
    this.props.onChange(service);
  }, 400);

  getScheduleText = ({due_type, due_date, due_time, due_time_range }) => {
    const dueTypeLabel = find(dueTypes, {value: due_type});
    due_date = due_date && moment(due_date).format("MM/DD/YYYY");
    due_time = due_time && due_time.value;
    due_time_range = due_time_range && `${due_time_range.from_time.value} ~ ${due_time_range.to_time.value}`;

    if (due_type === 'specific_date') {
      return due_date;
    }
    if (due_type === 'specific_date_time') {
      return `${due_date} ${due_time}`;
    }
    if (due_type === 'date_time_range') {
      return `${due_date} ${due_time_range}`;
    }

    return dueTypeLabel.label;
  }

  handleNotesChange = (notes) => {
    const { service } = this.props;
    this.setState({notes});
    this.handleServiceChange({...service, notes});
  }

  render() {
    const { summaryInfoFields } = this.state;
    const { disabled } = this.props;
    return (
        <ContentWrapper>
          <FormFieldWrapper>
            {!disabled &&
            <div className="btnAddService">
              <DeleteButton className="btn-delete" onClick={this.props.handleDelete}>
                <EvilIcon name="ei-close" size="s" className="close-icon" />
              </DeleteButton>
            </div>
            }
          </FormFieldWrapper>
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
                  value={this.state.notes}
                  disabled={disabled}
                  style={{ marginBottom: 0, border: '1px solid #A9B5BB' }}
                  onChange={ev=>this.handleNotesChange(ev.target.value)}
                />
              </InputWrapper>
            </Col>
          </Row>
        </ContentWrapper>
    );
  }
}
