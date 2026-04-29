import React, { useEffect } from 'react'
import bottomrec from '../images/bottomrec.png'
import NewsCard from '../component/NewsCard'
import useRequest from '../hooks/useRequest'

const News = () => {
  const { data: news, fetchData: fetchNews } = useRequest('newsevent', 'POST')

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newsCards = news.map((news) => <NewsCard key={news.id} news={news} />)

  return (
    <>
      <div>
        <div className="mb-5">
          <div
            style={{ minHeight: '300px' }}
            className="prime_bg1 p-3 d-flex justify-content-center align-items-center"
          >
            <div className="col-md-5 text-center">
              <h1 className="display-1 text-white fw-bolder">NEWS</h1>
              <p className="prime_text1 fw-bolder fs-4">
                <span className="text-white">ARTICLE. </span>
                <span> PRESS PRE-LEASES</span>
              </p>
            </div>
          </div>
          <div className="">
            <img
              src={bottomrec}
              alt=""
              className="img-fluid"
              style={{ height: '100px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">{newsCards}</div>
        </div>
      </div>
    </>
  )
}

export default News
