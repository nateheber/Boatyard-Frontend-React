import React from 'react';

import { SubSectionFrame } from './SubSectionFrame';

import AssignmentImage from '../../../resources/order_assignment_needed.svg';
import ScheduledImage from '../../../resources/todays_scheduled_orders.svg';
import AssignedToMeImage from '../../../resources/assigned_to_me.svg';
import OverdueImage from '../../../resources/invoices_overdue.svg';
import RevenueImage from '../../../resources/monthly_revenue.svg';

export const NewOrderSection = ({ count }) => (
  <SubSectionFrame
    title={`NEW ORDERS(${count})`}
    iconBg="#e49852"
    icon={AssignmentImage}
  />
);

export const ScheduledSection = ({ count }) => (
  <SubSectionFrame
    title={`Today's Scheduled Orders (${count})`}
    iconBg="#147397"
    icon={ScheduledImage}
  />
);

export const AssignedToMeSection = ({ count }) => (
  <SubSectionFrame
    title={`Assigned To Me (${count})`}
    iconBg="#0d485e"
    icon={AssignedToMeImage}
  />
);

export const OrverdueInvoiceSection = ({ count }) => (
  <SubSectionFrame
    title={`Invoices Overdue (${count})`}
    iconBg="#9f9aa4"
    icon={OverdueImage}
  />
);

export const MonthlyRevenueSection = ({ amount }) => (
  <SubSectionFrame
    type="revenue"
    amount={amount}
    title="Monthly Revenue"
    iconBg="#042734"
    icon={RevenueImage}
  />
);
