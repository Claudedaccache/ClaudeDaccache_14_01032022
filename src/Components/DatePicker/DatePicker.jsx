import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Controller, useForm } from "react-hook-form";

const DatePicker = React.forwardRef(({ moreOptions, name }, register) => {
  const { control } = useForm();

  // /**
  //  * function that convert the date to the mm/dd/yyyy format
  //  * @param {string} date
  //  * @returns {string} formated date
  //  */
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
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <>
            <Flatpickr
              selected={format({ value } || "")}
              onChange={onChange}
              onBlur={onBlur}
              options={moreOptions}

            />
          </>
        )}
      />
    </div>
  );
})

export default DatePicker;
