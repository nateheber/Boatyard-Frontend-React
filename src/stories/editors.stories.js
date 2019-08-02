import React from 'react';

import { storiesOf } from '@storybook/react';

import {
  MemberEditor
} from '../components/template/Editors';

storiesOf('Editors', module)
  .add('Team Member Editor', () => <MemberEditor />);
