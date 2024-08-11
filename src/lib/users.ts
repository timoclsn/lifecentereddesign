import { User, clerkClient } from '@clerk/nextjs/server';

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
  const users = await clerkClient().users.getUserList({
    userId: [data.userId],
  });

  const user = users.data.find((user) => user.id === data.userId);

  if (!user) {
    console.error(`User (${data.userId}) not found`);
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
  const users = await clerkClient().users.getUserList({
    userId: userIds,
  });

  return data.map((element) => {
    const user = users.data.find((user) => user.id === element.userId);

    if (!user) {
      console.error(`User (${element.userId}) not found`);
    }

    return {
      ...element,
      user,
    };
  });
};

export const isAdmin = async (userId: string) => {
  const fullUserData = await clerkClient().users.getUser(userId);
  const admin = fullUserData?.privateMetadata['admin'] as boolean | undefined;

  if (!admin) {
    return false;
  }

  return true;
};
