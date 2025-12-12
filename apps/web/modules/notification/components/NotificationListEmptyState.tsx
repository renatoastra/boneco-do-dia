import { FolderSearch } from "lucide-react";

export const NotificationListEmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<FolderSearch className="size-10 text-muted-foreground" />
			<p className="text-sm text-muted-foreground">
				No notifications found
			</p>
		</div>
	);
};
