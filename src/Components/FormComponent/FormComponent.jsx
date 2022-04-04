import React, { useState } from "react";
import styles from "../FormComponent/FormComponent.module.css";
import allStates from "../../Data/StatesData";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../Redux/Employees/EmployeesActions";
import department from "../../Data/DepartmentData";
import Dropdown from "../DropDown/DropDown";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { formatDate } from "../DatePicker/DatePicker";
import { addDays, getDay } from "date-fns";
import { Modal } from "simple-modal-component";


function FormComponent() {
  const users = useSelector((state) => state.employees);
  const [OpenModal, setOpenModal] = useState(false);
  const [ModalText, setModalText] = useState("");
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
   * function that checks if employee already exist and been created and included in the employees array
   * @param {array} employees
   * @returns {boolean} true if user was found and false if not
   */

  const checkEmployee = (employees, data) => {
    let selectedEmployee = employees.find(
      (employee) =>
        employee.firstName === data.firstName &&
        employee.lastName === data.lastName &&
        formatDate(data.dateOfBirth.toString()) ===
          formatDate(employee.dateOfBirth.toString())
    );
    return selectedEmployee ? true : false;
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
    if (isSubmitSuccessful === true && checkEmployee(users, data) === false) {
      console.log(data);
      dispatch(createEmployee(data));
      setModalText("Employee Created!");
      setOpenModal(true);
    } else if (checkEmployee(users, data) === true) {
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
            aria-labelledby="first-name"
            aria-required="true"
            id="first-name"
            className={styles.first_name}
            name="firstName"
            {...register("firstName", {
              required: "FirstName is required",
              pattern: {
                value:
                  /^[a-zA-ZîèéïÉÈ][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/,
                message: "FirstName includes invalid characters",
              },
              minLength: {
                value: 3,
                message: "Your firstName must at least 3 characters!",
              },
            })}
          />
          {errors.firstName && (
            <span className={styles.errorMsg}>{errors.firstName.message}</span>
          )}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            aria-labelledby="last-name"
            aria-required="true"
            id="last-name"
            className={styles.last_name}
            name="lastName"
            {...register("lastName", {
              required: "LastName is required",
              pattern: {
                value:
                  /^[a-zA-ZîèéïÉÈ][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/,
                message: "LastName includes invalid characters",
              },
              minLength: {
                value: 3,
                message: "Your lastName must at least 3 characters!",
              },
            })}
          />
          {errors.lastName && (
            <span className={styles.errorMsg}>{errors.lastName.message}</span>
          )}

          <Controller
            control={control}
            name="dateOfBirth"
            aria-labelledby="dateOfBirth"
            aria-required="true"
            rules={{ required: "Date Of Birth is required" }}
            render={({ field }) => (
              <DatePicker
                onChange={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                dateFormat="MM/dd/yyyy"
                maxDate={addDays(new Date(), -6570)}
                selected={field.value}
                placeholder="Select date"
                label="Date of Birth"
                labelFor="date-of-birth"
              />
            )}
          />
          {errors.dateOfBirth && (
            <span className={styles.errorMsg}>
              {errors.dateOfBirth.message}
            </span>
          )}

          <Controller
            control={control}
            name="startDate"
            aria-labelledby="startDate"
            aria-required="true"
            rules={{ required: "Start Date is required" }}
            render={({ field }) => (
              <DatePicker
                onChange={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                dateFormat="MM/dd/yyyy"
                selected={field.value}
                filterDate={isWeekday}
                placeholder="Select date"
                label="Start Date"
                labelFor="start-date"
              />
            )}
          />
          {errors.startDate && (
            <span className={styles.errorMsg}>{errors.startDate.message}</span>
          )}

          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.address}>Address</legend>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              aria-labelledby="street"
              aria-required="true"
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
              aria-labelledby="city"
              aria-required="true"
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
              aria-labelledby="zip-code"
              aria-required="true"
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
      {OpenModal && (
        <Modal
          ModalStatus={OpenModal}
          setModalStatus={setOpenModal}
          ModalChildren={ModalText}
        />
      )}
    </>
  );
}

export default FormComponent;
