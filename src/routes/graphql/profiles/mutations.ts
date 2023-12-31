import { DeleteResponse, ProfileType } from '../schemas.js';
import { GraphQLInt, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const createProfileMutation = {
  type: ProfileType,
  args: {
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    memberTypeId: { type: GraphQLString },
  },
  resolve: async (parent, props, context, info) => {
    const newProfile = await context.prisma.profile.create({
      data: props,
    });

    return newProfile;
  },
};

export const deleteProfileMutation = {
  type: DeleteResponse,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (parent, { id }, context, info) => {
    await context.prisma.profile.delete({
      where: { id },
    });

    return { deletedRecordId: id };
  },
};

export const changeProfileMutation = {
  type: ProfileType,
  args: {
    id: { type: UUIDType },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    memberTypeId: { type: GraphQLString },
  },
  resolve: async (parent, { id, ...body }, context, info) => {
    const updatedProfile = await context.prisma.profile.update({
      where: { id },
      data: body,
    });

    return updatedProfile;
  },
};
