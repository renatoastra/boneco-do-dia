import { z } from "zod";

export const CreateNotificationSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	message: z.string().min(1, { message: "Message is required" }),
});

export type CreateNotificationFormValues = z.infer<
	typeof CreateNotificationSchema
>;
