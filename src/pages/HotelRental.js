import React, { useEffect } from 'react'
import HotelCard from '../component/HotelCard'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'

const HotelRental = () => {
  const { data: slider, fetchData: fetchSlider } = useRequest('hotelslider', 'POST')
  const { data: hotels, fetchData: fetchHotels } = useRequest('hotel', 'POST')

  useEffect(() => {
    fetchSlider()
    fetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-5">
        <div className="position-relative">
          <div>
            <img
              src={fetchImages(slider[0]?.image)}
              alt=""
              className="img-fluid hero_img"
            />
          </div>
          <div className=" col-md-4 position-absolute top-50 translate-middle-y hotel_form">
            <div
              className="px-4 py-5"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '2px 4px 4px 3px rgba(0, 0, 0, 0.25)',
                maxWidth: '400px',
              }}
            >
              <div className="d-flex">
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid black',
                  }}
                  className="prime_bg2 rounded-circle"
                ></div>
                <p className="fw-bold ms-2 fs-5">Hotels.ng</p>
              </div>

              <form>
                <div className="mb-3">
                  <select
                    className="form-select rounded-0 prime_border"
                    aria-label="Default select example"
                  >
                    <option selected>Select Destination</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select rounded-0 prime_border"
                    aria-label="Default select example"
                  >
                    <option selected>Select Guest</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select rounded-0 prime_border"
                    aria-label="Default select example"
                  >
                    <option selected>Departure Date</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select rounded-0 prime_border"
                    aria-label="Default select example"
                  >
                    <option selected>Return Date</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn rounded-0  prime_bg1 text-white" type="button">
                    CONTINUE HOTEL BOOKING
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <p className="text-secondary fs-3 my-4">
            <b>Explore more</b> than Hotels
          </p>
        </div>
        <div className="row my-5">
          {hotels?.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelRental
