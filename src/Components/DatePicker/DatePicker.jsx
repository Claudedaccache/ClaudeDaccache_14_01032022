import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

function DatePicker({ moreOptions, EditedValue }) {

  /**
   * function that convert the date to the mm/dd/yyyy format
   * @param {string} date
   * @returns {string} formated date
   */
  function format(inputDate) {
    let date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
      
    }
  }

  return (
    <div>
      <Flatpickr
        onChange={([mainValue]) => { 
          const formateDate = format(mainValue)
          EditedValue(formateDate);
        }}
        options={
          (moreOptions)
        }
      />
    </div>
  );
}

export default DatePicker;
