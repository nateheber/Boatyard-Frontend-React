import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Sidebar from '../components/compound/Sidebar';

storiesOf('SideBar', module).add('SideBar', () => <Sidebar />);
