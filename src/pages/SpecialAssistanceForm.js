import React from 'react'
import image from '../images/special-img.png'
import '../style/specialAssistForm.css'

const SpecialAssistanceForm = () => {
  // const [formData, setFormData] = useState({
  //   fullname: '',
  //   ticket: '',
  //   phone: '',
  //   email: '',
  //   seat_type: '',
  //   assistance: '',
  //   wheelchair: '',
  //   disability_ass: '',
  // })

  // const {
  //   assistance,
  //   disability_ass,
  //   email,
  //   fullname,
  //   phone,
  //   seat_type,
  //   ticket,
  //   wheelchair,
  // } = formData

  // const onChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div>
        <div className="">
          <img src={image} alt="" className="img-fluid hero_img" />
        </div>
      </div>

      <div className="assist-body">
        <div className="title">
          <center>Special Assistance Form</center>
        </div>

        <div className="form-container">
          <form onSubmit={onSubmit}>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Full Name</span>
              </div>
              <input className="form-control" aria-label="Full Name" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Email</span>
              </div>
              <input className="form-control" aria-label="Email" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Phone Number</span>
              </div>
              <input className="form-control" aria-label="phone number" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Ticket No.</span>
              </div>
              <input className="form-control" aria-label="Ticket Number" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Full Name</span>
              </div>
              <input className="form-control" aria-label="Full Name" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Do you Require</span>
              </div>
              <input className="form-control" aria-label="do you require" />
            </div>

            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">Depending Air</span>
              </div>
              <input className="form-control" aria-label="Depending air" />
            </div>

            <div>
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SpecialAssistanceForm
