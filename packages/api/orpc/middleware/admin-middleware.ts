import { ROLE } from "@gebra/core";
import { ORPCError, os } from "@orpc/server";
import type { Ctx } from "../types";

export const adminMiddleware = os
	.$context<Ctx>()
	.middleware(async ({ context, next }) => {
		if (context.user?.role !== ROLE.ADMIN) {
			throw new ORPCError("FORBIDDEN");
		}

		return await next();
	});
