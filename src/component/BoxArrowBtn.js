import React from "react";
import { BsChevronRight } from "react-icons/bs";

const BoxArrowBtn = ({color}) => {
  return (
    <button className="border-0" style={{ backgroundColor: color }}>
      <BsChevronRight />
    </button>
  );
};

export default BoxArrowBtn;
