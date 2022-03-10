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
import { useForm } from "react-hook-form";

const wait = (duration = 1000) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

function FormComponent() {
  const users = useSelector((state) => state.employees);
  const [openModal, setOpenModal] = useState(false);
  const [ModalText, setModalText] = useState("Employee Created!");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
    shouldFocusError: true,
  });

  /**
   * function that checks if user is already created and included in the users array
   * @param {array} users
   * @returns {boolean} true if user was found and false if not
   */

  const checkUser = (users, data) => {
    let selectedUser = users.find(
      (user) =>
        user.firstName === data.firstName && user.lastName === data.lastName
      // user.dateOfBirth === data.dateOfBirth
    );
    return selectedUser ? true : false;
  };

  /**
   * function that saves the data in the store and launch the modal
   * @param {object} data
   */
  const onSubmit = async (data) => {
    await wait(1000);
    if (isSubmitSuccessful === true && checkUser(users, data) === false) {
      console.log(data);
      dispatch(createEmployee(data));
      setModalText("Employee Created!");
      setOpenModal(true);
    } else if (checkUser(users, data) === true) {
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id={styles.first_name}
            name="firstName"
            {...register("firstName", {
              required: "Dont Forget Your firstName Should Be Cool!",
              minLength: {
                value: 3,
                message:
                  "Dont Forget Your firstName Should at least 3 characters!",
              },
            })}
          />
          {errors.firstName && (
            <span className={styles.errorMsg}>{errors.firstName.message}</span>
          )}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id={styles.last_name}
            name="lastName"
            {...register("lastName", {
              required: "Dont Forget Your lastName Should Be Cool!",
              minLength: {
                value: 3,
                message:
                  "Dont Forget Your lastName Should at least 3 characters!",
              },
            })}
          />
          {errors.lastName && (
            <span className={styles.errorMsg}>{errors.lastName.message}</span>
          )}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            name="dateOfBirth"
            register={{...register("dateOfBirth")}}
            moreOptions={{
              disableMobile: "true",
              dateFormat: "m/d/Y",
              maxDate: new Date().fp_incr(-6570),
            }}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            name="startDate"
            register={{...register("startDate")}}
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
              {...register("street", {
                required: "Dont Forget Your Street",
              })}
            />
            {errors.street && (
              <span className={styles.errorMsg}>{errors.street.message}</span>
            )}

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              {...register("city", {
                required: "Dont Forget Your City",
              })}
            />
            {errors.city && (
              <span className={styles.errorMsg}>{errors.city.message}</span>
            )}

            <label htmlFor="state">State</label>
            <Dropdown name="state" register ={{...register("state")}} options={allStates} />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="zipCode"
              {...register("zipCode", {
                required: "Dont Forget Your ZipCode",
              })}
            />
            {errors.zipCode && (
              <span className={styles.errorMsg}>{errors.zipCode.message}</span>
            )}
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown
            options={department}
            name="department"
            register={{...register("department")}}
          />
        </form>
        <div className={styles.SaveBtnContainer}>
          <button
            className={styles.SaveBtn}
            disabled={isSubmitted && !isValid}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
        </div>
      </div>
      {openModal && <Modal closeModal={setOpenModal} modalText={ModalText} />}
    </>
  );
}

export default FormComponent;


