import React, { useEffect } from 'react'
import bottomrec from '../images/bottomrec.png'
import NewsCardFull from '../component/NewsCardFull'
import { useParams } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'

const NewsDetails = () => {
  const params = useParams()
  const { data, fetchData } = useRequest(`newsevent/${params.id}`)
  const { data: newsData, fetchData: fetchNews } = useRequest('newsevent', 'POST')

  useEffect(() => {
    fetchData()
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newsCards = (
    <>
      <p className="text-start fs-4 fw-bolder">RELATED ARTICLES</p>
      {newsData
        ?.filter((cafe) => cafe?.id !== params.id)
        .map((news) => (
          <div className="col-md-4 my-5">
            <NewsCardFull key={news.id} news={news} />
          </div>
        ))}
    </>
  )

  return (
    <div>
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
            <img src={bottomrec} alt="" className="img-fluid w-100" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 prime_bg1 p-4">
              <h6 className="prime_text1">{data?.title}</h6>
              <div className="col-md-9 my-5">
                <p className="text-white">
                  I was profoundly inspired': NGeagle’s WING Flight introduces young women
                  to careers in aviation
                </p>
              </div>
              <p className="prime_text1">Staff Writer Sep 25, 2023 10:30am</p>
            </div>
            <div className="col-md-6 px-0">
              <div>
                <img src={fetchImages(data?.image)} alt="" className="imd-fluid w-100" />
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-8 my-5">
              <div className="col-md-11">
                <p dangerouslySetInnerHTML={{ __html: data?.description }} />
              </div>
            </div>
            {newsCards}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetails
