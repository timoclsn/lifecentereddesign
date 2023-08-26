import { User } from '@clerk/nextjs/dist/types/server';
import { clerkClient } from '@clerk/nextjs';

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl,
  };
};

export const withUser = async <
  TData extends {
    userId: string;
    [key: string]: any;
  },
>(
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
