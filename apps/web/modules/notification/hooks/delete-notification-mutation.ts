"use client";
import { useSession } from "@auth/hooks/use-session";
import { useInvalidateNotificationQuery } from "@notification/hooks/invalidate-notification-query";
import { orpcClient } from "@shared/lib/orpc-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteNotificationMutation = () => {
	const { user } = useSession();
	const { invalidateNotificationQuery } = useInvalidateNotificationQuery();
	return useMutation({
		mutationFn: async (notificationId: string) => {
			const response = await orpcClient.notifications.deleteNotification({
				id: notificationId,
				userId: user?.id ?? "",
			});
			return response;
		},
		onSuccess: () => {
			toast.info("Notification deleted successfully");
			invalidateNotificationQuery();
		},
	});
};
