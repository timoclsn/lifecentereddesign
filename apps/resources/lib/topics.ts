import { Prisma } from 'database';

export type Topic = Prisma.TopicGetPayload<{}>;
export type Topics = Array<Topic>;
