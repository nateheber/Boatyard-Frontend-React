import { get, set, hasIn } from 'lodash';

export const setServiceTemplateData = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const { name } = attributes;
  const newTemplate = { ...templateInfo };
  const { data } = newTemplate;
  const newData = { ...data };
  set(newData, 'templateTitle', name);
  newData.templateTitle = name;
  // if (hasIn(newData, 'data.subtitle')) {
  //   const defaultData = get(newData, 'data.subtitle');
  //   set(newData, 'data.subtitle', name || defaultData);
  // }
  if (hasIn(newData, 'data.description')) {
    const defaultData = get(newData, 'data.description');
    set(newData, 'data.description', get(attributes, 'description') || defaultData);
  }
  if (hasIn(newData, 'data.secondaryDescription')) {
    const defaultData = get(newData, 'data.secondaryDescription');
    set(newData, 'data.secondaryDescription', get(attributes, 'secondaryDescription') || defaultData);
  }
  if (hasIn(newData, 'data.cost')) {
    const defaultData = get(newData, 'data.cost');
    set(newData, 'data.cost', get(attributes, 'cost') || defaultData);
  }
  if (hasIn(newData, 'data.unit')) {
    const defaultData = get(newData, 'data.unit');
    set(newData, 'data.unit', get(attributes, 'costType') || defaultData);
  }
  return { ...newTemplate, data: { ...newData } };
}

export const setTemplateDataToServiceAttributes = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const { data } = templateInfo;
  if (hasIn(data, 'data.description')) {
    const defaultValue = get(attributes, 'description');
    set(attributes, 'description', get(data, 'data.description') || defaultValue);
  }
  if (hasIn(data, 'data.secondaryDescription')) {
    const defaultValue = get(attributes, 'secondaryDescription');
    set(attributes, 'secondaryDescription', get(data, 'data.secondaryDescription') || defaultValue);
  }
  if (hasIn(data, 'data.cost')) {
    const defaultValue = get(attributes, 'cost');
    set(attributes, 'cost', get(data, 'data.cost') || defaultValue);
  }
  // if (hasIn(data, 'data.unit')) {
  //   const defaultValue = get(attributes, 'costType');
  //   set(attributes, 'data.unit', get(data, 'data.unit') || defaultValue);
  // }
  return attributes;
}
