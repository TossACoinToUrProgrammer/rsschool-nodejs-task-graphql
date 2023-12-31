import { MemberType } from '../schemas.js';
import { GraphQLID, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/memberType.js';

export const memberTypesQuery = {
  type: new GraphQLList(MemberType),
  resolve: async (parent, args, context, info) => {
    const posts = await context.prisma.memberType.findMany();
    return posts;
  },
};

export const memberTypeQuery = {
  type: MemberType,
  args: { id: { type: MemberTypeId } },
  resolve: async (parent, { id }, context, info) => {
    const memberType = await context.prisma.memberType.findUnique({
      where: { id },
    });
    if (!memberType) {
      throw context.httpErrors.notFound();
    }

    return memberType;
  },
};
