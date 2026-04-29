import { useEffect } from 'react'

import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'

const Events = () => {
  const { data: news, fetchData: fetchNews } = useRequest('newsevent', 'POST')

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="row justify-content-center my-4 px-5">
        {Array.isArray(news) &&
          news.slice(0, 3).map((item, index) => (
            <div key={index} className="py-1 px-2 col-lg-4 col-12">
              <div className="shadow rounded-3" style={{ overflow: 'hidden' }}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    style={{ height: '250px', objectFit: 'cover' }}
                    className="img-fluid"
                    src={fetchImages(item?.image)}
                    alt="News"
                  />
                </div>
                <div
                  className="p-2 pt-4"
                  style={{ height: '150px', position: 'relative' }}
                >
                  <p className="fw-bold">{item.title}</p>
                  <div
                    className="p-1 w-100"
                    style={{ position: 'absolute', bottom: '0px' }}
                  >
                    <center>
                      <a
                        href={`/news_details/${item.id}`}
                        style={{ backgroundColor: '#71AE4D', color: 'white' }}
                        className="btn btn-sm"
                      >
                        View
                      </a>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Events
