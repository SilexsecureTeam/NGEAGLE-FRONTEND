import React from "react";
import { Link } from "react-router-dom";
// import grouping from "../images/grouping.png"

const ContactCard = ({ service }) => {
  return (
    <div className="col-md-4">
      <div className=" h-100 prime_border">
        <Link to={""}>
          <div>
            <img src={service.img} alt="" className="img-fluid w-100" />
          </div>
          <p className="text-center text-secondary fw-bolder fs-5 my-3">
            {service.header}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
