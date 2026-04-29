import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const GeneralTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>General Provision: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              7.1. Governing Law: This Agreement is governed by the laws of the
              Federal Republic of Nigeria. Any disputes shall be resolved in a
              court of competent jurisdiction in Nigeria.
            </p>
            <p>
              7.2. Severability: If any provision of this Agreement is deemed
              invalid or unenforceable, the remaining provisions shall remain in
              full force and effect.
            </p>
            <p>
              7.3. Amendments: NG Eagle reserves the right to modify these terms
              and conditions at any time. Passengers are encouraged to review
              the terms regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralTerms;
