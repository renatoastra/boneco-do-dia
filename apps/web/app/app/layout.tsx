import { getSession } from "@auth/lib/server";
import { NavBar } from "@shared/components/NavBar";
import { ROUTES } from "@shared/constants/routes";
import { redirect } from "next/navigation";

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	if (!session) {
		return redirect(ROUTES.LOGIN);
	}

	return (
		<>
			<NavBar />
			<div className="container mx-auto my-10">{children}</div>
		</>
	);
}
