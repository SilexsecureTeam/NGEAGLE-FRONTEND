import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const LiabilityTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Liability: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              6.1. Limitation of Liability: NG Eagle's liability for any
              damages, losses, or delays is limited as outlined in its
              conditions of carriage. NG Eagle is not responsible for
              consequential or indirect damages.
            </p>
            <p>
              6.2. Force Majeure: NG Eagle is not liable for delays or
              cancellations due to circumstances beyond its control, including
              but not limited to weather, natural disasters, and government
              actions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiabilityTerms;
