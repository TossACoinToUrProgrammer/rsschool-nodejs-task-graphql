import { DeleteResponse, UserType } from '../schemas.js';
import { GraphQLString, GraphQLID } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const createUserMutation = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    balance: { type: GraphQLString },
  },
  resolve: async (parent, { name, balance }, context, info) => {
    const newUser = await context.prisma.user.create({
      data: {
        name,
        balance,
      },
    });

    return newUser;
  },
};

export const deleteUserMutation = {
  type: DeleteResponse,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (parent, { id }, context, info) => {
    await context.prisma.user.delete({
      where: { id },
    });

    return { deletedRecordId: id };
  },
};

export const changeUserMutation = {
  type: UserType,
  args: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLString },
  },
  resolve: async (parent, { id, name, balance }, context, info) => {
    const updatedUser = await context.prisma.user.update({
      where: { id },
      data: { name, balance },
    });

    return updatedUser;
  },
};
