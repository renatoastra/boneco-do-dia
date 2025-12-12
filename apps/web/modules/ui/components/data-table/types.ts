import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface DataTableProps<TData> {
	/**
	 * Table instance from useReactTable
	 */
	table: Table<TData>;
	/**
	 * Whether the table is in a loading state
	 */
	isLoading?: boolean;
	/**
	 * Custom empty state message
	 */
	emptyMessage?: ReactNode;
	/**
	 * Custom loading message
	 */
	loadingMessage?: string;
	/**
	 * Children components
	 */
	children?: ReactNode;
	/**
	 * Custom className for the root container
	 */
	className?: string;
}

export interface DataTableSearchProps {
	/**
	 * Placeholder text for the search input
	 */
	placeholder?: string;
	/**
	 * Debounce delay in milliseconds
	 */
	debounceMs?: number;
	/**
	 * Custom className
	 */
	className?: string;
}

export interface DataTablePaginationProps {
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

export interface DataTableContextValue<TData> {
	table: Table<TData>;
	isLoading?: boolean;
	emptyMessage?: ReactNode;
	loadingMessage?: string;
}
