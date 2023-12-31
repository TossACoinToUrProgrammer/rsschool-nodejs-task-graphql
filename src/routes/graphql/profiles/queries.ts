import { ProfileType } from '../schemas.js';
import { GraphQLString, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const profilesQuery = {
  type: new GraphQLList(ProfileType),
  resolve: async (parent, args, context, info) => {
    const profiles = await context.prisma.profile.findMany();
    return profiles;
  },
};

export const profileQuery = {
  type: ProfileType,
  args: { id: { type: UUIDType } },
  resolve: async (parent, { id }, context, info) => {
    const profile = await context.prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw context.httpErrors.notFound();
    }
    
    return profile;
  },
};
