import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import axios from 'axios';

const Table = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data'); // Replace with your API endpoint
                const sortedData = response.data.sort((a, b) => b.activityId - a.activityId); // Newest on top
                setTableData(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "ACTIVITY ID",
                accessor: "activityId",
            },
            {
                Header: "NAME",
                accessor: "name",
            },
            {
                Header: "REPORT STATUS",
                accessor: "reportStatus",
            },
            {
                Header: "AVENUE MAIN",
                accessor: "avenueMain",
            },
            {
                Header: "AVENUE OPTIONAL",
                accessor: "avenueOption",
            },
            {
                Header: "FACULTY NAME",
                accessor: "facultyName",
            },
            {
                Header: "ACTIONS",
                accessor: "Actions",
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: tableData,
            initialState: { pageIndex: 0, pageSize: 15 }, // 15 rows per page
        },
        useSortBy, // Sorting functionality
        usePagination // Pagination functionality
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table">
            {tableData.length === 0 ? (
                <div className="text-center py-4">No data available</div> // Show this if no data
            ) : (
                <>
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            key={column.id}
                                        >
                                            {column.render("Header")}
                                            {/* Add sort indicator */}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.id}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()} key={cell.column.id}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination flex justify-between items-center mt-4">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                        >
                            Previous
                        </button>
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>
                        </span>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                            onClick={nextPage}
                            disabled={!canNextPage}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;
