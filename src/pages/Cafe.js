import React, { useEffect } from 'react'
import image from '../images/cafe-couch.png'
import DishCard from '../component/DishCard'
import useRequest from '../hooks/useRequest'
import ThirdPart from '../component/home/thirdPart'

const Cafe = () => {
  const { data: dishes, fetchData: fetchDishes } = useRequest('assist', 'POST')

  useEffect(() => {
    fetchDishes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dishesCard = dishes?.map((dish, index) => <DishCard key={index} dish={dish} />)
  return (
    <>
      <div>
        <div className="mb-5">
          <div className="position-relative">
            <div className="">
              <img src={image} alt="" className="img-fluid hero_img" />
            </div>
            <div className="position-absolute top-100 start-50 translate-middle w-100 d-flex justify-content-center">
              <div className="prime_bg2 px-3 py-2 text-center text-white">
                <p>Restaurants & Bars in Airports In Nigeria</p>
                <p className="fs-5 fw-semibold">Eat and drink</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 text-center pt-5">
          <select
            name="location"
            id="cars"
            className="lh-sm fw-semibold fs-5 border-0 text-decoration-underline"
          >
            <option value="volvo">Your Foods and destinations</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className="container">
          <div className="row">{dishesCard}</div>
        </div>
        <div>
          <ThirdPart />
        </div>
      </div>
    </>
  )
}

export default Cafe
