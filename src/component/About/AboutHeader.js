import React, { useEffect } from 'react'
import '../../style/About.css'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'

const AboutHeader = () => {
  const { data, error, fetchData, loading } = useRequest('aboutimage', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="">
        {!error && !loading ? (
          <div>
            <img
              className="img-fluid"
              src={fetchImages(data[0]?.image)}
              // src={fetchImages('about', data[0]?.image)}
              alt=""
              style={{ width: '100%', height: '700px', objectFit: 'cover' }}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default AboutHeader
