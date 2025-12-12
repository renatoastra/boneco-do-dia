"use client";

export function PageHeader({
	title,
	subtitle,
	action,
}: {
	title: string;
	subtitle?: string;
	action?: React.ReactNode;
}) {
	return (
		<div className="mb-8">
			<h2 className="font-bold text-2xl lg:text-3xl">{title}</h2>
			<div className="flex items-center justify-between">
				<p className="mt-1 opacity-60">{subtitle}</p>
				{action && (
					<div className="flex items-center gap-2">{action}</div>
				)}
			</div>
		</div>
	);
}
