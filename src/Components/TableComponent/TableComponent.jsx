import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "../TableComponent/TableComponent.module.css";
import Table from "./DataTable";
// import ReactDatatable from "react-data-table-component";

function TableComponent() {
  const [data, setData] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  const users = useSelector((state) => state.employees);

  useEffect(() => {
    setData(users);
  }, [users]);

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Date of Birth",
      accessor: "dateOfBirth",
    },
    {
      Header: "Street",
      accessor: "street",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Zip Code",
      accessor: "zipCode",
    },
  ];

  const Search = (rows) => {
    const rowData = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      rowData.some((data) =>
        row[data]
          ? row[data].toString().toLowerCase().indexOf(searchValue) > -1
          : ""
      )
    );
  };

  return (
    <>
      <div>
        <div id="employee-div" className={styles.employeesContainer}>
          <h1>Current Employees</h1>
          <Table
            data={Search(data)}
            columns={columns}
            searchValue={searchValue}
            setsearchValue={setsearchValue}
          />
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </>
  );
}

export default TableComponent;
