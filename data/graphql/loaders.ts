import DataLoader from 'dataloader';
import { User } from 'data/models';

export default function createLoaders(loaderOptions?: { disableCache?: boolean } | null) {
  const options = {
    cache: loaderOptions && loaderOptions.disableCache ? false : true,
  };

  return {
    users: new DataLoader(loadUsers, options),
  };
}

// Batch load users
async function loadUsers(userIds: ReadonlyArray<string>) {
  const users = await User.findAll({ where: { id: userIds } });
  const userById = indexBy(users, 'id');
  return userIds.map((userId) => userById[userId]);
}

function indexBy(array: any[], fieldName: string) {
  return array.reduce((dict, item) => {
    dict[item[fieldName]] = item;
    return dict;
  }, {});
}
