import { ClientProviders } from "@shared/components/ClientProviders";
import { cn } from "@ui/lib";
import { Geist } from "next/font/google";
import Head from "next/head";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

const sansFont = Geist({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-sans",
});

export async function Document({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning className={sansFont.className}>
			<Head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
			</Head>
			<body
				className={cn(
					"min-h-screen bg-background text-foreground antialiased",
				)}
			>
				<NuqsAdapter>
					<ClientProviders>{children}</ClientProviders>
				</NuqsAdapter>
			</body>
		</html>
	);
}
