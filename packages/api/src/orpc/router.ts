import type { RouterClient } from "@orpc/server";
import { os } from "@orpc/server";
import { funFactRoute } from "../modules/fun-fact/route";

export const baseRouter = os.$context<{
	headers: Headers;
}>();

export const router = baseRouter.router({
	funFact: funFactRoute,
});

export type ApiRouterClient = RouterClient<typeof router>;
