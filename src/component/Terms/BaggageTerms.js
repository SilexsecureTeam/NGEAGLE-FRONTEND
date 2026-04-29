import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const BaggageTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Baggages: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>3.1. Baggage Allowance: NG Eagle's baggage policy is outlined on its official website. Passengers are responsible for adhering to weight and size restrictions.
            </p>
            <p>3.2. Lost or Damaged Baggage: NG Eagle is not liable for damage to or loss of unchecked baggage. Passengers must report any issues immediately upon discovering them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaggageTerms;
