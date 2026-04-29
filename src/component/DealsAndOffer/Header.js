import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'

const DealsHeader = () => {
  const { data, error, fetchData, loading } = useRequest('dealheader', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading && !error ? (
        <div>
          <Carousel>
            {data?.map((slide, index) => (
              <Carousel.Item key={index}>
                <div className="">
                  <img
                    src={fetchImages(slide?.image)}
                    alt=""
                    className="img-fluid"
                    style={{ height: '600px', width: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : null}
    </>
  )
}

export default DealsHeader
