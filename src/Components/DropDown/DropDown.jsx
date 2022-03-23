import React from "react";
import styles from "../DropDown/DropDown.module.css";

const Dropdown = React.forwardRef(
  ({ onChange, options, onBlur, name }, ref) => (
      <div className={styles.dropdownContainer}>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.select}
          defaultValue={options[0]}
        >
          {options.map((option, index) => (
            <option value={option.value ? option.value : option.abbreviation}  key={index}>
              {option.label ? option.label : option.name }
            </option>
          ))}
        </select>
      </div>
    )
  )


  export default Dropdown;
