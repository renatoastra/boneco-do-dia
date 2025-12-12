import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNotificationMutation } from "@notification/hooks/create-notification-mutation";
import {
	type CreateNotificationFormValues,
	CreateNotificationSchema,
} from "@notification/lib/notification.schema";
import { Button } from "@ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { Textarea } from "@ui/components/text-area";
import { useForm } from "react-hook-form";

interface CreateNotificationFormProps {
	onSuccess: () => void;
}
export const CreateNotificationForm = ({
	onSuccess,
}: CreateNotificationFormProps) => {
	const form = useForm<CreateNotificationFormValues>({
		resolver: zodResolver(CreateNotificationSchema),
		defaultValues: {
			title: "",
			message: "",
		},
	});

	const { mutateAsync: createNotification } = useCreateNotificationMutation({
		onSuccess: () => {
			form.reset();
			onSuccess?.();
		},
	});

	const onSubmit = async (data: CreateNotificationFormValues) => {
		await createNotification(data);
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create</Button>
			</form>
		</Form>
	);
};
