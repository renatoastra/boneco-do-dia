"use client";

import { SessionProvider } from "@auth/components/SessionProvider";
import { ProgressProvider } from "@bprogress/next/app";
import { ApiClientProvider } from "@shared/components/ApiClientProvider";
import { Toaster } from "@ui/components/toast";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export function ClientProviders({ children }: PropsWithChildren) {
	return (
		<ApiClientProvider>
			<ProgressProvider
				height="4px"
				color="var(--color-primary)"
				options={{ showSpinner: false }}
				shallowRouting
				delay={250}
			>
				<ThemeProvider
					attribute="class"
					disableTransitionOnChange
					enableSystem
					defaultTheme="system"
					themes={["light", "dark", "system"]}
				>
					<Toaster position="top-right" />
					<SessionProvider>{children}</SessionProvider>
				</ThemeProvider>
			</ProgressProvider>
		</ApiClientProvider>
	);
}
