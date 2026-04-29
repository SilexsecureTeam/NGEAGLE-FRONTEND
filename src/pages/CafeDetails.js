import React, { useEffect } from 'react'
import DishCard from '../component/DishCard'
import DealsAndOfferCard from '../component/DealsAndOfferCard'
import tel from '../images/telephone 1.png'
import { SlLocationPin } from 'react-icons/sl'
import { Link, useParams } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'

const CafeDetails = () => {
  const { id } = useParams()

  const { data: cafeData, fetchData, loading, error } = useRequest(`cafe/${id}`, 'GET')
  const { data: cafes, fetchData: fetchCafes } = useRequest(`cafe`, 'POST')

  useEffect(() => {
    fetchData()
    fetchCafes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dishesCard = cafes
    ?.filter((cafe) => cafe?.id !== id && cafe?.location === cafeData?.location)
    .map((dish) => <DishCard key={dish.id} dish={dish} />)
  return (
    <>
      {!loading && !error ? (
        <div>
          <div className="mb-5">
            <div className="position-relative">
              <div className="">
                <img
                  src={fetchImages(cafeData?.image)}
                  alt=""
                  className="img-fluid hero_img"
                />
              </div>
              <div className="position-absolute top-100 start-50 translate-middle w-100 d-flex justify-content-center">
                <div className="prime_bg2 px-3 py-2 text-center text-white">
                  <p>Restaurants & Bars in Airports In Nigeria</p>
                  <p className="fs-5 fw-semibold">
                    {cafeData?.title}-{cafeData?.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="container">
              <div className="col-md-7 py-5">
                <p
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: cafeData?.description,
                  }}
                />
                <div className="d-flex my-3">
                  <Link to="" className="nav-link">
                    <span className="me-3">
                      <SlLocationPin size={30} />
                    </span>
                    <span>{cafeData?.address}</span>
                  </Link>
                </div>
                <div className="d-flex my-3">
                  <div className="me-3">
                    <Link to="" className="nav-link">
                      <img
                        style={{ width: '30px', height: '30px' }}
                        src={tel}
                        alt=""
                        classNam="img-fluid"
                      />
                    </Link>
                  </div>
                  <Link to="" className="nav-link">
                    <span>
                      {' '}
                      {cafeData?.phone}/{cafeData?.openhours}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">{dishesCard}</div>
          </div>
          <div>
            <DealsAndOfferCard />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CafeDetails
