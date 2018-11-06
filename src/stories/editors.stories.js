import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { MemberEditor } from '../components/template/Editors';

storiesOf('Editors', module).add('Team Member Editor', () => <MemberEditor />);
