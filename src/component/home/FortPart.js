import React, { useEffect } from 'react'
import '../../style/Home/Forth.css'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'

function FortPart() {
  const { data, fetchData, loading, error } = useRequest('destination', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {!loading && !error ? (
        <div className="forth-main row g-3 justify-content-center container m-auto justify-content-between pb-5">
          {data?.map((destination, index) => (
            <a href={`/tourist_attraction#uderLg${destination.id}`} className="col-md-4" key={index}>
              <div
                style={{
                  // backgroundImage: `url('${fetchImages(
                  //   'destination',
                  //   destination?.image
                  // )}')`,
                  backgroundImage: `url('${fetchImages(destination?.image)}')`,
                }}
                className="the-uper-part px-3 pt-3"
              >
                <div className="fort-main-part text-light">
                  <h6 className="mb-4 px-2 py-2">{destination?.state}</h6>
                  <div className="fort-main-part-text">
                    <h6 className="mb-4 px-2 py-1">{destination?.state}</h6>
                    <p>{destination?.description}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FortPart
