import React, { useEffect } from "react";
import Select from "react-select";
import styles from "../DropDown/DropDown.module.css";

function Dropdown({ options, selectedValue }) {
  useEffect(() => {
    const formatDataInfo = (options) => {
      const alldata = options.map(
        (itm) =>
          (itm.label = itm.name ?? itm.label) &&
          (itm.value = itm.abbreviation ?? itm.value)
      );
      return alldata;
    };
    formatDataInfo(options);
  }, [options]);

  return (
    <div className={styles.dropdownContainer}>
      <Select options={options} onChange={(e) => selectedValue(e.label)} defaultValue={options[0]}/>
    </div>
  );
}
export default Dropdown;
