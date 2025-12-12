import { getFunFactsList, PaginationSchema } from "@gebra/database";
import { protectedProcedure } from "../../../orpc/procedures";

export const getFunFactListProcedure = protectedProcedure
	.route({
		method: "GET",
		path: "/fun-fact",
		tags: ["fun-fact"],
		summary: "Get a list of fun facts",
		description: "Get a list of fun facts",
	})
	.input(PaginationSchema)
	.handler(async ({ context: { user } }) => {
		const funFacts = await getFunFactsList({ userId: user.id });
		return funFacts;
	});
