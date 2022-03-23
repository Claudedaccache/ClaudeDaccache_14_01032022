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
    ).toString();
  }
};

const DateSection = forwardRef(
  (
    {
      onChange,
      maxDate,
      onBlur,
      dateFormat,
      options,
      selected,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div>
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
        />
      </div>
    );
  }
);

export default DateSection;
