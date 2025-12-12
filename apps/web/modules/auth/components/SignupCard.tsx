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
import { SignupForm } from "./SignupForm";

export function SignupCard() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Sign up to your account</CardTitle>
				<CardDescription>
					Enter your email below to sign up to your account
				</CardDescription>
				<Link
					href={ROUTES.LOGIN}
					className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
				>
					Already have an account? Login
				</Link>
			</CardHeader>
			<CardContent>
				<SignupForm />
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="submit" form="login-form" className="w-full">
					Register
				</Button>
			</CardFooter>
		</Card>
	);
}
