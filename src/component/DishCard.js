import React from 'react'
import spoon from '../images/spoons.png'
import { Link } from 'react-router-dom'
import fetchImages from '../hooks/useFetchImages'

const DishCard = ({ dish }) => {
  return (
    <div className="col-md-4 mb-5">
      <div className="mb-1" style={{ width: '100%', height: '300px' }}>
        <img
          // src={fetchImages('cafe', dish?.image)}
          src={fetchImages(dish?.image)}
          alt=""
          className="img-fluid"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="position-relative">
        <div className="prime_bg1 text-white p-4 ">
          <h6>
            {' '}
            <Link to="" className="nav-link">
              {' '}
              {dish.header}
            </Link>
          </h6>
          <div className="col-9 pb-1 prime_bg2"></div>
          <p className="my-5">
            <Link to={`/cafe_details/${dish?.id}`} className="nav-link">
              {dish?.title}
            </Link>{' '}
          </p>
        </div>
        <div className="position-absolute top-0 start-50 translate-middle d-flex justify-content-center w-100">
          <div
            style={{ width: '50px', height: '50px' }}
            className="prime_bg2 rounded-circle d-flex align-items-center justify-content-center"
          >
            <img src={spoon} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishCard
