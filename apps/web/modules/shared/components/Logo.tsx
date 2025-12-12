import { cn } from "@ui/lib";

export function Logo({
	withLabel = true,
	className,
}: {
	className?: string;
	withLabel?: boolean;
}) {
	return (
		<span
			className={cn(
				"flex items-center font-semibold text-primary  leading-none",
				className,
			)}
		>
			{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				aria-label="NotiSync"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M10 9.5a2 2 0 0 0 .011 3" />
				<path d="M14 9.5a2 2 0 0 0 0 3" />
				<path d="M17.5 9h.01" />
				<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
				<path d="M8 17a2 2 0 0 0 8 0" />
			</svg>
			{withLabel && (
				<span className="ml-3 hidden text-base font-mono md:block">
					NotiSync
				</span>
			)}
		</span>
	);
}
