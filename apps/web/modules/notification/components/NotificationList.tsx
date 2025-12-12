"use client";
import { NotificationListActions } from "@notification/components/NotificationListActions";
import { notificationStatusMapper } from "@notification/lib/notification-status.mapper";
import { useFilterPagination } from "@shared/hooks/use-filter-pagination";
import type { Notification } from "@shared/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@ui/components/badge";
import { DataTable } from "@ui/components/data-table";
import { useCreateTable } from "@ui/components/data-table/hooks/use-create-table";
import { formatDate } from "date-fns";
import { useMemo } from "react";
import { useListNotificationQuery } from "../hooks/list-notification-query";
import { NotificationListEmptyState } from "./NotificationListEmptyState";

export const NotificationList = () => {
	const { pagination, onPaginationChange } = useFilterPagination();
	const { data: notifications, isLoading } = useListNotificationQuery({
		limit: pagination.pageSize,
		offset: pagination.pageIndex * pagination.pageSize,
	});

	const columns = useMemo<ColumnDef<Notification>[]>(
		() => [
			{
				header: "Title",
				accessorKey: "title",
			},
			{
				header: "Message",
				accessorKey: "message",
			},
			{
				header: "Status",
				accessorKey: "isRead",
				cell: ({ row }) => {
					return (
						<Badge
							status={row.original.isRead ? "success" : "error"}
						>
							{
								notificationStatusMapper[
									row.original.isRead ? "read" : "unread"
								]
							}
						</Badge>
					);
				},
			},
			{
				header: "Sent At",
				accessorKey: "createdAt",
				cell: ({ row }) => {
					return (
						<span>
							{formatDate(
								row.original.createdAt,
								"dd/MM/yyyy HH:mm",
							)}
						</span>
					);
				},
			},
			{
				header: "Actions",
				accessorKey: "actions",
				cell: ({ row }) => {
					return (
						<NotificationListActions
							isRead={row.original.isRead}
							notificationId={row.original.id}
						/>
					);
				},
			},
		],
		[],
	);

	const table = useCreateTable({
		data: notifications?.items ?? [],
		columns: columns,
		totalItems: notifications?.total ?? 0,
		onPaginationChange,
		state: { pagination },
	});

	return (
		<div>
			<DataTable.Root
				table={table}
				isLoading={isLoading}
				emptyMessage={<NotificationListEmptyState />}
			>
				<DataTable.Header />
				<DataTable.Body />
				<DataTable.Pagination />
			</DataTable.Root>
		</div>
	);
};
