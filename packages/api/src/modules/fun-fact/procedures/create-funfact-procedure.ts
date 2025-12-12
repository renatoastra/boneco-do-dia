import { InsertFunFactSchema, insertFunFact } from "@gebra/database";
import { protectedProcedure } from "../../../orpc/procedures";

const createFunFactSchema = InsertFunFactSchema.omit({
	userId: true,
});

export const createFunFactProcedure = protectedProcedure
	.route({
		method: "POST",
		path: "/fun-fact",
		tags: ["fun-fact"],
		summary: "Create a new fun fact",
		description: "Create a new fun fact",
	})
	.input(createFunFactSchema)
	.handler(async ({ input, context: { user } }) => {
		const funFact = await insertFunFact({
			...input,
			userId: user.id,
		});
		return funFact;
	});
