import { getSession } from "@auth/lib/server";
import { ROUTES } from "@shared/constants/routes";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	if (session) {
		return redirect(ROUTES.HOME);
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			{children}
		</div>
	);
}
