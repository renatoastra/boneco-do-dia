"use client";

import { useSignupMutation } from "@auth/hooks/use-signup-mutation";
import { SignupSchema, type SignupSchemaType } from "@auth/lib/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignupForm() {
	const { signupMutation, isPending } = useSignupMutation();
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		disabled: isPending,
	});

	const onSubmit = (data: SignupSchemaType) => {
		signupMutation(data);
	};

	return (
		<Form {...form}>
			<form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} type="text" placeholder="Your name" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} type="email" placeholder="m@example.com" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											placeholder="********"
											type={showPassword ? "text" : "password"}
											className="pr-10"
											{...field}
											autoComplete="new-password"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary text-xl"
										>
											{showPassword ? (
												<EyeOffIcon className="size-4" />
											) : (
												<EyeIcon className="size-4" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}
