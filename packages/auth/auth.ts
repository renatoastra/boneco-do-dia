import { db } from "@gebra/database";
import { logger } from "@gebra/logs";
import { getBaseUrl } from "@gebra/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI } from "better-auth/plugins";

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
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
			},
		},
	},
	plugins: [admin(), openAPI()],
	onAPIError: {
		onError(error, ctx) {
			logger.error(error, { ctx });
		},
	},
});

export type Session = typeof auth.$Infer.Session;
