import type { ApiRouterClient } from "@gebra/api/orpc/router";

export type ListNotificationInput = Parameters<
	ApiRouterClient["notifications"]["listNotifications"]
>[0];

export type ListNotificationOutput = Awaited<
	ReturnType<ApiRouterClient["notifications"]["listNotifications"]>
>;

export type Notification = Pick<
	ListNotificationOutput["items"][number],
	"title" | "message" | "createdAt" | "isRead" | "id"
>;
