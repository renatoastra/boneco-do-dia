"use client";

import { Logo } from "@shared/components/Logo";
import { UserMenu } from "@shared/components/UserMenu";
import { cn } from "@ui/lib";
import { BellIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [{ label: "Notifications", href: "/", icon: BellIcon }];

export function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();
	const isActive = (href: string) => {
		return pathname.startsWith(href);
	};
	return (
		<nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="text-xl font-bold text-primary"
						>
							<Logo />
						</Link>
					</div>

					<div className="hidden md:flex md:space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer",
									isActive(link.href)
										? "text-primary"
										: "opacity-50",
								)}
							>
								<link.icon className="size-4 shrink-0 transition-colors" />
								{link.label}
							</Link>
						))}
					</div>

					<div className="flex items-center space-x-4">
						<UserMenu />

						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>

				{isOpen && (
					<div className="md:hidden border-t border-border bg-card">
						<div className="space-y-1 px-2 py-4">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="block rounded-md px-3 py-2 text-foreground hover:bg-muted transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
