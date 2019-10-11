import React, {useState}  from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CreatableSelect from 'react-select/lib/AsyncCreatable';
import { connect } from 'react-redux';
import AddServiceModal from '../../../Services/components/AddServiceModal';
import AddLocationServiceModal from '../../../Services/components/AddLocationServiceModal';
import { actionTypes as serviceActions, CreateService } from 'store/actions/services';
import { getToken } from 'store/selectors/auth';
import { apiBaseUrl } from 'api/config';

export const BYCreateSelect = styled(CreatableSelect)`
.select__control {
  height: 30px;
  min-height: 30px;
  padding: 0;
  border: 1px solid #dfdfdf !important;
  font-family: 'Source Sans Pro', sans-serif;

  .select__value-container {
    padding: 0 8px;
    height: 28px;
    line-height: 28px;
  }
  .select__placeholder {
    line-height: 28px;
  }
  .css-1g6gooi {
    margin: 0;
    padding: 0;
  }
  .select__value {
    line-height: 26px !important;

    .select__value__label {
      line-height: 26px;
    }
  }
  .select__dropdown-indicator {
    padding: 2px;
  }
  .select__indicator-separator {
    margin: 2px;
  }
  .select__input {
    height: 26px;
    line-height: 20px;
  }
}
`;
const ServiceDropDown = ({value, onChangeService, services, serviceStatus, token, CreateService, providerLocationId}) => {
  const categoryApi = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token
    }
  });
  const [service, setService] = useState(value);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [miscCategory, setMiscCategory]  = useState({});

  const filterOptions = (inputValue) => {
    let filteredServices = services;
    if (inputValue && inputValue.trim().length > 0) {
      filteredServices = services.filter(service => service.name.toLowerCase().includes(inputValue.trim().toLowerCase()));
    }
    const options = filteredServices.map(option => ({
      value: option.id,
      cost: option.cost,
      label: option.name
    }));
    return options;
  };

  const onChangeFilter = (inputValue, callback) => {
    callback(filterOptions(inputValue));
  };

  const handleCreateService = (values) => {
    const data = providerLocationId ? { provider_location_service: values } : { service: values };
    CreateService({
      data,
      success: (data) => {
        setShowServiceModal(false);
        const option = {value: data.id, cost: data.cost, label: data.name};
        onChangeService(option);
        setService(option);
      }
    });
  };

  const handleCreate = (inputValue) => {
    categoryApi.get(`/services/categories?category[name]=Miscellaneous`).then(res => {
      const data = res.data.data[0];
      const {id, type, attributes} = data;
      setMiscCategory({...attributes, id, type, name: inputValue});
      setShowServiceModal(true);
    })

  }
  const handleChange = (service) => {
    onChangeService(service);
    setService(service);
  }
  const formatCreateLabel = inputValue => `Create new service "${inputValue}"...`;

  return (
    <>
      {showServiceModal &&
        <React.Fragment>
        {providerLocationId ?
          <AddLocationServiceModal
            loading={serviceStatus === serviceActions.CREATE_SERVICE}
            open={showServiceModal}
            service={miscCategory}
            showCat
            onClose={() => setShowServiceModal(false)}
            onSave={handleCreateService}
          />
        :
          <AddServiceModal
            loading={serviceStatus === serviceActions.CREATE_SERVICE}
            open={showServiceModal}
            category={miscCategory}
            showCat
            onClose={() => setShowServiceModal(false)}
            onSave={handleCreateService}
          />
        }
      </React.Fragment>}
      <BYCreateSelect
        className="basic-single"
        classNamePrefix="select"
        defaultOptions
        loadOptions={onChangeFilter}
        onChange={handleChange}
        onCreateOption={handleCreate}
        value={service}
        formatCreateLabel={formatCreateLabel}
      />
    </>
  );
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  services: state.service.services,
  serviceStatus: state.service.currentStatus,
  token: getToken(state),
  providerLocationId: state.auth.providerLocationId
});

const mapDispatchToProps = {
  CreateService
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDropDown);
