import React, { useEffect, useState } from 'react'
import logo from '../images/ng_logo.png'
import '../style/footer.css'
import LanguageIcon from '@mui/icons-material/Language'
import { Link } from 'react-router-dom'
import useRequest from '../hooks/useRequest'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Swal from 'sweetalert2'
import fetchImages from '../hooks/useFetchImages'

export default function Footer() {
  const [email, setEmail] = useState('')
  const {
    data: categories,
    fetchData: fetchCategories,
    loading,
    error,
  } = useRequest('category', 'POST')
  const { data: socials, fetchData: fetchSocials } = useRequest('social', 'POST')
  const { data: subcategories, fetchData: fetchSubcategories } = useRequest(
    'subcategory',
    'POST'
  )
  const {
    // data,
    fetchData: subscribeMail,
    error: subErr,
    loading: subLoading,
  } = useRequest()

  useEffect(() => {
    fetchCategories()
    fetchSubcategories()
    fetchSocials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setEmail('')
    if (subErr) {
      Swal.fire(
        'Error!',
        subErr?.response?.data?.message
          ? subErr?.response?.data?.message
          : 'Encountered an error',
        'error'
      )
    }
  }, [subErr])

  // useEffect(() => {
  //   setEmail('')
  //   if (data) {
  //     Swal.fire('Good job!', 'Your email has been successfully added!', 'success')
  //   }
  // }, [data])

  const onSubmit = (e) => {
    e.preventDefault()
    subscribeMail('subscribe', 'POST', { email })
  }

  return (
    <>
      {!loading && !error ? (
        <>
          <div className="footer">
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <div className="cover">
                <img src={logo} alt="" />
                <div style={{ borderBottom: '1px solid white' }}></div>

                <div className="link-container">
                  {categories?.map((category, index) => (
                    <div className="grid-item" key={index}>
                      <p>{category?.title}</p>
                      <ul>
                        {subcategories
                          ?.filter(
                            (sub) => sub?.category_id === category?.id && sub.status === 1
                          )
                          ?.map((subcategory, index) => (
                            <li key={index}>
                              <Link
                                to={
                                  subcategory?.title?.toLowerCase() === 'newsletter'
                                    ? 'news'
                                    : `/${subcategory?.title
                                        ?.toLowerCase()
                                        .split(' ')
                                        .join('_')}`
                                }
                              >
                                {subcategory?.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <div className="grid-item">
                    <p>Let's keep you updated</p>
                    <form onSubmit={onSubmit} className="mb-3">
                      <label htmlFor="form" className="form-label">
                        Let's keep you updated
                      </label>
                      <div className="input-container">
                        <input
                          className="form-control lastrr bg-transparent text-white"
                          type="text"
                          id="form"
                          placeholder="Email..."
                          style={{ flex: 1 }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button className="lastrrSvg" disabled={subLoading} type="submit">
                          <AiOutlineArrowRight />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="social-links layout_container">
            <span>
              {socials?.map((social, index) => (
                <a target="_blank" rel="noreferrer" href={social?.url} key={index}>
                  <img src={fetchImages(social?.image)} width={20} height={20} alt="" />
                </a>
              ))}
            </span>

            <span>
              <LanguageIcon /> Nigeria - English
            </span>

            <p>
              &copy;{new Date().getFullYear()} NGEAGLE, inc | Travel may be on other
              airlines
            </p>
          </div>
        </>
      ) : null}
    </>
  )
}
