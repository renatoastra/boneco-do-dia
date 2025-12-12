"use client";

import { LoginForm } from "@auth/components/LoginForm";
import { useLoginMutation } from "@auth/hooks/use-login-mutation";
import { useSession } from "@auth/hooks/use-session";
import { LoginSchema, type LoginSchemaType } from "@auth/lib/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@shared/constants/routes";
import { Button } from "@ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function LoginCard() {
	const { loaded: sessionLoaded, user } = useSession();
	const { loginMutation, isPending } = useLoginMutation();
	const router = useRouter();
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		disabled: isPending,
	});

	useEffect(() => {
		if (sessionLoaded && user) {
			router.replace(ROUTES.HOME);
		}
	}, [user, sessionLoaded]);

	const onSubmit = (data: LoginSchemaType) => {
		loginMutation(data);
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
				<Link
					href={ROUTES.SIGNUP}
					className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
				>
					Don't have an account? Sign Up
				</Link>
			</CardHeader>
			<CardContent>
				<LoginForm form={form} onSubmit={onSubmit} />
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						form.handleSubmit(onSubmit)();
					}}
					form="login-form"
					className="w-full"
				>
					Login
				</Button>
			</CardFooter>
		</Card>
	);
}
