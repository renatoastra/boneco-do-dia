"use client";

import type { PaginationState, Updater } from "@tanstack/react-table";
import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs";
import * as React from "react";

export const useFilterPagination = () => {
	const [pagination, setPagination] = useQueryStates(
		{
			pageIndex: parseAsIndex.withDefault(0),
			pageSize: parseAsInteger.withDefault(10),
		},
		{
			urlKeys: {
				pageIndex: "page",
				pageSize: "perPage",
			},
		},
	);

	const onPaginationChange = React.useCallback(
		(updaterOrValue: Updater<PaginationState>) => {
			if (typeof updaterOrValue === "function") {
				const newPagination = updaterOrValue(pagination);
				setPagination({
					pageIndex: newPagination.pageIndex,
					pageSize: newPagination.pageSize,
				});
			} else {
				setPagination({
					pageIndex: updaterOrValue.pageIndex,
					pageSize: updaterOrValue.pageSize,
				});
			}
		},
		[pagination, setPagination],
	);

	return {
		onPaginationChange,
		pagination,
	};
};
