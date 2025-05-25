import { db, Users, eq } from "astro:db";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  submit: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email({ message: "Please enter a valid email address." }),
    }),
    handler: async (input) => {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(Users)
        .where(eq(Users.email, input.email));

      if (existingUser.length > 0) {
        throw new ActionError({
            code: "CONFLICT",
            message: "You're already on our early access list!",
        })
      }

      await db.insert(Users).values({
        email: input.email,
      });
      return {
        success: true,
        message: "Thank you for joining our early access list!",
      }
    },
  }),
};
