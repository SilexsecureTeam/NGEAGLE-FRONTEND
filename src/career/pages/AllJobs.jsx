// import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import JobCard from '../components/JobCard'
import useRequest from '../../hooks/useRequest'

export default function AllJobs() {
  const router = useParams()
  const { query } = router
  const [jobs, setJobs] = useState([])
  const [loggedIn] = useState(JSON.parse(window.localStorage.getItem('job_user')))
  const navigate = useNavigate()

  const [updated, setUpdated] = useState('')
  const { data, fetchData: save_job, error } = useRequest('addtosavedjobs', 'POST')
  const { fetchData: jobList, data: jobLists } = useRequest()
  const { fetchData: searchJobs, data: results } = useRequest()

  useEffect(() => {
    if (query != null) {
      searchJob(query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    if (data.status === 'success') {
      Swal.fire({
        title: 'Saved',
        text: data.message,
        timer: 1000,
      })
    } else if (data?.status === 'error') {
      Swal.fire({
        title: 'Error',
        text: data.message,
        timer: 1000,
      })
    }
  }, [data])

  useEffect(() => {
    if (results) {
      setJobs(results)
    }
  }, [results])

  useEffect(() => {
    if (jobLists) {
      setJobs(jobLists)
    }
  }, [jobLists])

  useEffect(() => {
    if (error) {
    }
  }, [error])

  useEffect(() => {
    jobList('joblist', 'GET')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])

  function searchJob(query) {
    if (query === '') {
      setUpdated(Math.random())
    } else {
      searchJobs(`search_jobs/${query}`, 'GET')
    }
  }

  function savejob(id) {
    if (loggedIn == null) {
      navigate('/career/login')
    } else {
      let job_id = id
      let applicant_id = loggedIn.id
      save_job('addtosavedjobs', 'POST', { job_id, applicant_id })
    }
  }

  return (
    <div>
      <header className="masthead">
        <div className="container">
          <div className="row">
            <div className="col-md-10 has-text-centered">
              <div className="site-heading">
                <h1 className="heading">OPEN POSITIONS</h1>
                <br />
                <span className="subheading">Current Jobs Vacancies at NGEagle </span>
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
                  const isInternalUser = loggedIn != null && loggedIn.type === 'internal'
                  const isExternalJob = item.opening_type === 'external'

                  if (isInternalUser || isExternalJob) {
                    return (
                      <JobCard
                        item={item}
                        key={index}
                        type={'alljobs'}
                        savejob={savejob}
                      />
                    )
                  }

                  return null // Skip rendering for non-external jobs when not an internal user
                })
              ) : (
                <div className="text-center pt-6">
                  <img
                    src={require('../assets/images/empty-box-svgrepo-com.png')}
                    className="mt-3 mb-2"
                    height={100}
                    alt="Empty"
                  />
                  <p>No Positions Currently Available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Include your Footer component here */}
    </div>
  )
}
