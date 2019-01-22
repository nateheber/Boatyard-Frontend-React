import React from 'react';

import Invoices from './components/Invoices';

export default class PaidInvoices extends React.Component {

  render() {
    return (
      <Invoices type="paid" />
    );
  }
}
