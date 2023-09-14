import { clerkClient } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';

interface Data {
  userId: string;
  [key: string]: any;
}

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl,
  };
};

export const withUser = async <TData extends Data>(data: TData) => {
  const users = await clerkClient.users.getUserList({
    userId: [data.userId],
  });

  const user = users.find((user) => user.id === data.userId);

  if (!user) {
    console.log(`User (${data.userId}) not found`);
  }

  return {
    ...data,
    user,
  };
};

export const withUserCollection = async <TData extends Data>(
  data: Array<TData>,
) => {
  const userIds = data.map((element) => element.userId);
  const users = await clerkClient.users.getUserList({
    userId: userIds,
  });

  return data.map((element) => {
    const user = users.find((user) => user.id === element.userId);

    if (!user) {
      console.log(`User (${element.userId}) not found`);
    }

    return {
      ...element,
      user,
    };
  });
};
