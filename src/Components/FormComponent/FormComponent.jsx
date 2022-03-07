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

  const [UserFirstName, setUserFirstName] = useState("");
  const [UserLastName, setUserLastName] = useState("");
  const [UserBirthDate, setUserBirthDate] = useState("");
  const [UserStartingDate, setUserStartingDate] = useState("");
  const [UserDepartment, setUserDepartment] = useState("");
  const [UserStreet, setUserStreet] = useState("");
  const [UserCity, setUserCity] = useState("");
  const [UserStates, setUserStates] = useState("");
  const [UserZipCode, setUserZipCode] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [ModalText, setModalText] = useState("Employee Created!");
  const [employee, setemployee] = useState(users[0]);
  const dispatch = useDispatch();

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

  /**
   * function that saves the data in the store and launch the modal
   * @param {e} event
   * @returns {object} user's info
   */
  const saveEmployee = (e) => {
    e.preventDefault();
    if (
      UserFirstName !== "" &&
      UserLastName !== "" &&
      UserBirthDate !== "" &&
      UserStartingDate !== "" &&
      UserDepartment !== "" &&
      UserStreet !== "" &&
      UserCity !== "" &&
      UserStates !== "" &&
      UserZipCode !== "" &&
      checkUser(users) === false
    ) {
      setemployee({
        ...employee,
        firstName: UserFirstName,
        lastName: UserLastName,
        dateOfBirth: UserBirthDate,
        startDate: UserStartingDate,
        department: UserDepartment,
        street: UserStreet,
        city: UserCity,
        state: UserStates,
        zipCode: UserZipCode,
      });

      console.log(employee);

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
            onChange={(e) => setUserFirstName(e.target.value)}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            onChange={(e) => setUserLastName(e.target.value)}
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            mainValue={UserBirthDate}
            EditedValue={setUserBirthDate}
            moreOptions={{
              disableMobile: "true",
              dateFormat: "m/d/Y",
              maxDate: new Date().fp_incr(-6570),
            }}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            mainValue={UserStartingDate}
            EditedValue={setUserStartingDate}
            moreOptions={{
              disableMobile: "true",
              dateFormat: "m/d/Y",
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
              onChange={(e) => setUserStreet(e.target.value)}
            />
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              onChange={(e) => setUserCity(e.target.value)}
            />
            <label htmlFor="state">State</label>
            <Dropdown options={allStates} selectedValue={setUserStates} />
            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="zipCode"
              onChange={(e) => setUserZipCode(e.target.value)}
            />
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown options={department} selectedValue={setUserDepartment} />
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
