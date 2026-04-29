import React, { useEffect } from 'react'
// import image5 from '../images/portal-img.png'
// import TravelPortal from '../component/TravelPortal'
// import { Link } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'
import { Parser } from "html-to-react";

const SpecialAssistance = () => {
  // const [activeIcon, setActiveIcon] = useState(null)
  const { data, fetchData } = useRequest('specialAssistance', 'GET')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <div className="mb-5">
          <div className="">
            <img
              src={fetchImages(data[0]?.banner_image)}
              alt=""
              className="img-fluid hero_img"
            />
          </div>
        </div>
        <div className="container">
          <div className=" ps-0 col-md-10">
            <h4 className="text-secondary fw-bold">{data[0]?.first_sect_title}</h4>
            <p>{Parser().parse(data[0]?.first_sect_content)}</p>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <div className="row g-0">
              <div className="col-md-6 mb-5 mb-md-0">
                <div>
                  <img src={fetchImages(data[0]?.card_first_image)} alt="" className="img-fluid w-100" />
                </div>
              </div>
              <div className="col-md-6 mb-5 mb-md-0 prime_bg1 text-white">
                <div className="h-100 pt-5 pt-md-0 d-flex align-items-center">
                  <div className="px-5 mx-md-3">
                    <h5 className="prime_text1 mb-4 fw-bold">{data[0]?.card_first_title}</h5>
                    <p className="fs-4 fw-semibold">{data[0]?.card_first_sub_title}</p>
                    <p className="mb-4">
                      {Parser().parse(data[0]?.card_first_content)}
                    </p>
                    {/* <button className="border-0 p-2 prime_text1 fw-bold">
                      VIEW DETAILS
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>

            <div className="row g-0">
              <div className="col-md-6 order-md-2">
                <div>
                  <img src={fetchImages(data[0]?.card_second_image)} alt="" className="img-fluid w-100" />
                </div>
              </div>
              <div className="col-md-6 order-md-1 prime_bg1 text-white">
                <div className="h-100  pt-5 pt-md-0 d-flex align-items-center">
                  <div className="ms-md-2" style={{ padding: '0 15%' }}>
                    <h5 className="prime_text1 mb-4 fw-bold">{data[0]?.card_second_title}</h5>
                    <p className="fs-4 fw-semibold">{data[0]?.card_second_sub_title}</p>
                    <p className="mb-4">
                      {Parser().parse(data[0]?.card_second_content)}
                    </p>
                    {/* <button className="border-0 p-2 prime_text1 fw-bold">VIEW DETAILS</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpecialAssistance
