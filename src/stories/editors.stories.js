import React from 'react';

import { storiesOf } from '@storybook/react';

import {
  MemberEditor,
  ServiceEditor
} from '../components/template/Editors';

storiesOf('Editors', module)
  .add('Team Member Editor', () => <MemberEditor />)
  .add('Service Editor', () => <ServiceEditor />);
