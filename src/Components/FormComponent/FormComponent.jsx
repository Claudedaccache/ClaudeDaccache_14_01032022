import React, { useState } from "react";
import styles from "../FormComponent/FormComponent.module.css";
import Modal from "../Modal/Modal";
import allStates from "../../Data/StatesData";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../Redux/Employees/AuthActions";
import department from "../../Data/DepartmentData";
import Dropdown from "../DropDown/DropDown";
import { Controller, useForm } from "react-hook-form";
import DateSection from "../DatePicker/DateSection";
import { addDays, getDay } from "date-fns";
import {formatDate} from "../DatePicker/DateSection"

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
    control,
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
  * Given a date, return true if the date is a weekday, and false if it is a weekend
  * @returns The function isWeekday is being called with the date of January 1st, 2017. The function
  * returns true if the day is not a weekend and false if it is a weekend.
  */
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

/**
 * It creates a new employee and adds it to the list of employees.
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
              required: "FirstName is required",
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
              required: "LastName is required",
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
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DateSection
                onChange={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                dateFormat="MM/dd/yyyy"
                maxDate={addDays(new Date(), -6570)}
                selected={field.value}
                placeholder="Select date"
              />
            )}
          />

          <label htmlFor="start-date">Start Date</label>

          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DateSection
                onChange={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                dateFormat="MM/dd/yyyy"
                selected={field.value}
                filterDate={isWeekday}
                placeholder="Select date"
              />
            )}
          />

          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.address}>Address</legend>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              name="street"
              {...register("street", {
                required: "Street is required",
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
                required: "City is required",
              })}
            />
            {errors.city && (
              <span className={styles.errorMsg}>{errors.city.message}</span>
            )}

            <label htmlFor="state">State</label>
            <Dropdown {...register("state")} options={allStates} />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="zipCode"
              {...register("zipCode", {
                required: "ZipCode is required",
              })}
            />
            {errors.zipCode && (
              <span className={styles.errorMsg}>{errors.zipCode.message}</span>
            )}
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown options={department} {...register("department")} />
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
