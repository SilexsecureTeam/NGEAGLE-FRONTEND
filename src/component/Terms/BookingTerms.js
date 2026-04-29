import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const BookingTerms = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Booking and Reservations: </h4>
          <div onClick={() => handleIsOpen()}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div>
            <p>
              1.1. Ticket Purchase: All ticket purchases are subject to
              availability and NG Eagle's fare rules. NG Eagle reserves the
              right to change fares, flight schedules, and other booking details
              without notice.
            </p>
            <p>
              1.2. Personal Information: Passengers are responsible for
              providing accurate and complete personal information during the
              booking process. NG Eagle will not be liable for any issues
              arising from incorrect information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTerms;
