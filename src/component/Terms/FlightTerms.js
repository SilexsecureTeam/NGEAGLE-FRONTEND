import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const FlightTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Flight Operations: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              2.1. Flight Schedule: NG Eagle strives to adhere to published
              schedules, but flight times are subject to change due to various
              factors. NG Eagle will make reasonable efforts to inform
              passengers of any schedule changes.
            </p>
            <p>
              2.2. Boarding: Passengers must check in at least 40 minutes prior
              to departure. NG Eagle may deny boarding to passengers who arrive
              late or fail to comply with security and immigration requirements
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightTerms;
