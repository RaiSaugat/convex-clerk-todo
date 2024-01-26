import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('tasks')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();
  },
});

// Create a new task with the given text
export const createTask = mutation({
  args: { text: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert('tasks', {
      text: args.text,
      isCompleted: false,
      userId: args.userId,
    });
    return newTaskId;
  },
});

export const completeTask = mutation({
  args: { id: v.id('tasks'), isCompleted: v.boolean() },
  handler: async (ctx, args) => {
    const { id } = args;

    await ctx.db.patch(id, { isCompleted: args.isCompleted });
  },
});

export const deleteTask = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    const { id } = args;
    return await ctx.db.delete(id);
  },
});
