"use client";

import { DeleteNotificationAlertModal } from "@notification/components/DeleteNotificationAlertModa";
import { useMarkNotificationAsReadMutation } from "@notification/hooks/mark-notification-as-read-mutation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { cn } from "@ui/lib";
import { CheckCircle, EyeIcon, MoreVerticalIcon, Trash } from "lucide-react";
import { useState } from "react";

export const NotificationListActions = ({
	notificationId,
	isRead,
}: {
	notificationId: string;
	isRead: boolean;
}) => {
	const [isDeleteNotificationModalOpen, setIsDeleteNotificationModalOpen] =
		useState(false);
	const {
		mutate: markNotificationAsReadMutation,
		isPending: isMarkingNotificationAsRead,
	} = useMarkNotificationAsReadMutation();
	const handleMarkNotificationAsRead = () => {
		markNotificationAsReadMutation(notificationId);
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreVerticalIcon className="size-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() => setIsDeleteNotificationModalOpen(true)}
					>
						<Trash className="size-3 mr-2" />
						Delete
					</DropdownMenuItem>
					<DropdownMenuItem
						className={cn(
							isRead && "opacity-50 cursor-not-allowed",
						)}
						disabled={isMarkingNotificationAsRead || isRead}
						onClick={handleMarkNotificationAsRead}
					>
						{isRead ? (
							<>
								<CheckCircle className="size-3 mr-2" />
								Notification already read
							</>
						) : (
							<>
								<EyeIcon className="size-3 mr-2" />
								Mark as read
							</>
						)}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteNotificationAlertModal
				notificationId={notificationId}
				isOpen={isDeleteNotificationModalOpen}
				onClose={() => setIsDeleteNotificationModalOpen(false)}
			/>
		</>
	);
};
