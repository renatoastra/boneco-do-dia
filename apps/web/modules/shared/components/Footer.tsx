import { cn } from "@ui/lib";

export function Footer() {
	return (
		<footer
			className={cn(
				"container max-w-6xl py-6 text-center text-foreground/60 text-xs",
			)}
		>
			<span>
				Feito com dedicação para a Confi por Renato "astra" Costa
			</span>
		</footer>
	);
}
