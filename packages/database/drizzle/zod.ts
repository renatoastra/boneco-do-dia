import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
} from "drizzle-zod";
import { funFactTable, session, user } from "./schema";
import { z } from "zod";

export const PaginationSchema = z.object({
	limit: z.coerce.number().min(1).max(100).optional().default(10).describe("The number of items to return"),
	offset: z.coerce.number().min(0).optional().default(0).describe("The number of items to skip"),
});

export const SessionSchema = createSelectSchema(session);
export const UserSchema = createSelectSchema(user);
export const UserUpdateSchema = createUpdateSchema(user, {
	id: z.string()
})

export const InsertFunFactSchema = createInsertSchema(funFactTable);
export const FunFactSchema = createSelectSchema(funFactTable);
export const FunFactUpdateSchema = createUpdateSchema(funFactTable, {
	id: z.string()
})