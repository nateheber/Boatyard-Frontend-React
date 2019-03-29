import moment from 'moment'

export const parsetMomentToDate = (date) => {
  const convertTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return new Date(convertTime);
}

export function validateEmail(email) {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
}
