import { get, set, hasIn } from 'lodash';

export const setServiceTemplateData = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const { name } = attributes;
  const { data } = templateInfo;
  const newData = { ...data };
  set(newData, 'templateTitle', name);
  if (hasIn(newData, 'data.subtitle')) {
    const defaultData = get(newData, 'data.subtitle');
    set(newData, 'data.subtitle', get(attributes, 'subtitle') || defaultData);
  }
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
  return {...templateInfo, data: newData};
}