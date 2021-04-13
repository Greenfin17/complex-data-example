// TODO: Complete this file

import { getGroups } from './data/groupData';
import getUsers from './data/userData';
import getUserGroups from './data/userGroupsData';

const groupsWithUsers = () => new Promise((resolve, reject) => {
  // COMPLETE THIS FUNCTION
  Promise.all([getUsers(), getGroups(), getUserGroups()])
    .then(([users, groups, userGroupsJoin]) => {
      console.warn(users, userGroupsJoin);
      const allGroupInfoArray = groups.map((group) => {
        const groupRelationshipArray = userGroupsJoin.filter(
          (ug) => ug.group_id === group.id
        );

        const userInfoArray = groupRelationshipArray.map(
          (groupRelationship) => users.find((user) => user.id
          === groupRelationship.user_id)
        );

        return { ...group, users, userInfoArray };
      });

      resolve(allGroupInfoArray);
    }).catch((error) => reject(error));
});

export default groupsWithUsers;
