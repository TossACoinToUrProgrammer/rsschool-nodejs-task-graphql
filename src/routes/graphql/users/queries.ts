import { UserType } from '../schemas.js';
import { GraphQLID, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const usersQuery = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args, context, info) => {
    const users = await context.prisma.user.findMany();
    return users;
  },
};

export const userQuery = {
  type: UserType,
  args: { id: { type: UUIDType } },
  resolve: async (parent, { id }, context, info) => {
    const user = await context.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw context.httpErrors.notFound();
    }
    user.profile = null
    return user;
  },
};

