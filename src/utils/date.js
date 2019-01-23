import moment from 'moment'

export const parsetMomentToDate = (date) => {
  const convertTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return new Date(convertTime);
}