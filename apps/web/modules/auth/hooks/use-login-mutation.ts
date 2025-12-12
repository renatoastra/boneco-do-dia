"use client";

import { useInvalidateSession } from "@auth/hooks/use-invalidate-session";
import { authClient } from "@gebra/auth/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LoginSchemaType } from "../lib/login.schema";

export const useLoginMutation = () => {
	const { invalidateSession } = useInvalidateSession();
	const { mutate: loginMutation, isPending } = useMutation({
		mutationFn: async (data: LoginSchemaType) => {
			const response = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});

			return response.data;
		},
		onSuccess: () => {
			invalidateSession();
		},
		onError: (error) => {
			toast.error(error.message ?? "Invalid email or password");
		},
	});

	return {
		loginMutation,
		isPending,
	};
};
