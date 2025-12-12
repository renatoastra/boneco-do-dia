"use client";
import { useFilterPagination } from "@shared/hooks/use-filter-pagination";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { listNotificationQueryKey } from "./list-notification-query";

export const useInvalidateNotificationQuery = () => {
	const queryClient = useQueryClient();
	const { pagination } = useFilterPagination();
	const invalidateNotificationQuery = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: listNotificationQueryKey({
				limit: pagination.pageSize,
				offset: pagination.pageIndex * pagination.pageSize,
			}),
		});
	}, [queryClient, pagination]);

	return { invalidateNotificationQuery };
};
