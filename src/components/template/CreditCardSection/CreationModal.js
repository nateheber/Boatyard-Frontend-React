import React from 'react'
import { connect } from 'react-redux'

import FormFields from 'components/template/FormFields'

const cardFields = [
  {
    type: 'text_field',
    field: 'cardNumber',
    label: 'CARD NUMBER',
    mask: '99999 99999 99999 99999',
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  },
  {
    type: 'text_field',
    field: 'month',
    label: 'MONTH',
    mask: '99',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'year',
    label: 'YEAR',
    mask: '99',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  {
    type: 'text_field',
    field: 'cvv',
    label: 'CVV',
    mask: '99',
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
]