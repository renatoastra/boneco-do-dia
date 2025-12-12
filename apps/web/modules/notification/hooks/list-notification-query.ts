import { orpcClient } from "@shared/lib/orpc-client";
import type { ListNotificationInput } from "@shared/lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const listNotificationQueryKey = (pagination: ListNotificationInput) =>
	["notifications", pagination] as const;

export const useListNotificationQuery = (pagination: ListNotificationInput) => {
	const { data, isLoading, error } = useQuery({
		queryKey: listNotificationQueryKey(pagination),
		queryFn: () => orpcClient.notifications.listNotifications(pagination),
		placeholderData: keepPreviousData,
	});
	return { data, isLoading, error };
};
