import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from './constants';
//import omit from 'lodash';
import FilterIcon from '../../../resources/filter_icon.png';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import PropTypes from 'prop-types';



const Wrapper = styled.div`
  position: relative;
  margin-left: 5px;
  margin-top: -3px;
`;

const DropdownMenu = styled.div`
  &.show {
    display: block;
  }
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  left: -180px;
  background-color: white;
  position: absolute;
  width: 400px;
  z-index: 1;
  padding: 10px;
  &::before {
    height: 100%;
    display: block;
    width: 5px;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    right: -5px;
    position: absolute;
  }
  &::after {
    height: 5px;
    display: block;
    width: 100.5%;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    left: -1px;
    position: absolute;
  }
  margin-top: 8px;
  .resetDate {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 0px;
    float: right;
    &:hover {
      color: #f7941e;
    }
  }
  .DateRangePickerInput__withBorder {
    border: none;
  }
  .DateInput_input {
    font-size: 16px;
  }
  .CalendarDay__selected_span {
    background: #f7941e;
    color: white;
    border: 1px double #f7941e;
  }
  .CalendarDay__selected {
    background: #f7941e;
    color: white;
    &:hover {
      background: #f7941e;
      border: 1px double #f7941e;
    }
  }
  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: #f7941e;
    opacity: 0.5;
  }
`;

const propTypes = {
  // example props for the demo
  handleDatesChange: PropTypes.func
}
const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  presets: [],

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  //handleDatesChange: (start, end) => false,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => false,
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY'
};

export class DateSelectionFilter extends React.Component {
  constructor() {
    super();

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
   document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      });
    }
  }

  changeDates = () => {
    const { startDate, endDate } = this.state;
    const { handleDatesChange } = this.props;
    handleDatesChange(startDate, endDate);
  }

  state = {
    showMenu: false,
    startDate: null,
    endDate: null,
    focusedInput: null
  };

  render() {
    const { showMenu, startDate, endDate } = this.state;
    // const props = omit(this.props, [
    //   'autoFocus',
    //   'autoFocusEndDate',
    //   'initialStartDate',
    //   'initialEndDate',
    //   'presets',
    // ]);
    return (
      <Wrapper ref={this.setWrapperRef}>
        <img 
          alt=''
          src={FilterIcon}
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }} 
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
        <DateRangePicker
          {...this.props}
          startDate={this.state.startDate} 
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, () => this.changeDates())}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          showDefaultInputIcon={true}
          small={true}
          keepOpenOnDateSelect={true}
          showClearDates={true}
        />
        {(startDate !== null || endDate !== null) && <p className="resetDate" onClick={() => { this.setState({endDate: null, startDate: null}, () => this.changeDates()) }}>reset</p>}
        </DropdownMenu>
      </Wrapper>
    );
  }
}
DateSelectionFilter.propTypes = propTypes;
DateSelectionFilter.defaultProps = defaultProps;



