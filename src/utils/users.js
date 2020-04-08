export const refineUsers = (users) => {
  return users.map(user => {
    return {
      id: user.id,
      type: user.type,
      ...user.attributes
    };
  });
};
