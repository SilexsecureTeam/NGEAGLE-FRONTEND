import React, { useEffect } from 'react'
import { COLORS } from '../../utilities/constants'
import useRequest from '../../hooks/useRequest'

const FactsNFigures = () => {
  const { data, error, fetchData, loading } = useRequest('history', 'POST')

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading && !error ? (
        <div className="d-flex justify-cont-center mb-5">
          <div className=" row g-4 align-items-center justify-content-center justify-content-between container m-auto">
            <div className="col-md-5">
              <ul className="ui-part">
                <h3 style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                  {data[0]?.title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data[0]?.description,
                  }}
                />
              </ul>
            </div>

            <div className="col-md-7 ">
              <div className="cuve-image1">
                <img
                  className="img-fluid curved-image"
                  src={require('../../images/black-man-2.png')}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default FactsNFigures
