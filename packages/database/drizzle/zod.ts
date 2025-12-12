import {
	createSelectSchema,
	createUpdateSchema
} from "drizzle-zod";
import { session, user } from "./schema";
import z from "zod";

export const SessionSchema = createSelectSchema(session);
export const UserSchema = createSelectSchema(user);
export const UserUpdateSchema = UserSchema.partial().extend(z.object({
	id: z.string().describe("The ID of the user to update"),
}));