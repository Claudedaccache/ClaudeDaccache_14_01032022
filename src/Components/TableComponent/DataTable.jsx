import React, { useEffect } from "react";
import styles from "../TableComponent/TableComponent.module.css";
import { useTable, usePagination, useSortBy } from "react-table";

function Table({ columns, data, searchValue, setsearchValue }) {
  const {
    page,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    /**
     * It changes the color of the rows to alternate colors.
     */
    const alternateRows = () => {
      let rows = document.getElementsByTagName("tr");
      for (let i = 0; i < rows.length; i++) {
        if (i % 2 === 0) {
          rows[i].className = `${styles.even}`;
        } else {
          rows[i].className = `${styles.odd}`;
        }
      }
    };
    alternateRows();
  }, [data]);

  return (
    <>
      <div className={styles.allTable}>
        <div className={styles.tableUpperPart}>
          <div className={styles.NbOfItemsDisplayed}>
            <p>Show</p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <p>entries</p>
          </div>
          <div className={styles.searchInput}>
            <label htmlFor="Search">Search:</label>
            <input
              type="text"
              id="Search"
              name="Search"
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
            />
          </div>
        </div>
        <div>
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className={styles.sortingContainer}>
                        <span> {column.render("Header")}</span>
                        <span className={styles.IconsContainer}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <span className={styles.sortingIcons}>{"???"}</span>
                            ) : (
                              <span className={styles.sortingIcons}>{"???"}</span>
                            )
                          ) : (
                            <div className={styles.sortingIconsContainer}>
                              <span
                                className={`${styles.sortingIcons} ${styles.downIcons}`}
                              >
                                {["???"]}
                              </span>
                              <span className={styles.sortingIcons}>
                                {["???"]}
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className={styles.rowItems}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={`pagination ${styles.LowerTable}`}>
            <span>
              Showing{" "}
              {data.length
                ? ` 1 to ${pageSize >= data.length ? data.length : pageSize}`
                : 0}{" "}
              of {data ? data.length : 0} entries
            </span>
            <div className={styles.directions}>
              <button
                className={styles.PrevBtn}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"Previous"}
              </button>
              {data.length
                ? pageOptions.map((itm) => (
                    <button
                      key={itm}
                      className={styles.pagesNbr}
                      onClick={() => gotoPage(itm)}
                    >
                      {itm + 1}
                    </button>
                  ))
                : ""}
              <button
                className={styles.NextBtn}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {"Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
