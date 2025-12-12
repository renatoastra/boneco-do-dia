import type { CreateNotificationInput } from "@gebra/api/modules/notifications/types";
import { useInvalidateNotificationQuery } from "@notification/hooks/invalidate-notification-query";
import { orpcClient } from "@shared/lib/orpc-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCreateNotificationMutationProps {
	onSuccess?: () => void;
}
export const useCreateNotificationMutation = ({
	onSuccess,
}: UseCreateNotificationMutationProps) => {
	const { invalidateNotificationQuery } = useInvalidateNotificationQuery();
	return useMutation({
		mutationFn: async (data: CreateNotificationInput) => {
			const response = await orpcClient.notifications.createNotification(data);
			return response;
		},
		onSuccess: () => {
			toast.success("Notification created successfully");
			invalidateNotificationQuery();
			onSuccess?.();
		},
	});
};
