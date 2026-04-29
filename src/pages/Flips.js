import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Flips.css";
import "../../src/Styles/Dialogue.css";
import useRequest from "../hooks/useRequest";
import fetchImages from "../hooks/useFetchImages";
import { Parser } from "html-to-react";

const Flips = () => {
  const [showModal, setShowModal] = useState(true);
  const { data, fetchData } = useRequest("webbonus", "POST");

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Show the modal when the component mounts
    if (data[0]?.status === 1) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [data]);

  return (
    showModal && (
      <div className="news_modal_wrapper ">
        <div className=" bg-white mt-[5%] md:w-fit w-[80%] relative p-2 rounded-lg">
          <button
            className="absolute right-1 top-1 text-lg rounded-full text-white h-[30px] w-[30px] bg-[#71AE4D]"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* <div className="text_content" style={{ backgroundImage: `url(${fetchImages(data[0]?.image)})` }} >
            <img src={fetchImages(data[0]?.image)} className="showOnmobile" />
            <h2 style={{fontSize: '20px'}}>
              <b>{data[0]?.title}</b>
            </h2>
            <p>{data[0]?.description}</p>
            <div className="">
              <button className="btn btn-link" style={{color: "#000"}} onClick={closeModal}>
                No, Thanks
              </button>
              <a target='_blank' rel='noreferrer' href='http://book-ngeagle.crane.aero/ibe'
                className="btn"
                style={{ backgroundColor: '#71AE4D', color: '#fff' }}
              >
                Fly Now
              </a>
            </div>
          </div> */}

          <div className="md:h-[250px] flex-col-reverse md:w-[500px] w-full h-[50%] items-center justify-center md:justify-between md:flex-row  flex ">
            <div className="flex flex-col w-full items-center md:items-start md:w-[50%] h-[50%] md:h-full justify-center px-[5px] md:px-[10px] gap-[5%]">
              {/* <img src={fetchImages(data[0]?.image)} className="showOnmobile" /> */}
              <h2 style={{ fontSize: "20px" }}>
                <b>{data[0]?.title}</b>
              </h2>
              <p>{Parser().parse(data[0]?.description)}</p>
              <div className="">
                <button
                  className="btn btn-link"
                  style={{ color: "#000" }}
                  onClick={closeModal}
                >
                  No, Thanks
                </button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="http://book-ngeagle.crane.aero/ibe"
                  className="btn"
                  style={{ backgroundColor: "#71AE4D", color: "#fff" }}
                >
                  Fly Now
                </a>
              </div>
            </div>
            <img
              src={fetchImages(data[0]?.image)}
              className="h-full w-full md:w-[50%] md:h-full object-contain object-center md:object-cover "
              alt={data[0]?.title || "Bonus Offer"}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Flips;
