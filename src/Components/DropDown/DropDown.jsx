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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F0F0F0",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };

  return (
    <div className={styles.dropdownContainer}>
      <Select
        options={options}
        styles={customStyles}
        onChange={(e) => selectedValue(e.value)}
        defaultValue={options[0]}
      />
    </div>
  );
}
export default Dropdown;
