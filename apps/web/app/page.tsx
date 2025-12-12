import { authClient } from "@gebra/auth/client";
import { ROUTES } from "@shared/constants/routes";
import { redirect } from "next/navigation";

export default async function Home() {
	const { data: session } = await authClient.getSession();

	if (session) {
		return redirect(ROUTES.HOME);
	}

	return redirect(ROUTES.LOGIN);
}
