import React from "react";

const FilterCategory = (props) => {
  return (
    <div className="">
      <div className="custom-control custom-radio">
        <input
          type="radio"
          id={props.category}
          value={props.category}
          name="genderFilter"
          className="custom-control-input"
          onClick={props.onClick}
        />
        <label className="custom-control-label" htmlFor={props.category}>
          &nbsp;{props.category}
        </label>
      </div>
    </div>
  );
};

export default FilterCategory;
