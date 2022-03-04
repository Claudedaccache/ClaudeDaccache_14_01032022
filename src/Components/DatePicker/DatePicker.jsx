import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

function DatePicker({ moreOptions, mainValue, EditedValue }) {
  return (
    <div>
      <Flatpickr
        data-enable-time
        value={mainValue}
        onChange={([mainValue]) => {
          EditedValue({ mainValue });
        }}
        options={
          ({ altFormat: "m-d-Y", altInput: true, dateFormat:	"m-d-Y" },
          { allowInput: true },
          moreOptions)
        }
      />
    </div>
  );
}

export default DatePicker;
