import { get, find } from 'lodash';
import { createSelector } from 'reselect';

const teamMembersSelector = (state) => {
  return get(state, 'order.teamMemberData', []);
};

const workordersSelectors = (state) => get(state, 'workorders.workorders', []);

export const withAssignmentSelector = createSelector(
  teamMembersSelector,
  workordersSelectors,
  (teamMembersData, workorders) => {
    return workorders.map(workorder => {
      const assignments = workorder.relationships.assignments.data.map(
        ({id: assignmentId, attributes: {assignableId}}) => {
          const data = find(teamMembersData, {id: `${assignableId}`});
          return {...data, assignmentId}
        }
      ).filter(assignment => assignment);
      const attachments = workorder.relationships.fileAttachments.data.map(
        ({id, type, attributes: {fileAttachment: {url}}}) => {
          const temp = url.split('/');
          const extension = temp[temp.length - 1].split('.')[1]
          return {
            id,
            type,
            url,
            file_attachment: url,
            filename: `${id}.${extension}`,
            fileType: ['jpg', 'jpeg', 'bmp', 'png', 'tif', 'gif'].indexOf(extension) > -1 ? 'image' : 'pdf'
          }
        }
      )
      return {...workorder, assignments, attachments};
    })
  }
);
