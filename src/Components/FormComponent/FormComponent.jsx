import React, { useState } from "react";
import styles from "../FormComponent/FormComponent.module.css";
import Modal from "../Modal/Modal";
import allStates from "../../Data/StatesData";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../Redux/Employees/AuthActions";
import DatePicker from "../DatePicker/DatePicker";
import department from "../../Data/DepartmentData";
import Dropdown from "../DropDown/DropDown";

function FormComponent() {
  const users = useSelector((state) => state.employees);
  const [StartingDate, setStartingDate] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [States, setStates] = useState("");
  const [Department, setDepartment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ModalText, setModalText] = useState("Employee Created!");
  const [employee, setEmployee] = useState(users);
  const dispatch = useDispatch();

  /**
   * function that handle the value of the inputs on change
   * @param {*} param
   * @returns {object} employee info.
   */

  // const handleChange = ({ currentTarget }) => {
  //   const { name, value } = currentTarget;
  //   setEmployee({ ...employee, [name]: value });
  // };

  /**
   * function that checks if user is already created and included in the users array
   * @param {array} users
   * @returns {boolean} true if user was found and false if not
   */
  const checkUser = (users) => {
    let selectedUser = users.find(
      (user) =>
        user.firstName === employee.firstName &&
        user.lastName === employee.lastName &&
        user.dateOfBirth === employee.dateOfBirth
    );
    return selectedUser ? true : false;
  };

  console.log(States, Department);

  /**
   * function that saves the data in the store and launch the modal
   * @param {e} event
   * @returns {object} user's info
   */
  const saveEmployee = (e) => {
    e.preventDefault();
    if (
      employee.firstName !== undefined &&
      employee.lastName !== undefined &&
      employee.dateOfBirth !== undefined &&
      employee.startDate !== undefined &&
      employee.department !== undefined &&
      employee.street !== undefined &&
      employee.city !== undefined &&
      employee.state !== undefined &&
      employee.zipCode !== undefined &&
      checkUser(users) === false
    ) {
      dispatch(createEmployee(employee));
      setModalText("Employee Created!");
      setOpenModal(true);
    } else if (checkUser(users) === true) {
      setModalText("Employee already created!!");
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h1>HRnet</h1>
        <NavLink to="/CurrentEmployees">View Current Employees</NavLink>
        <h2>Create Employee</h2>
      </div>
      <div className={styles.container}>
        <form
          action="#"
          id="create-employee"
          className={styles.formContainer}
          onSubmit={() => saveEmployee()}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            onChange={(e) =>
              setEmployee({ ...employee, firstName: e.target.value })
            }
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            onChange={(e) =>
              setEmployee({ ...employee, lastName: e.target.value })
            }
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            mainValue={birthDate}
            EditedValue={setbirthDate}
            moreOptions={{ maxDate: new Date().fp_incr(-6570) }}
            // onChange={setEmployee({ ...employee, dateOfBirth: setbirthDate })}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            mainValue={StartingDate}
            EditedValue={setStartingDate}
            // onChange={(e) =>
            //   setEmployee(console.log(e), { ...employee, startDate: e })
            // }
            moreOptions={{
              disable: [
                function (date) {
                  return date.getDay() === 0 || date.getDay() === 6;
                },
              ],
            }}
          />

          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.address}>Address</legend>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              name="street"
              onChange={(e) =>
                setEmployee({ ...employee, street: e.target.value })
              }
            />
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              onChange={(e) =>
                setEmployee({ ...employee, city: e.target.value })
              }
            />
            <label htmlFor="state">State</label>
            <Dropdown options={allStates} selectedValue={setStates} />
            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="zipCode"
              onChange={(e) =>
                setEmployee({ ...employee, zipCode: e.target.value })
              }
            />
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown options={department} selectedValue={setDepartment} />
        </form>
        <div className={styles.SaveBtnContainer}>
          <button className={styles.SaveBtn} onClick={(e) => saveEmployee(e)}>
            Save
          </button>
        </div>
      </div>
      {openModal && <Modal closeModal={setOpenModal} modalText={ModalText} />}
    </>
  );
}

export default FormComponent;
