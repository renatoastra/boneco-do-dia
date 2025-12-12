"use client";

import { useSession } from "@auth/hooks/use-session";
import { useInvalidateNotificationQuery } from "@notification/hooks/invalidate-notification-query";
import { orpcClient } from "@shared/lib/orpc-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMarkNotificationAsReadMutation = () => {
	const { user } = useSession();
	const { invalidateNotificationQuery } = useInvalidateNotificationQuery();
	return useMutation({
		mutationFn: async (notificationId: string) => {
			const response =
				await orpcClient.notifications.markNotificationAsRead({
					notificationId,
					userId: user?.id ?? "",
				});
			return response;
		},
		onSuccess: () => {
			toast.success("Notification marked as read successfully");
			invalidateNotificationQuery();
		},
	});
};
