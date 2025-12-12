import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../client";
import { funFactTable } from "../schema";
import type { FunFactUpdateSchema, InsertFunFactSchema } from "../zod";

export async function getFunFactsList({ userId }: { userId: string }) {
	return await db.query.funFactTable.findMany({
		where: (funFact, { eq }) => eq(funFact.userId, userId),
		orderBy: (funFact, { desc }) => desc(funFact.createdAt),
	});
}

export async function insertFunFact(
	funFact: z.infer<typeof InsertFunFactSchema>,
) {
	return await db.insert(funFactTable).values(funFact).returning({
		id: funFactTable.id,
	});
}

export async function getFunFactById(id: string) {
	return await db.query.funFactTable.findFirst({
		where: (funFact, { eq }) => eq(funFact.id, id),
	});
}

export async function getFunFactsByUserId(userId: string) {
	return await db.query.funFactTable.findMany({
		where: (funFact, { eq }) => eq(funFact.userId, userId),
		orderBy: (funFact, { desc }) => desc(funFact.createdAt),
	});
}

export async function updateFunFact(
	funFact: z.infer<typeof FunFactUpdateSchema>,
) {
	return await db
		.update(funFactTable)
		.set(funFact)
		.where(eq(funFactTable.id, funFact.id))
		.returning({
			id: funFactTable.id,
		});
}

export async function deleteFunFact(id: string) {
	return await db
		.update(funFactTable)
		.set({ isActive: false })
		.where(eq(funFactTable.id, id));
}
