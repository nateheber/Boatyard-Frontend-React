import { get, set, hasIn } from 'lodash';

export const setServiceTemplateData = (serviceInfo, templateInfo) => {
  const attributes = get(serviceInfo, 'attributes');
  const { name } = attributes;
  const newTemplate = { ...templateInfo };
  const { data } = newTemplate;
  const newData = { ...data };
  // set(newData, 'templateTitle', name);
  newData.templateTitle = name;
  if (hasIn(newData, 'data.subtitle')) {
    const defaultData = get(newData, 'data.subtitle');
    newData.data.subtitle = name || defaultData;
    // set(newData, 'data.subtitle', name || defaultData);
  }
  if (hasIn(newData, 'data.description')) {
    const defaultData = get(newData, 'data.description');
    newData.data.description = get(attributes, 'description') || defaultData;
    // set(newData, 'data.description', get(attributes, 'description') || defaultData);
  }
  if (hasIn(newData, 'data.secondaryDescription')) {
    const defaultData = get(newData, 'data.secondaryDescription');
    newData.data.secondaryDescription = get(attributes, 'secondaryDescription') || defaultData;
    // set(newData, 'data.secondaryDescription', get(attributes, 'secondaryDescription') || defaultData);
  }
  if (hasIn(newData, 'data.cost')) {
    const defaultData = get(newData, 'data.cost');
    newData.data.cost = get(attributes, 'cost') || defaultData;
    // set(newData, 'data.cost', get(attributes, 'cost') || defaultData);
  }
  return {...newTemplate, data: newData};
}
