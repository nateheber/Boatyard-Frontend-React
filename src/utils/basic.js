import moment from 'moment';
// import { set } from 'lodash';


export const parsetMomentToDate = (date) => {
  const convertTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return new Date(convertTime);
};

export function validateEmail(email) {
  // const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};

export function formatPhoneNumber(phone, isEditing = false) {
  let formatted = phone;
  if (phone && phone.startsWith('+1')) {
    formatted = phone.slice(2);
    if (!isEditing) {
      const npa = formatted.substr(0, 3);
      const nxx = formatted.substr(3, 3);
      const last4 = formatted.substr(6, 4);
      formatted = `(${npa}) ${nxx}-${last4}`;
    }
  }
  return formatted;
};

export const refactorIncluded = (included) => {
  let refactored = {};
  for ( let i = 0; i < included.length; i += 1 ) {
    const { type, id } = included[i];
    if (refactored.hasOwnProperty(type)) {
      refactored[type][`${id}`] = {...included[i]};
    } else {
      refactored[type] = {};
      refactored[type][`${id}`] = {...included[i]};
    }
    // set(refactored, `${type}.${id}`, {...included[i]});
  }
  return refactored;
};

export const AVAILABLE_ALIAS_ORDERS = [
  'dispatched',
  'assigned',
  'provisioned',
  'scheduled',
  'accepted'
];

export const ORDER_ALIASES = {
  dispatched: 'Awaiting Acceptance',
  assigned: 'Awaiting Acceptance',
  provisioned: 'Quote Sent',
  scheduled: 'Quote Accepted',
  accepted: 'In Progress'
};

export const formatTimeFromString = (value) => {
  let timeString = '';
  let restString = '';
  let hours = '';
  let minutes = '';
  let noonValue = moment().format('a');
  if (value) {
    for (let index = 0; index < value.length; index++) {
      if ((value[index].charCodeAt() >= 48 && value[index].charCodeAt() <= 57) || value[index] === ':') {
        timeString = timeString + value[index];
      } else {
        restString = restString + value[index];
      }
    }
  }
  if (timeString.indexOf(':') > -1) {
    const timeArray = timeString.split(':');
    hours = timeArray[0];
    minutes = timeArray[1];
    if (parseInt(hours) >= 24) {
      hours = '12';
      noonValue = 'am';  
    } else if (parseInt(hours) > 12) {
      hours = `${parseInt(hours) % 12}`;
      noonValue = 'pm';
    } else {
      if (restString.indexOf('a') > restString.indexOf('p')) {
        noonValue = 'pm';
      } else if (restString.indexOf('a') > restString.indexOf('p')) {
        noonValue = 'am';
      }
    }
    if (parseInt(minutes) >= 60 || minutes.length === 0) {
      minutes = '00';
    } else if (parseInt(minutes) < 10) {
      minutes = `0${minutes}`;
    }
  } else {
    if (timeString.length === 1) {
      hours = timeString;
      minutes = '00';
      if (restString.indexOf('a') > restString.indexOf('p')) {
        noonValue = 'pm';
      } else if (restString.indexOf('a') > restString.indexOf('p')) {
        noonValue = 'am';
      }
    } else if (timeString.length === 2) {
      if (parseInt(timeString) > 24) {
        hours = timeString[0];
        if (parseInt(timeString[1]) > 5) {
          minutes = `0${minutes}`;
        } else {
          minutes = `${minutes}0`;
        }
        if (restString.indexOf('a') > restString.indexOf('p')) {
          noonValue = 'pm';
        } else if (restString.indexOf('a') > restString.indexOf('p')) {
          noonValue = 'am';
        }  
      } else {
        hours = `${parseInt(timeString) % 12 === 0 ? '12' : parseInt(timeString) % 12}`;
        minutes = '00';
        if (parseInt(timeString) < 12) {
          if (restString.indexOf('a') > restString.indexOf('p')) {
            noonValue = 'pm';
          } else if (restString.indexOf('a') > restString.indexOf('p')) {
            noonValue = 'am';
          }
        }
      }
    } else {
      if (parseInt(timeString.substr(0, 2)) > 24) {
        hours = timeString[0];
        if (parseInt(timeString.slice(1)) >= 60) {
          minutes = '00';
        } else if (restString.indexOf('a') > restString.indexOf('p')) {
          minutes = `0${timeString.slice(1)}`.slice(-2);
        }
        if (restString.indexOf('a') > restString.indexOf('p')) {
          noonValue = 'pm';
        } else {
          noonValue = 'am';
        }
      } else {
        hours = `${parseInt(timeString.substr(0, 2))% 12 === 0 ? '12' : parseInt(timeString.substr(0, 2)) % 12}`;
        if (parseInt(timeString.slice(2)) > 6) {
          if (timeString.slice(2).length === 1) {
            minutes = `0${timeString.slice(2)}`;
          } else if (timeString.slice(2).length === 2 && parseInt(timeString.slice(2)) < 60) {
            minutes = timeString.slice(2);
          } else {
            minutes = '00';
          }
        } else {
          if (timeString.slice(2).length === 1) {
            minutes = `${timeString.slice(2)}0`;
          } else {
            minutes = `0${timeString.slice(2)}`.slice(-2);
          }
        }
        if (parseInt(timeString.substr(0, 2)) < 12) {
          if (restString.indexOf('a') > restString.indexOf('p')) {
            noonValue = 'pm';
          } else if (restString.indexOf('a') > restString.indexOf('p')) {
            noonValue = 'am';
          }
        }
      }
    }
  }
  return `${hours}:${minutes}${noonValue}`;
};