import React, { Fragment, useEffect, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'

const TouristPlaces = () => {
  const { data, fetchData, loading, error } = useRequest('tourist', 'POST')

  const [grouped, setGrouped] = useState({})

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading) {
      const groupByLocation = data?.reduce((result, obj) => {
        const key = obj.location
        if (!result[key]) {
          result[key] = []
        }

        result[key].push(obj)
        return result
      }, {})


      setGrouped(groupByLocation)
    }
  }, [loading, data])

  return (
    <>
      {!loading && !error ? (
        <div>
          {Object.keys(grouped).map((state, index) => (
            <Fragment key={index}>
              {index % 3 === 1 ? (
                <>
                  {/* {grouped[state]?.slice(2)?.map((center, index) => ( */}
                  <div className="row g-0 mt-1">
                    <div className="col-md-4 prime_bg1 p-5 text-white">
                      <p className="fw-bold">
                        TOURIST ATTRACTIONS IN {state.toUpperCase()}
                      </p>
                      <div className="d-flex align-items-center my-4">
                        <p className="nu">
                          <b>01</b>
                        </p>
                        <p className="MELLENIUM-PARK">
                          <b>{grouped[state][0]?.title?.toUpperCase()}</b>
                        </p>
                      </div>
                      <p>{grouped[state][0]?.description}</p>
                    </div>
                    <div className="col-md-3 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][0]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y">
                          <div>
                            <button className="border-0 prime_bg2 mb-1 px-2 py-2 text-white">
                              <BsChevronUp />
                            </button>
                          </div>
                          <div>
                            <button className="border-0 prime_bg2 px-2 py-2 text-white">
                              <BsChevronDown />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][1]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 start-0 translate-middle-y px-md-5 w-100">
                          <div
                            className="px-md-5 px-3 py-5 py-md-3"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            <h5 className="fw-bold">
                              {grouped[state][1]?.title?.toUpperCase()}
                            </h5>
                            <div className="prime_border col-6"></div>
                            <div
                              className="my-4 pe-2"
                              style={{ borderRight: '1px solid green' }}
                            >
                              <p>{grouped[state][1]?.description}</p>
                            </div>
                            <div className="">
                              <button className="bg-black text-white px-3 py-1">
                                VIEW DETAILS
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </>
              ) : index % 3 === 2 ? (
                <>
                  <div className="row g-0 mt-1">
                    <div className="col-md-3 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][0]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y">
                          <div>
                            <button className="border-0 prime_bg2 mb-1 px-2 py-2 text-white">
                              <BsChevronUp />
                            </button>
                          </div>
                          <div>
                            <button className="border-0 prime_bg2 px-2 py-2 text-white">
                              <BsChevronDown />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 prime_bg2 p-5 text-white">
                      <p className="fw-bold">
                        TOURIST ATTRACTIONS IN {state?.toUpperCase()}
                      </p>
                      <div className="d-flex align-items-center my-4">
                        <p className="nu">
                          <b>02</b>
                        </p>
                        <p className="MELLENIU-PARK fs-3">
                          <b>{grouped[state][0]?.title?.toUpperCase()}</b>
                        </p>
                      </div>
                      <p>{grouped[state][0]?.description}</p>
                    </div>
                    <div className="col-md-5 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][1]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 start-0 translate-middle-y px-md-5 w-100">
                          <div
                            className="px-md-5 px-3 py-5 py-md-3"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            <h5 className="fw-bold">
                              {grouped[state][1]?.title?.toUpperCase()}
                            </h5>
                            <div className="prime_border col-6"></div>
                            <div
                              className="my-4 pe-2"
                              style={{ borderRight: '1px solid green' }}
                            >
                              <p>{grouped[state][1]?.description}</p>
                            </div>
                            <div className="">
                              <button className="bg-black text-white px-3 py-1">
                                VIEW DETAILS
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : index % 3 === 0 ? (
                <>
                  <div className="row g-0 mt-1">
                    <div className="col-md-5 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][0]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 start-0 translate-middle-y px-md-5 w-100">
                          <div
                            className="px-md-5 px-3 py-5 py-md-3"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            <h5 className="fw-bold">
                              {grouped[state][0]?.title.toUpperCase()}
                            </h5>
                            <div className="prime_border col-6"></div>
                            <div
                              className="my-4 pe-2"
                              style={{ borderRight: '1px solid green' }}
                            >
                              <p>{grouped[state][0]?.description}</p>
                            </div>
                            <div className="">
                              <button className="bg-black text-white px-3 py-1">
                                VIEW DETAILS
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 px-0">
                      <div className="position-relative h-100">
                        <div className="h-100">
                          <img
                            src={fetchImages(grouped[state][1]?.image)}
                            alt=""
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y">
                          <div>
                            <button className="border-0 prime_bg2 mb-1 px-2 py-2 text-white">
                              <BsChevronUp />
                            </button>
                          </div>
                          <div>
                            <button className="border-0 prime_bg2 px-2 py-2 text-white">
                              <BsChevronDown />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 prime_bg2 p-5 text-white">
                      <p className="fw-bold">
                        TOURIST ATTRACTIONS IN {state.toUpperCase()}
                      </p>
                      <div className="d-flex align-items-center my-4">
                        <p className="nu">
                          <b>01</b>
                        </p>
                        <p className="MELLENIUMPARK fs-3">
                          <b>{grouped[state][1]?.title}</b>
                        </p>
                      </div>
                      <p>{grouped[state][1]?.description}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </Fragment>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default TouristPlaces


// <div className="">
//       {!loading && !error ? (
//         <div className="container m-auto p-5">
//           {data?.map((privacy, index) => (
//             <div  key={index}>

//             </div>
//           ))}

//         </div>
//       ) : null}
//     </div>
