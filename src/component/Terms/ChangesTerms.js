import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const ChangesTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Changes and Cancellations: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              4.1. Flight Changes: Passengers may change flight dates and times
              subject to NG Eagle's change policy. Fees and restrictions may
              apply.
            </p>
            <p>
              4.2. Cancellations: NG Eagle's cancellation policy is outlined on
              its official website. Refunds, if applicable, will be processed
              according to NG Eagle's refund policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangesTerms;
