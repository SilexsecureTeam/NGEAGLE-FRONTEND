import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard'
import useRequest from '../../hooks/useRequest'

function SavedJobs() {
  const navigate = useNavigate()
  const [loggedIn] = useState(
    JSON.parse(window.localStorage.getItem('job_user'))
  )
  const { data: savedJobs, fetchData: fetchSavedJobs } = useRequest(
    `view_saved_jobs/${loggedIn?.id}`,
    'POST'
  )
  const { fetchData: searchJobs } = useRequest()
  const { fetchData: deleteJobs } = useRequest()

  useEffect(() => {
    fetchSavedJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [/*_*/, setUpdated] = useState('')

  useEffect(() => {
    if (loggedIn === null) {
      navigate('/career/login')
    } else {
      loggedIn.email_verified_at === null && navigate('/career/verify')
    }
  }, [loggedIn, navigate])

  function searchJob(query) {
    if (query === '') {
      setUpdated(Math.random())
    } else {
      searchJobs(`search_jobs/${query}`)
    }
  }
  function savejob(id) {
    if (loggedIn == null) {
      navigate('/career/login')
    } else {
      deleteJobs(`delete_saved_jobs/${id}`)
    }
  }

  return (
    <div>
      {/* Include your header component here */}
      {/* <Header /> */}
      <style>
        {`
          #top {
            background-image: url('../assets/images/Group 125.png');
            background-size: cover;
            background-position: center;
            color: #fff!important;
          }
        `}
      </style>
      {/* Include your navigation component here */}
      {/* <Nav /> */}
      <header className="masthead">
        <div className="container">
          <div className="row">
            <div className="col-md-10 has-text-centered">
              <div className="site-heading">
                <h1 className="heading">Saved Jobs</h1>
                <br />
                <span className="subheading">Your list of stored jobs</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="holder">
        <div id="tabscontainer">
          <input type="radio" name="radiogroupfortabs" id="radiofortab4" checked />
          <label htmlFor="query" id="tab-label4">
            Search
          </label>
          <form action="/search" id="tab-content4">
            <div className="px-4 columns pt-5 pb-3">
              <div className="column is-11">
                <input
                  onChange={(e) => searchJob(e.target.value)}
                  className="form-control py-2 mb-2"
                  type="text"
                  name="query"
                  id="query"
                  placeholder="Search by job name or job department"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <section className="section mb-2 pb-6 mb-6">
        <div className="holder">
          <div className="columns">
            <div className="column is-three-quarters mx-auto">
              {Array.isArray(savedJobs) && savedJobs?.length > 0 ? (
                savedJobs?.map((item, index) => {
                  return (
                    <JobCard
                      item={item}
                      key={index}
                      type={'save_job'}
                      savejob={savejob}
                    />
                  )
                })
              ) : (
                <center className="pt-6">
                  <img
                    src={require('../assets/images/empty-box-svgrepo-com.png')}
                    className="mt-3 mb-2"
                    height={'100px'}
                    // style={{ height: '100px!important' }}
                    alt="Empty"
                  />
                  <p>No Jobs Saved Yet </p>
                </center>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Include your footer component here */}
      {/* <Footer /> */}
      <script>
        {`
          toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
        `}
      </script>
    </div>
  )
}

export default SavedJobs
