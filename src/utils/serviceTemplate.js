import { get, set, hasIn } from 'lodash';

export const setServiceTemplateData = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const existingService = serviceInfo.hasOwnProperty('id');
  const { name } = attributes;
  const newTemplate = { ...templateInfo };
  const { data } = newTemplate;
  const newData = { ...data };
  set(newData, 'templateTitle', name);
  newData.templateTitle = name;
  if (hasIn(newData, 'data.description')) {
    if (existingService) {
      set(newData, 'data.description', get(attributes, 'description') || '');
    } else {
      const defaultData = get(newData, 'data.description');
      set(newData, 'data.description', get(attributes, 'description') || defaultData);
    }
  }
  if (hasIn(newData, 'data.secondaryDescription')) {
    if (existingService) {
      set(newData, 'data.secondaryDescription', get(attributes, 'secondaryDescription') || '');
    } else {
      const defaultData = get(newData, 'data.secondaryDescription');
      set(newData, 'data.secondaryDescription', get(attributes, 'secondaryDescription') || defaultData);
    }
  }
  if (hasIn(newData, 'data.cost')) {
    if (existingService) {
      set(newData, 'data.cost', get(attributes, 'cost'));
    } else {
      const defaultData = get(newData, 'data.cost');
      set(newData, 'data.cost', get(attributes, 'cost') || defaultData);
    }
  }
  const { additionalDetails } = attributes;
  if (additionalDetails) {
    const list = additionalDetails.split('\n');
    let listDescription = null;
    let listItems = [];
    if (list.length > 0) {
      if (list[0].substr(0, 1) === '*') {
        listDescription = list[0].substr(1);
      }
      if (list.length > 1) {
        listItems = list.slice(1);
      }
    }
    if (hasIn(newData, 'data.listDescription')) {
      const defaultData = get(newData, 'data.listDescription');
      set(newData, 'data.listDescription', listDescription || defaultData);
    }
    if (hasIn(newData, 'data.listItems')) {
      const defaultData = get(newData, 'data.listItems');
      const len = defaultData.length > listItems.length ? defaultData.length : listItems.length;
      const newListItems = [];
      for (let index = 0; index < len; index++) {
        const oldItem = get(defaultData, `${index}`);
        const newItem = get(listItems, `${index}`);
        newListItems.push(newItem || oldItem);
      }
      set(newData, 'data.listDescription', newListItems);
    }
  }
  // if (hasIn(newData, 'data.unit')) {
  //   const defaultData = get(newData, 'data.unit');
  //   set(newData, 'data.unit', get(attributes, 'costType') || defaultData);
  // }
  return { ...newTemplate, data: { ...newData } };
}

export const setTemplateDataToServiceAttributes = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const { data } = templateInfo;
  if (hasIn(data, 'data.description')) {
    // const defaultValue = get(attributes, 'description');
    // set(attributes, 'description', get(data, 'data.description') || defaultValue);
    set(attributes, 'description', get(data, 'data.description'));
  }
  if (hasIn(data, 'data.secondaryDescription')) {
    // const defaultValue = get(attributes, 'secondaryDescription');
    // set(attributes, 'secondaryDescription', get(data, 'data.secondaryDescription') || defaultValue);
    set(attributes, 'secondaryDescription', get(data, 'data.secondaryDescription'));
  }
  if (hasIn(data, 'data.cost')) {
    // const defaultValue = get(attributes, 'cost');
    // set(attributes, 'cost', get(data, 'data.cost') || defaultValue);
    set(attributes, 'cost', get(data, 'data.cost'));
  }
  let additionalDetails = [];
  if (hasIn(data, 'data.listDescription')) {
    const defaultData = get(data, 'data.listDescription');
    if (defaultData) {
      additionalDetails.push(`*${defaultData}`);
    }
  }
  if (hasIn(data, 'data.listItems')) {
    const defaultData = get(data, 'data.listItems');
    if (defaultData.length > 0) {
      additionalDetails = additionalDetails.concat(defaultData);
    }
  }

  if (additionalDetails.length > 0) {
    set(attributes, 'additionalDetails', additionalDetails.join('\n'));
  } else {
    const defaultValue = get(attributes, 'additionalDetails');
    if (defaultValue) {
      set(attributes, 'additionalDetails', additionalDetails.join('\n') || defaultValue);
    }
  }
  
  // if (hasIn(data, 'data.unit')) {
  //   const defaultValue = get(attributes, 'costType');
  //   set(attributes, 'data.unit', get(data, 'data.unit') || defaultValue);
  // }
  return attributes;
}
