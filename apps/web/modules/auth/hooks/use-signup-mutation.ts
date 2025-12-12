"use client";

import { authClient } from "@gebra/auth/client";
import { ROUTES } from "@shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import type { SignupSchemaType } from "../lib/signup.schema";

export const useSignupMutation = () => {
	const router = useRouter();
	const pushWithDelay = useCallback(
		(path: string) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					router.push(path);
					resolve(true);
				}, 1000);
			});
		},
		[router],
	);
	const { mutate: signupMutation, isPending } = useMutation({
		mutationFn: async (data: SignupSchemaType) => {
			const response = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			});

			return response.data;
		},
		onSuccess: async () => {
			toast.success("Account created successfully");
			toast.promise(pushWithDelay(ROUTES.LOGIN), {
				loading: "Redirecting to login...",
				success: "Redirecting to login...",
				error: "Failed to redirect to login",
			});
		},
	});

	return {
		signupMutation,
		isPending,
	};
};
