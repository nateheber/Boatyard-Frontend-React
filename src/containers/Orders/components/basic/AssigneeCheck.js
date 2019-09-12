import React from 'react';
import { CheckField } from 'components/basic/Input';

const AssigneeCheck = ({checked, label, onClick}) => (
  <CheckField title={label} checked={checked} onClick={onClick}/>
);

export default AssigneeCheck;
