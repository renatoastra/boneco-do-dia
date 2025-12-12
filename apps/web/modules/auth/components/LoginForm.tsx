"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import type { UseFormReturn } from "react-hook-form";
import type { LoginSchemaType } from "../lib/login.schema";

interface LoginFormProps {
	form: UseFormReturn<LoginSchemaType>;
	onSubmit: (data: LoginSchemaType) => void;
}
export function LoginForm({ form, onSubmit }: LoginFormProps) {
	return (
		<Form {...form}>
			<form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="m@example.com"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="grid gap-2">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="Password"
									/>
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
