import {
	type ColumnDef,
	getCoreRowModel,
	type TableOptions,
	useReactTable,
} from "@tanstack/react-table";

type TableProps<TData extends ColumnDef<TData>> = Pick<
	TableOptions<TData>,
	| "data"
	| "columns"
	| "state"
	| "onPaginationChange"
	| "onSortingChange"
	| "onColumnFiltersChange"
	| "enableSorting"
>;

interface UseCreateTableProps<TData extends ColumnDef<TData>>
	extends TableProps<TData> {
	totalItems?: number;
}

const DEFAULT_PAGE_SIZE = 10;
const useCreateTable = <TData extends ColumnDef<TData>>(
	props: UseCreateTableProps<TData>,
) => {
	return useReactTable({
		...props,
		manualPagination: true,
		manualFiltering: true,
		enableSorting: props.enableSorting ?? false,
		manualSorting: true,
		pageCount: Math.ceil(
			(props.totalItems ?? 0) /
				(props.state?.pagination?.pageSize ?? DEFAULT_PAGE_SIZE),
		),
		getCoreRowModel: getCoreRowModel(),
		rowCount: props.totalItems ?? 0,
	});
};

export { useCreateTable };
