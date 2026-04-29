import React, { useEffect } from 'react'
import useRequest from '../../hooks/useRequest'
import bag from '../../images/bagIcon.png'

const Baggage = () => {
  const { data, fetchData, loading, error } = useRequest('baggage', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!error && !loading ? (
        <div className="prime_bg1 py-5">
          <div className="container">
            <div className="row my-5">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="mb-4" style={{ maxWidth: '150px', maxHeight: '200px' }}>
                  <img
                    src={bag}
                    // src={fetchImages(data[0]?.image)}
                    // src={fetchImages('baggageImage', data[0]?.image)}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-8 fs-3 text-white">
                <div>
                  <p className="fw-bold">{data[0]?.title}</p>
                  <p>{data[0]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Baggage
