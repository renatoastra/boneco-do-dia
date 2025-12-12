"use client";

import { Spinner } from "@shared/components/Spinner";
import { flexRender, type Table } from "@tanstack/react-table";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import { cn } from "@ui/lib";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { TablePagination } from "./table-pagination";
import type {
	DataTableContextValue,
	DataTablePaginationProps,
	DataTableProps,
	DataTableSearchProps,
} from "./types";

const DataTableContext = createContext<DataTableContextValue<unknown> | null>(
	null,
);

function useDataTableContext<TData>() {
	const context = useContext(DataTableContext);
	if (!context) {
		throw new Error(
			"DataTable components must be used within DataTable.Root",
		);
	}
	return context as DataTableContextValue<TData>;
}

function DataTableRoot<TData>({
	table,
	isLoading = false,
	emptyMessage = "No results.",
	loadingMessage = "Loading...",
	children,
	className,
}: DataTableProps<TData>) {
	return (
		<DataTableContext.Provider
			value={{
				table: table as Table<unknown>,
				isLoading,
				emptyMessage: emptyMessage ?? "No results.",
				loadingMessage,
			}}
		>
			<div className={cn("space-y-4", className)}>{children}</div>
		</DataTableContext.Provider>
	);
}

function DataTableHeader<TData>() {
	const { table } = useDataTableContext<TData>();
	const enableSorting = table.options.enableSorting ?? true;

	return (
		<div className="overflow-hidden rounded-sm border">
			<div className="w-full overflow-auto">
				<table className="w-full caption-bottom text-sm table-fixed">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const canSort = header.column.getCanSort();
									const sortDirection =
										header.column.getIsSorted();

									return (
										<TableHead
											key={header.id}
											style={{
												width:
													header.getSize() !== 150
														? header.getSize()
														: undefined,
											}}
											className={cn(
												canSort &&
													enableSorting &&
													"cursor-pointer select-none",
											)}
											onClick={
												canSort && enableSorting
													? header.column.getToggleSortingHandler()
													: undefined
											}
										>
											<div className="flex items-center gap-2">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext(),
														)}
												{canSort && enableSorting && (
													<span className="flex size-4 items-center justify-center">
														{sortDirection ===
														"asc" ? (
															<ArrowUpIcon className="size-4" />
														) : sortDirection ===
															"desc" ? (
															<ArrowDownIcon className="size-4" />
														) : (
															<ArrowUpDownIcon className="size-4 opacity-50" />
														)}
													</span>
												)}
											</div>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
				</table>
			</div>
		</div>
	);
}

function DataTableBody<TData>() {
	const { table, isLoading, emptyMessage, loadingMessage } =
		useDataTableContext<TData>();

	const rows = table.getRowModel().rows;
	const columns = table.getAllColumns();

	return (
		<div className="rounded-md border">
			<div className="w-full overflow-auto">
				<table className="w-full caption-bottom text-sm table-fixed">
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex h-full items-center justify-center">
										<Spinner className="mr-2 size-4 text-primary" />
										{loadingMessage}
									</div>
								</TableCell>
							</TableRow>
						) : rows.length ? (
							rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
									className="group"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{
												width:
													cell.column.getSize() !==
													150
														? cell.column.getSize()
														: undefined,
											}}
											className="group-first:rounded-t-md group-last:rounded-b-md"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</table>
			</div>
		</div>
	);
}

function DataTablePagination({
	showPageSizeSelector = true,
	className,
}: DataTablePaginationProps) {
	const { table } = useDataTableContext();
	return (
		<TablePagination
			table={table}
			showPageSizeSelector={showPageSizeSelector}
			className={className}
		/>
	);
}

function DataTableFilters({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
	);
}

export const DataTable = {
	Root: DataTableRoot,
	Header: DataTableHeader,
	Body: DataTableBody,
	Pagination: DataTablePagination,
	Filters: DataTableFilters,
};

export type { DataTableProps, DataTableSearchProps, DataTablePaginationProps };
