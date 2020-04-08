import moment from 'moment';
import * as constants from 'utils/constants';
import { get } from 'lodash';

export function getWhenValue(lineItem) {
  const scheduleItems = get(lineItem, 'relationships.lineItemSchedules', []);
    if (scheduleItems && scheduleItems.length > 0) {
      const scheduleItem = scheduleItems[0];
      if (scheduleItem) {
        if (get(scheduleItem, 'attributes.flexible')) {
          return constants.WHEN_FLEXIBLE_OPTION;
        } else if (get(scheduleItem, 'attributes.asap')) {
          return constants.WHEN_ASAP_OPTION;
        } else if (get(scheduleItem, 'attributes.complicated')) {
          return constants.WHEN_COMPLICATED_OPTION;
        } else {
          const startAt = moment(get(scheduleItem, 'attributes.specificStart'));
          let morning = true;
          if (startAt.hours() > 11) {
            morning = false;
          }
          return `${startAt.format('MM/DD/YYYY')} (${morning ? 'Morning' : 'Afternoon'})`;
        }
      }
    }
}
