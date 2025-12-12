import { db } from "@gebra/database";
import { getBaseUrl } from "@gebra/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const appUrl = getBaseUrl();

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	url: appUrl,
	appName: "Gebra",
	advanced: {
		database: {
			generateId: false,
		},
	},
	session: {
		expiresIn: 1000 * 60 * 60 * 24 * 30, // 30 days
		freshAge: 0,
	},
});
