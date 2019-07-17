import { get, map, find } from 'lodash';
export const notificationsSelector = state => {
  const notifications = get(state, 'notifications.notifications');
  const included = get(state, 'notifications.included');
  return  map(notifications, n => {
    const { attributes: { read, subject, content }, relationships: {notification: { data: { id }}} } = n;
    const { attributes: { data } } = find(included, {id});
    return {
      id: n.id,
      subject,
      content,
      data,
      read
    };
  });
}
export const unreadNotifications = state => get(state, 'notifications.unreadNotifications');