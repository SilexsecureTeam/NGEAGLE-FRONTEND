import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import fetchImages from '../hooks/useFetchImages'

const HotelCard = ({ hotel }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="mb-1">
        <img src={fetchImages(hotel?.image)} alt="" className="img-fluid w-100" />
      </div>
      <div className="p-3 pb-0 pe-0 prime_bg1 text-white">
        <p>{hotel?.title}</p>
        <div className="col-8 prime_bg2 pb-1"></div>
        <p className="pt-3 pe-3">{hotel?.description}</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="prime_bg2 border-0 px-2 py-1">
            <BsChevronRight color="#fff" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
