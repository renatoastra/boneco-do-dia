"use client";
import { useDeleteNotificationMutation } from "@notification/hooks/delete-notification-mutation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@ui/components/alert-dialog";
import { buttonVariants } from "@ui/components/button";
import { toast } from "sonner";

export const DeleteNotificationAlertModal = ({
	notificationId,
	isOpen,
	onClose,
}: {
	notificationId: string;
	isOpen: boolean;
	onClose: () => void;
}) => {
	const { mutate: deleteNotificationMutation, isPending } =
		useDeleteNotificationMutation();

	const handleDelete = () => {
		deleteNotificationMutation(notificationId, {
			onSuccess: () => {
				onClose();
			},
			onError: () => {
				toast.error("Failed to delete notification", {
					description: "Please try again later",
				});
			},
		});
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Notification</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Are you sure you want to delete this notification?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: "destructive" })}
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
