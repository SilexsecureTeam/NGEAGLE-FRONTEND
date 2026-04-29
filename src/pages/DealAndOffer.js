import React, { useEffect, useState } from "react";
import DealsCard from "../component/DealsCard";
import TravelPortal from "../component/TravelPortal";
import useRequest from "../hooks/useRequest";
import DealsHeader from "../component/DealsAndOffer/Header";
import { useParams } from "react-router-dom";

const DealAndOffer = () => {
  const { id } = useParams();

  const [dealType, setDealType] = useState(id);
  const { data: categories, fetchData: fetchDealsCat } = useRequest(
    "offercat",
    "POST",
  );
  const { data, fetchData: fetchDeals } = useRequest(`offercat/${dealType}`);

  useEffect(() => {
    fetchDealsCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dealType === undefined) {
      setDealType(categories[0]?.id);
    }
  }, [categories, dealType]);

  useEffect(() => {
    if (dealType !== null) {
      fetchDeals(`offercat/${dealType}`);
    }
  }, [dealType, fetchDeals]);

  const handleDealType = (e) => {
    setDealType(e.target.value);
  };

  const dealsCategory = data.map((deal) => (
    <DealsCard key={deal.id} deal={deal} />
  ));

  return (
    <>
      <div>
        <div>
          <DealsHeader />
        </div>
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="my-5">
              <select
                value={dealType}
                onChange={(e) => handleDealType(e)}
                name="location"
                id="cars"
                className="fs-5 prime_border"
              >
                {categories?.map((category, index) => (
                  <option key={index} value={category?.id}>
                    {category?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="fs-4 prime_text1 fw-bold">
            The hottest last-minute flight deals leaving soon
          </p>
          <p>
            Act fast – these flights depart from Abuja within the next three
            months, but prices could shoot up at any moment.
          </p>
        </div>
        <div className="container">
          <div className="row my-5">{dealsCategory}</div>
        </div>
        <div className="">
          <TravelPortal />
        </div>
      </div>
    </>
  );
};

export default DealAndOffer;
