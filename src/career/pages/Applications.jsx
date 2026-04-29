import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard'
import useRequest from '../../hooks/useRequest'

function Applications() {
  const navigate = useNavigate()
  const [loggedIn] = useState(JSON.parse(window.localStorage.getItem('job_user')))
  const [jobs, setJobs] = useState([])
  const [updated, setUpdated] = useState('')

  const { fetchData: myApplications, data: applications } = useRequest()
  const { fetchData: searchJobs, data: results } = useRequest()

  useEffect(() => {
    if (loggedIn === null) {
      navigate('/career/login')
    } else {
      loggedIn.email_verified_at == null && navigate('/career/verify')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  useEffect(() => {
    if (applications) {
      setJobs(applications?.reverse)
    }
  }, [applications])

  useEffect(() => {
    if (results && results?.length !== 0) {
      setJobs(results?.reverse)
    } else {
      setJobs()
    }
  }, [results])

  useEffect(() => {
    if (loggedIn !== null) {
      myApplications(`myapplications/${loggedIn.id}`, 'GET')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])
  function searchJob(query) {
    if (query === '') {
      setUpdated(Math.random())
    } else {
      searchJobs(`search_jobs/${query}`, 'GET')
    }
  }

  return (
    <div>
      <header className="masthead">
        <div className="container">
          <div className="row">
            <div className="col-md-10 has-text-centered">
              <div className="site-heading">
                <h1 className="heading">Job Applications</h1>
                <br />
                <span className="subheading">List of Jobs you've applied for.</span>
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
              {Array.isArray(jobs) ? (
                jobs.map((item, index) => {
                  return (
                    <JobCard
                      item={item}
                      key={index}
                      type={'applications'}
                      savejob={null}
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
                  <p>No Applications Made Yet </p>
                </center>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Include your Footer component here */}
    </div>
  )
}

export default Applications
