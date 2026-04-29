import React, { useEffect } from 'react'
import BoxArrowBtn from '../component/BoxArrowBtn'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'
  ; <BoxArrowBtn />

const TripCard = () => {
  const { data: travelCards, fetchData: fetchTravelCards } = useRequest(
    'travelextra',
    'POST'
  )

  useEffect(() => {
    fetchTravelCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="row">
      <p className="dark_ash_text display-5 fw-bolder">TRIP PLANNING</p>
      {travelCards?.map((card, index) => (
        <div className="col-md-4 mb-5" key={index}>
          <div className="">
            <div>
              <img
                src={fetchImages(card?.image)}
                // src={fetchImages('TravelExtra', card?.image)}
                alt=""
                className="img-fluid w-100"
              />
            </div>
            <div className="p-4 pb-0 prime_bg1 text-white">
              <p className="mb-0">{card?.title}</p>
              <div className="col-8 pb-1 prime_bg2"></div>
              <div className="my-3">
                <p>{card?.description}</p>
              </div>
              <div className="d-flex justify-content-end">
                <BoxArrowBtn color="#71AE4D" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TripCard
