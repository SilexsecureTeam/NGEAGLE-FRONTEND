import { useEffect } from "react";
import "../style/announcement.css";
import useRequest from "../hooks/useRequest";
// Swiper Importations
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  A11y,
  Controller,
  Pagination,
  EffectFlip,
} from "swiper";
// import { IoCloseOutline } from "react-icons/io5";
// Swiper Styles Import
import "swiper/css";
import "swiper/css/bundle";
// import { NavLink, useLocation } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Announcements = () => {
  // const [visible, setVisible] = useState(true)
  // const location = useLocation()
  const {
    data: newsletters,
    fetchData: fetchNewsletters,
    loading,
    error,
  } = useRequest("newsletter", "POST");
  const { data: company, fetchData: fetchCompany } = useRequest(
    "company",
    "GET",
  );

  useEffect(() => {
    fetchNewsletters();
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading && !error ? (
        <div className="announcement">
          <Swiper
            modules={[
              Autoplay,
              Navigation,
              A11y,
              Controller,
              Pagination,
              EffectFlip,
            ]}
            effect={"flip"}
            loop={false}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            spaceBetween={1}
            slidesPerView={1}
            className="mySwiper"
          >
            {newsletters?.map((newsletter, index) => (
              <SwiperSlide key={index}>
                <p>{newsletter?.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="d-flex justify-content-center hhBasdddxxss">
            <span className="d-flex">
              <FaPhoneAlt className="mt-1" />{" "}
              <span className="ms-2">{company[0]?.company_phone}</span>
            </span>
            <span className="d-flex ms-4">
              <IoMail className="mt-1" />{" "}
              <span className="ms-2">{company[0]?.company_email}</span>
            </span>
          </div>

          {/* <div className="linkAndCloseButtonContainer removeOnMobile">
            <ul className="">
              <li>
                <NavLink to="career">Career Portal</NavLink>
              </li>
              <li>
                <NavLink>Talk to us</NavLink>
              </li>
            </ul>

            <div className="closeButtonContainer" onClick={() => setVisible(false)}>
              <IoCloseOutline />
            </div>
          </div> */}
        </div>
      ) : null}
    </>
  );
};

export default Announcements;
