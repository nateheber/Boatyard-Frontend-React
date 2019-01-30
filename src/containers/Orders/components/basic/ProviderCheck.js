import React from 'react';
import { get } from 'lodash';

import { CheckField } from 'components/basic/Input';

export default ({ provider, checked, onClick }) => (
  <CheckField title={get(provider, 'name')} checked={checked} onClick={onClick}/>
)