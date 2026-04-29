import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/login.css'
import useRequest from '../../hooks/useRequest'

function LoginCard() {
  const router = useParams()

  const { token } = router

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loginOtp, setLoginOtp] = useState(null)
  const { data, fetchData: login, loading } = useRequest()
  const {
    fetchData: verifyEmail,
    data: emailVerification,
    // loading: verifyLoading,
  } = useRequest()
  const {
    fetchData: changePassword,
    data: passwordChanged,
    // loading: changeLoading,
  } = useRequest()

  useEffect(() => {
    if (data?.status === 'otp') {
      Swal.fire({
        title: 'Otp was sent, Please check your mail',
        text: data.message,
      })
      // window.localStorage.setItem('job_user', JSON.stringify(data?.user))

      setLoginOtp(true)

      // if (data?.user.date_of_birth === null || data.user.house_address === null) {
      //   navigate('/career/profile')
      // } else {
      //   navigate('/career/applications')
      // }
    } else if (data?.status === 'success') {
      Swal.fire({
        title: 'Otp was sent ',
        text: data.message,
      })
      window.localStorage.setItem('job_user', JSON.stringify(data?.user))

      // setLoginOtp(true)

      if (data?.user.date_of_birth === null || data.user.house_address === null) {
        navigate('/career/profile')
      } else {
        navigate('/career/applications')
      }
    } else if (data?.status === 'error') {
      Swal.fire({
        title: 'Login Failure',
        text: data.message,
      })
    }
  }, [data, navigate])

  useEffect(() => {
    if (emailVerification?.status === 'success') {
      Swal.fire({
        text: emailVerification?.message,
        icon: 'success',
      })
      setLoader(false)
    } else if (emailVerification?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: emailVerification?.message,
      })
      setLoader(false)
    }
  }, [emailVerification])

  useEffect(() => {
    if (passwordChanged?.status === 'success') {
      Swal.fire({
        text: passwordChanged?.message,
        icon: 'success',
      })
      setLoader(false)
      navigate('/career/login')
    } else if (passwordChanged?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: passwordChanged?.message,
      })
      setLoader(false)
    }
  }, [navigate, passwordChanged])

  const handleLogin = (e) => {
    e.preventDefault()
    login('login_Otp_request', 'POST', { email, password })
  }
  
  const handleLoginOtp = (e) => {
    e.preventDefault()
    login('job_login', 'POST', { email, password, otp })
  }

  const [forget, setForgot] = useState(false)
  const [loader, setLoader] = useState(false)
  const [new_password, setNew_password] = useState('')

  const handleforgot = (e) => {
    e.preventDefault()
    setLoader(true)
    const data = {
      email: email,
      url: window.location.origin,
    }
    verifyEmail('verify_email', 'POST', data)
  }

  const forgotpassword = (e) => {
    e.preventDefault()
    setLoader(true)

    const data = {
      new_password: new_password,
      token: token,
    }
    changePassword('change_password', 'POST', { ...JSON.stringify(data) })
  }

  return (
    <>
      { loginOtp ? (
        <div className="login_container">
              <form onSubmit={handleLoginOtp}>
                <p className="container_title">Enter OTP</p>
                <small>An otp was sent to your mail please check and enter</small>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button className="button" type="submit">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                {!loading ? (
                  <>
                    {/* <Link to="/career">
              <Button type="button">Back Home</Button>
            </Link> */}
                    <div className="mt-3" style={{ fontSize: 12 }}>
                      
                      <button
                        type="button"
                        onClick={() => {
                          handleLogin()
                        }}
                        className="btn btn-outline"
                      >
                        Resend OTP
                      </button>
                    </div>

                    <div className="mt-3">
                      Don't have an account? <Link to="/career/register">Signup</Link>
                    </div>
                  </>
                ) : null}
              </form>
            </div>
      ) : (
      <>
        {token == null ? (
          <>
            {!forget ? (
              <div className="login_container">
                <form onSubmit={handleLogin}>
                  <p className="container_title">Login</p>
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input"
                  />
                  <button className="button" type="submit">
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  {!loading ? (
                    <>
                      {/* <Link to="/career">
                <Button type="button">Back Home</Button>
              </Link> */}
                      <div className="mt-3" style={{ fontSize: 12 }}>
                        Forgot Password ?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setForgot(true)
                          }}
                          className="btn btn-outline"
                        >
                          Reset Password
                        </button>
                      </div>

                      <div className="mt-3">
                        Don't have an account? <Link to="/career/register">Signup</Link>
                      </div>
                    </>
                  ) : null}
                </form>
              </div>
            ) : (
              <div className="login_container">
                <form onSubmit={handleforgot}>
                  <p className="container_title">Forget Password</p>
                  <input
                    type="email"
                    placeholder="enter the email you registered with"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input"
                  />
                  <button className="button" type="submit">
                    {loader ? 'Verifying' : 'Reset'}
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div className="login_container">
            <form onSubmit={forgotpassword}>
              <p className="container_title">Enter New Password</p>
              <input
                type="password"
                placeholder="enter a new password"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
                required
                className="input"
              />
              <button className="button" type="submit">
                {loader ? 'Verifying' : 'Reset'}
              </button>
            </form>
          </div>
        )}
      </>
      )}
    </>
  )
}

export default LoginCard
