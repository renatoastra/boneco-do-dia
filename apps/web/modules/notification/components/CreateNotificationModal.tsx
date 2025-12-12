"use client";

import { CreateNotificationForm } from "@notification/components/CreateNotificationForm";
import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { CirclePlus } from "lucide-react";
import { useCallback } from "react";

interface CreateNotificationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}
export const CreateNotificationModal = ({
	open,
	onOpenChange,
}: CreateNotificationModalProps) => {
	const handleSuccess = useCallback(() => {
		onOpenChange(false);
	}, [onOpenChange]);
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button>
					New notification
					<CirclePlus className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent onInteractOutside={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Create Notification</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Create a new notification to send to your users
				</DialogDescription>
				<CreateNotificationForm onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	);
};
