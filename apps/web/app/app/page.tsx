"use client";
import { CreateNotificationModal } from "@notification/components/CreateNotificationModal";
import { NotificationList } from "@notification/components/NotificationList";
import { PageHeader } from "@shared/components/PageHeader";
import { useState } from "react";

export default function Home() {
	const [open, setOpen] = useState(false);
	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	return (
		<>
			<PageHeader
				title="Notifications"
				subtitle="Manage your notifications"
				action={
					<CreateNotificationModal
						open={open}
						onOpenChange={handleOpenChange}
					/>
				}
			/>
			<NotificationList />
		</>
	);
}
