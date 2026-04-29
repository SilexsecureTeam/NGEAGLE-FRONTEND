import React, { useEffect } from 'react'
import TripCard from '../component/TripCard'
import TravelPortal from '../component/TravelPortal'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'

const TravelExtra = () => {
  const { data: sliders, fetchData: fetchSliders } = useRequest(
    'travelextraslider',
    'POST'
  )

  useEffect(() => {
    fetchSliders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <div className="mb-5">
          <div className="position-relative">
            <div className="">
              <img
                src={fetchImages(sliders?.image)}
                alt=""
                className="img-fluid hero_img"
              />
            </div>
            <div
              className="position-absolute fw-bold"
              style={{ left: '15%', bottom: '10%' }}
            >
              <p className="prime_text1 ">{sliders?.title}</p>
              <p className="fs-4">{sliders?.description}</p>
              <span className="bg-white p-1">With NG-EAGLE</span>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="container">
            <TripCard />
          </div>
        </div>
        <div className="">
          <TravelPortal />
        </div>
      </div>
    </>
  )
}

export default TravelExtra
