import React from 'react';

import Invoices from './components/Invoices';

export default class OpenedInvoices extends React.Component {
  render() {
    return (
      <Invoices type="open" />
    );
  }
}
