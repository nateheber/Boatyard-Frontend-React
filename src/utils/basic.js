import moment from 'moment'

export const parsetMomentToDate = (date) => {
  const convertTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return new Date(convertTime);
}

export function validateEmail(email) {
  // const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
}

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
}