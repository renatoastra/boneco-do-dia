import type { RouterClient } from "@orpc/server";
import { os } from "@orpc/server";

export const baseRouter = os.$context<{
	headers: Headers;
}>();

export const router = baseRouter.router({});

export type ApiRouterClient = RouterClient<typeof router>;
