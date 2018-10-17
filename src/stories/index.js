import React from 'react';
import WebFont from 'webfontloader';
import 'evil-icons';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

WebFont.load({
  google: {
    families: [
      'Source+Sans+Pro:300,400,600,700',
      'Montserrat:300,400,500,600,700'
    ]
  }
});
