import type { Metadata } from "next";
import "./globals.css";
import { Document } from "@shared/components/Document";

export const metadata: Metadata = {
	title: "NotiSync",
	description: "NotiSync is a platform for managing your notifications.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Document>{children}</Document>;
}
