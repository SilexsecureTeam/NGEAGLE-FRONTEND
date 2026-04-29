import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const PassengerTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Passenger Conduct: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              5.1. Behavior: Passengers must conduct themselves appropriately
              during all phases of travel. NG Eagle reserves the right to refuse
              transportation or remove passengers who engage in disruptive or
              unruly behavior.
            </p>
            <p>
              5.2. Security: Passengers must comply with security measures and
              screening processes implemented by NG Eagle and relevant
              authorities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerTerms;
