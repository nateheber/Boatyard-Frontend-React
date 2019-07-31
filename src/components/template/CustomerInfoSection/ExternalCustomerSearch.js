import React, {useState} from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { ExternalCustomerOption }from 'components/basic/CustomerOption';
import  externalConnectionValue from 'components/basic/CustomerOptionValue';
import { colourStyles } from 'components/template/Orders/SelectCustomerModal';
import { FilterExternalConnections } from 'store/actions/users';

const ExternalCustomerSearch =  ({FilterExternalConnections, onExternalCustomerSelected}) => {
  const [customer, setCustomer] = useState();
  const onChangeCustomer = (value) => {
    console.log(value);
    onExternalCustomerSelected(value || {});
    setCustomer(value);
  }
  const loadOptions = AwesomeDebouncePromise(
      val => {
      console.log(val);
      const params = {};
      if (val.indexOf('@') > 0) {
        params['email'] = val;
      }
      if (val.indexOf(' ') > 0) {
        params['name'] = val;
      }
      // if phone number
      if (/(1\s?)?((\([0-9]{3}\))|[0-9]{3})?[\s-]?[0-9]{3}[\s-]?[0-9]{4}/.test(val)) {
        params['phone'] = val;
      }
      if (/[0-9]{6}/.test(val)) {
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
    },
    1000);

  return (
    <AsyncSelect
      components={{
        Option: ExternalCustomerOption,
        SingleValue: externalConnectionValue
      }}
      cacheOptions
      isClearable
      defaultOptions
      loadOptions={loadOptions}
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