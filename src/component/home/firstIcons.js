import React, { useEffect, useState } from 'react'
import '../../style/Home/FirstIcon.css'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'
import { NavLink } from 'react-router-dom'

export default function FirstIcons() {
  const { data, error, fetchData, loading } = useRequest('feature', 'POST')
  const [active] = useState(0)
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center">
        {!loading && !error ? (
          <div className="main-top-div container m-auto g-2  row justify-content-between">
            {data?.map((feature, index) => (
              <div className="col-6 col-lg p-1">
                <div
                  // onClick={() => {
                  //   setActive(index)
                  // }}
                  className={
                    active === index
                      ? 'first-icon_grey text-center'
                      : 'first-icon text-center'
                  }
                  key={index}
                >
                  <NavLink
                    to={
                      feature?.name?.toLowerCase().includes('car')
                        ? 'car_rental'
                        : feature?.name?.toLowerCase().includes('in-flight')
                        ? 'baggage_policy'
                        : feature?.name?.toLowerCase().includes('hotel')
                        ? 'hotel_rental'
                        : null
                    }
                  >
                    <p className="ng-eagle-on-icon">{feature?.name}</p>
                    <img
                      className="bometric img-fluid"
                      src={fetchImages(feature?.icon)}
                      // src={fetchImages('feature', feature?.icon)}
                      alt=""
                    />
                    <div className="text">
                      <p>{feature?.description}</p>
                    </div>
                  </NavLink>
                </div>
              </div>
            ))}

            <div
              style={{
                top: '35%',
              }}
              className="empty w-100 ms-5 py-3 position-absolute"
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
