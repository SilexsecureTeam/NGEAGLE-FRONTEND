/* eslint-disable jsx-a11y/anchor-is-valid */

import NavBar from '../components/NavBar'
// import { TabsContainer } from './home'
import LoginCard from './Login'

// function Header() {
//   // Replace this component with your header content
//   return <div>{/* Header content */}</div>
// }
// function Nav() {
//   // Replace this component with your navigation content
//   return <div>{/* Navigation content */}</div>
// }
// function Sidebar() {
//   // Replace this component with your sidebar content
//   return <div>{/* Sidebar content */}</div>
// }

// function JobCard({ job }) {
//   return (
//     <Link to={`/job/${job.id}`} className="my-2 job-card">
//       <div className="company-logo-img">
//         <img src="/Ngeagle_logo.png" alt="Company Logo" />
//       </div>
//       <div className="job-title">{job.title}</div>
//       <div className="company-name">
//         <b>SCHEDULE</b>: {job.schedule.title} | <b>JOB ID</b>: {job.id} |{' '}
//         <b>DATE POSTED</b>: 15/10/2020 | <b> DATE</b>: 20/10/2020
//       </div>
//       <div className="skills-container">
//         <div className="skill">{job.department.title}</div>
//       </div>
//       {/* <a href="#"></a> */}
//     </Link>
//   )
// }

// function JobsList({ jobs, user }) {
//   if (jobs.length > 0) {
//     return (
//       <div className={`column${!user ? ' is-8' : ''}`}>
//         {jobs.map((job) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     )
//   } else {
//     return (
//       <center className="pt-6">
//         <img
//           src="/empty.png"
//           className="mt-3 mb-2"
//           style={{ height: '100px' }}
//           alt="No jobs found"
//         />
//         <p>No job found</p>
//       </center>
//     )
//   }
// }

function LoginContainer() {
  // let tag_hd
  // const departments = []
  // const schedules = []
  // const jobs = []
  // const user = null
  return (
    <div>
      <div className="header-career-ii">
        <NavBar />
      </div>

      <style>
        {`
          #top {
            background-image: url('/Group 125.png');
            background-size: cover;
            background-position: center;
            color: #fff!important;
          }
        `}
      </style>
      {/* <div style={{
        background: 'black',
        height: '500px',
        top: '-100px',
        postition: 'fixed',
      }}> */}

      <div style={{ boxShadow: '10px' }}>
        <img
          style={{
            position: 'absolute',
            zIndex: -10,
            top: '-20px',
            height: '75vh',
            width: '100vw',
          }}
          src={require('../assets/images/arik-air-fine.png')}
          alt=""
        />
        <LoginCard />
      </div>
      {/* </div> */}

      {/* <NavBar /> */}

      {/* <TabsContainer /> */}
      {/* <section className="section mb-2 pb-6 mb-6">
        <div className="holder">
          <div className="columns">
            <div className="column  pl-0 ">
              <aside className="menu">
                {tag_hd && (
                  <a href="/jobs" className="menu-label mb-2 is-bold has-text-success">
                    All Jobs
                  </a>
                )}

                <p className="menu-label has-text-success">Departments</p>
                <ul className="menu-list">
                  {departments.map((cat) => (
                    <li key={cat.title}>
                      {tag_hd === cat.title ? (
                        <a className="is-active">{cat.title}</a>
                      ) : (
                        <a href={`/jobs?tag=${cat.title}`}>{cat.title}</a>
                      )}
                    </li>
                  ))}
                </ul>

                <p className="menu-label has-text-success">Schedules</p>
                <ul className="menu-list">
                  {schedules.map((sh) => (
                    <li key={sh.title}>
                      {tag_hd === sh.title ? (
                        <a className="is-active">{sh.title}</a>
                      ) : (
                        <a href={`/jobs?tag=${sh.title}`}>{sh.title}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <JobsList jobs={jobs} user={user} />

            {!user && (
              <div className="column m-0 p-0">
                <Sidebar />
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Footer component */}
    </div>
  )
}

export default LoginContainer
