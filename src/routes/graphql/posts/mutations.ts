import { DeleteResponse, PostType, UserType } from '../schemas.js';
import { GraphQLString, GraphQLID } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const createPostMutation = {
  type: PostType,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
  resolve: async (parent, body, context, info) => {
    const newPost = await context.prisma.post.create({
      data: body,
    });

    return newPost;
  },
};

export const deletePostMutation = {
  type: DeleteResponse,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (parent, { id }, context, info) => {
    await context.prisma.post.delete({
      where: { id },
    });

    return { deletedRecordId: id };
  },
};

export const changePostMutation = {
  type: PostType,
  args: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
  resolve: async (parent, { id, ...body }, context, info) => {
    const updatedPost = await context.prisma.post.update({
      where: { id },
      data: body,
    });

    return updatedPost;
  },
};
