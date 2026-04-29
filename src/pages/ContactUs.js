import { useEffect } from "react";
import bottomrec from "../images/bottomrec.png";

import useRequest from "../hooks/useRequest";
import fetchImages from "../hooks/useFetchImages";
import { Parser } from "html-to-react";

const ContactUs = () => {
  const { data, fetchData } = useRequest("contactPage", "GET");
  const { data: dataList, fetchData: fetchDataList } = useRequest(
    "contactPageList",
    "GET",
  );

  useEffect(() => {
    fetchData();
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const services = [
  //   { id: 1, img: grouping, header: "Group Booking" },
  //   { id: 2, img: infant, header: "Travel with Infant" },
  //   { id: 3, img: travelFAQ, header: "Travel Planning FAQs" },
  // ];

  // const contactCard = services.map((service) => (
  //   <ContactCard key={service.id} service={service} />
  // ));

  return (
    <>
      <div>
        {data && data[0] ? (
          <div className="mb-5">
            <div className="">
              <img
                src={fetchImages(data[0]?.image)}
                alt=""
                style={{ height: "500px", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="">
              <img
                src={bottomrec}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "80px", objectFit: "cover" }}
              />
            </div>
          </div>
        ) : null}
        <div className="my-5">
          <div className="container">
            {/* <div className="row g-0">{contactCard}</div> */}
            <div className="col-md-11 my-5">
              <div>
                <h3 className="text-secondary my-3 fw-bolder">
                  {data[0]?.title}
                </h3>
                <div className="col-2 prime_border my-3"></div>
                <p>{Parser().parse(data[0]?.content)}</p>
              </div>
              <div>
                <div>
                  <div className="prime_bg2 py-3 text-white fw-semibold row">
                    <div className="col-3">
                      <span>LOCATION</span>
                    </div>
                    <div className="col-5">
                      <span>INFORMATION</span>
                    </div>
                    <div className="col-5 col-md-4">
                      <span>CONTACT</span>
                    </div>
                  </div>
                  {dataList?.map((item, key) => (
                    <div className="py-3" key={key}>
                      <div className="row my-3 pb-3">
                        <div className="col-2 col-md-3 fw-bold">
                          <p>{item.location}</p>
                        </div>
                        <div className="col-5 ">
                          {Parser().parse(item.information)}
                        </div>
                        <div className="col-5 col-md-4 ">
                          {Parser().parse(item.contact)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
