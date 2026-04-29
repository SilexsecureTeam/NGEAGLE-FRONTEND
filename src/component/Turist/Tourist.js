import React from 'react'
import '../../style/Turist.css'
import TouristPlaces from './TouristPlaces'
import { TuristJson } from './TuristJson'
import { useState, useEffect } from 'react'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'
import { Parser } from "html-to-react";

function Tourist() {
  const { data: imageData, fetchData: getImage } = useRequest('touristheader', 'POST')

  useEffect(() => {
    getImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [data, setdata] = useState([])

  useEffect(() => {
    setdata(TuristJson)
  }, [])
  return (
    <div>
      <div>
        <div>
          <div className="">
            <img
              className="first-im img-fluid"
              src={fetchImages(imageData[0]?.image)}
              alt="Plane"
            />
          </div>
          <div className="contai">
            <div className="about-and-brand row justify-content-between px-5 container m-auto">
              {/* <div className="col-md-5">
                <div className="">
                  <p className="welcome">
                    <b>WECOME</b>
                  </p>
                  <div className="caree-about-si">
                    <p className="abou">
                      <b>About</b>
                    </p>
                    <p className="careers">
                      <b>Careers</b>
                    </p>
                    <p className="careers">
                      <b>News</b>
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="brand-eco">
                  <p>
                    <b>{imageData[0]?.title}</b> <br/>
                      {Parser().parse(imageData[0]?.description)}
                  </p>
                </div>
              </div>
            </div>
          </div> 
          <div>
            <TouristPlaces />
          </div>
        </div>

        {Array.isArray(data) &&
          data.map((item) => {
            return (
              <div className="mainn col-sm-12 col-md-6 col-lg-4 col-xlg-3 d-flex justify-content-center">
                <div className='main-ddd pt-3 px-5 pb-4 data-aos="fade-down-left"'>
                  <img className="mages my-3 img-fluid" src={item.image} alt="imagess" />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Tourist
