import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// /**
//  * function that convert the date to the mm/dd/yyyy format
//  * @param {string} date
//  * @returns {string} formated date
//  */
export const formatDate = (inputDate) => {
  let date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear()
    )
  }
};

const DatePicker = forwardRef(
  (
    {
      onChange,
      maxDate,
      onBlur,
      dateFormat,
      options,
      label,
      labelFor,
      selected,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div>
       <label htmlFor={labelFor}>{label}</label>

        <ReactDatePicker
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          selected={selected}
          placeholder={placeholder}
          ref={ref}
          dateFormat={dateFormat}
          maxDate={maxDate}
          id={labelFor}
        />
      </div>
    );
  }
);

export default DatePicker;
