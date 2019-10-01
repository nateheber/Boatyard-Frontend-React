import React, {useState} from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import debounce from "debounce-promise";
import { ExternalCustomerOption }from 'components/basic/CustomerOption';
import  externalConnectionValue from 'components/basic/CustomerOptionValue';
import { colourStyles } from 'components/template/Orders/SelectCustomerModal';
import { FilterExternalConnections } from 'store/actions/users';

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

const ExternalCustomerSearch =  ({FilterExternalConnections, onExternalCustomerSelected}) => {
  const [customer, setCustomer] = useState();
  const onChangeCustomer = (value) => {
    onExternalCustomerSelected(value || {});
    setCustomer(value);
  }
  const loadOptions = val => {
    const params = {};
    if (val.indexOf('@') > 0) {
      params['email'] = val;
    }
    if (val.indexOf(' ') > 0) {
      params['name'] = val;
    }
    // if phone number
    const phoneNumber = formatPhoneNumber(val);
    if (phoneNumber) {
      params['phone'] = phoneNumber;
    } else if (/[0-9]{4,6}/.test(val) && val.length <=6) {
      params['customer_id'] = val;
    }
    if (Object.keys(params).length === 0) {
      return [];
    }
    return new Promise((resolve, reject) => {
      FilterExternalConnections({
        params,
        success: (data) => {
          resolve(data);
        },
        error: reject
      });
    });
  };

  const debouncedLoadOptions = debounce(
    loadOptions,
    1000, 
    {leading: true}
  );

  return (
    <AsyncSelect
      components={{
        Option: ExternalCustomerOption,
        SingleValue: externalConnectionValue
      }}
      isClearable
      defaultOptions
      loadOptions={debouncedLoadOptions}
      onChange={onChangeCustomer}
      value={customer}
      styles={colourStyles}
      noOptionsMessage={()=>"No Result"}
    />
  );
}

const mapDispatchToProps = {
  FilterExternalConnections
};

export default connect(
  null,
  mapDispatchToProps
)(ExternalCustomerSearch);