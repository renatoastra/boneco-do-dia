import { auth } from "@gebra/auth";
import { ORPCError, os } from "@orpc/server";

export const authMiddleware = os
	.$context<{
		headers: Headers;
	}>()
	.middleware(async ({ context, next }) => {
		const session = await auth.api.getSession({
			headers: context.headers,
		});

		if (!session) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "Unauthorized",
			});
		}

		return await next({
			context: {
				session: session.session,
				user: session.user,
			},
		});
	});
