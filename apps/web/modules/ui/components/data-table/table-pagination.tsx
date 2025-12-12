"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@ui/components/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import { cn } from "@ui/lib";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";

export interface TablePaginationProps<TData> {
	table: Table<TData>;
	/**
	 * Show page size selector
	 */
	showPageSizeSelector?: boolean;
	/**
	 * Available page sizes
	 */
	pageSizeOptions?: number[];
	/**
	 * Custom className
	 */
	className?: string;
}

export function TablePagination<TData>({
	table,
	showPageSizeSelector = true,
	pageSizeOptions = [10, 20, 30],
	className,
}: TablePaginationProps<TData>) {
	const pageCount = table.getPageCount();
	const pageIndex = table.getState().pagination.pageIndex;
	const pageSize = table.getState().pagination.pageSize;
	const totalRows = table.getRowCount();

	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();

	if ((pageCount <= 1 && !showPageSizeSelector) || totalRows === 0) {
		return null;
	}

	const startRow = pageIndex * pageSize + 1;
	const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

	return (
		<div
			className={cn(
				"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			{showPageSizeSelector && (
				<div className="flex items-center gap-2">
					<span className="text-foreground/60 text-sm">
						Rows per page:
					</span>
					<Select
						value={pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{pageSizeOptions.map((size) => (
								<SelectItem key={size} value={size.toString()}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}

			<div className="flex items-center gap-2">
				<span className="text-foreground/60 text-sm">
					{totalRows > 0 ? (
						<>
							{startRow}-{endRow} of {totalRows}
						</>
					) : (
						"0 results"
					)}
				</span>
			</div>

			{pageCount > 1 && (
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => table.firstPage()}
						disabled={!canPreviousPage}
						className="h-8 w-8"
						aria-label="Go to first page"
					>
						<ChevronsLeftIcon className="size-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => table.previousPage()}
						disabled={!canPreviousPage}
						className="h-8 w-8"
						aria-label="Go to previous page"
					>
						<ChevronLeftIcon className="size-4" />
					</Button>
					<span className="flex items-center gap-1 text-foreground/60 text-sm">
						Page
						<strong>
							{pageIndex + 1} of {pageCount}
						</strong>
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={!canNextPage}
						className="h-8 w-8"
						aria-label="Go to next page"
					>
						<ChevronRightIcon className="size-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => table.lastPage()}
						disabled={!canNextPage}
						className="h-8 w-8"
						aria-label="Go to last page"
					>
						<ChevronsRightIcon className="size-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
