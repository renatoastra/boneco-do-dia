import { auth } from "@gebra/auth";
import { logger } from "@gebra/logs";
import { getBaseUrl } from "@gebra/utils";
import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { mergeOpenApiSchemas } from "./lib/openapi-schema";
import { openApiHandler, rpcHandler } from "./orpc/handler";
import { router } from "./orpc/router";

export const app = new Hono()
	.basePath("/api")
	// Logger middleware
	.use(honoLogger((message, ...rest) => logger.log(message, ...rest)))
	// Cors middleware
	.use(
		cors({
			origin: getBaseUrl(),
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["POST", "GET", "OPTIONS"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		}),
	)
	// Auth handler
	.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
	// OpenAPI schema endpoint
	.get("/openapi", async (c) => {
		const authSchema = await auth.api.generateOpenAPISchema();

		const apiUrl = `${getBaseUrl()}/api`;
		const appSchema = await new OpenAPIGenerator({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}).generate(router, {
			info: {
				title: "Gebra API",
				version: "1.0.0",
			},
			servers: [
				{
					url: apiUrl,
					description: "API server",
				},
			],
		});

		const mergedSchema = mergeOpenApiSchemas({
			authSchema: authSchema as any,
			appSchema: appSchema as any,
		});

		return c.json(mergedSchema);
	})
	.get("/orpc-openapi", async (c) => {
		try {
			const appSchema = await new OpenAPIGenerator({
				schemaConverters: [new ZodToJsonSchemaConverter()],
			}).generate(router, {
				info: {
					title: "Gebra API",
					version: "1.0.0",
				},
			});

			return c.json(appSchema);
		} catch (error) {
			logger.error(error);
			return c.json({ error: "Failed to generate OpenAPI schema" }, 500);
		}
	})
	// Scalar API reference based on OpenAPI schema
	.get(
		"/docs",
		Scalar({
			theme: "saturn",
			url: "/api/openapi",
		}),
	)
	// Health check
	.get("/health", (c) => c.text("OK"))
	// oRPC handlers (for RPC and OpenAPI)
	.use("*", async (c, next) => {
		const context = {
			headers: c.req.raw.headers,
		};

		const isRpc = c.req.path.includes("/rpc/");

		const handler = isRpc ? rpcHandler : openApiHandler;

		const prefix = isRpc ? "/api/rpc" : "/api";

		const path = c.req.path;
		console.log({
			path,
		});

		const { matched, response } = await handler.handle(c.req.raw, {
			prefix,
			context,
		});

		if (matched) {
			return c.newResponse(response.body, response);
		}

		await next();
	});
