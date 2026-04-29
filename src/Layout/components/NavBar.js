import React, { useEffect, useState } from 'react'
import logo from '../../images/ng_logo.png'
import { NavLink, useLocation } from 'react-router-dom'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import CancelIcon from '@mui/icons-material/Cancel'
import LanguageSelector from '../../component/LanguageSelector'
import NavBarSticky from './NavBarSticky'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function NavBar() {
  const location = useLocation()
  const [openSub, setOpenSub] = useState('')
  const [openNav, setOpenNav] = useState(false)
  const [scrollChaNav, setScrollChaNav] = useState(false)

  useEffect(() => {
    if (openNav) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openNav]);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const handleSub = (name) => {
    if (name === openSub) {
      setOpenSub("");
    } else {
      setOpenSub(name);
    }
  }

  const changeNavBar = () => {
    if (window.scrollY >= 490) {
      setScrollChaNav(true)
    } else {
      setScrollChaNav(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNavBar)
    return () => {
      window.removeEventListener('scroll', changeNavBar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!location.pathname.includes("career") ? (
        <div className="navbar-container">
          <nav>
            <a className="ngEagleLogo" href="/">
              <img src={logo} alt="NG logo" />
            </a>

            <div className="desktop-view">
              {scrollChaNav ? <NavBarSticky /> :

                (
                  <>
                    <div className="border-bottom">
                      <ul>
                        <li>
                          <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                          <NavLink to="/about_us">About</NavLink>
                        </li>
                        {/* {menus?.map((menu, index) => ( */}
                        {/* <li key={index} className="menu text-nowrap"> */}
                        <li className="menu text-nowrap">
                          <a href={true}>Travel info</a>
                          <div className="menu-sub row">
                            <div className="col-3 border-end">
                              <img src={logo} alt="" />
                            </div>
                            <div className="col-9 pt-5">
                              <div className="row">
                                <div className="col-4 sub_details">
                                  <ul>
                                    <li>
                                      <NavLink to="/baggage_policy">Baggage Policy</NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/#">
                                        Refund Policy
                                      </NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="#">
                                        Fare Rules
                                      </NavLink>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-4 sub_details">
                                  <ul>
                                    <li>
                                      <NavLink to="#">
                                        Dangerous Goods Notice
                                      </NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/terms_and_condition">
                                        Term and Condition
                                      </NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/privacy_policy">
                                        Privacy Notice
                                      </NavLink>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* ))} */}

                        <li className="menu text-nowrap">
                          <a href={true}>Booking</a>
                          <div className="menu-sub row">
                            <div className="col-3 border-end">
                              <img src={logo} alt="" />
                            </div>
                            <div className="col-9 pt-5">
                              <div className="row">
                                <div className="col-4 sub_details">
                                  <ul>
                                    <li>
                                      <NavLink to="/group_booking">Group</NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/charter_sales">
                                        Charter
                                      </NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/corporate_sales">
                                        Corporate
                                      </NavLink>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-4 sub_details">
                                  <ul>
                                    <li>
                                      <NavLink to="/cargo_sales">
                                        Cargo
                                      </NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/travel_agent_sale">
                                        Travel Agent
                                      </NavLink>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <NavLink to="/career">Career</NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact_us">Contact</NavLink>
                        </li>
                      </ul>

                      <div className="buttons-div text-nowrap">
                        <button className="signup btn">Sign up</button>
                        <button className="login_button btn">Login</button>
                      </div>
                    </div>

                    <LanguageSelector />
                  </>
                )
              }
            </div>

            <div className="mobile-icon" onClick={handleNav}>
              <DensityMediumIcon fontSize="large" />
            </div>

            {openNav ? (
              <div className="mobile-view">
                <div className="foorcveNav mb-4">
                  <div className="d-flex justify-content-between foorcveNavM">
                    <div className=""><img src={logo} alt="NG logo" /></div>
                    <div className="foorcveNavIcon">
                      <CancelIcon fontSize="large" onClick={handleNav} />
                    </div>
                  </div>
                </div>
                <ul>
                  <li>
                    <div className="hhhjjueiwe">
                      <NavLink to="/">Home</NavLink>
                    </div>
                  </li>
                  <li>
                    <div className="hhhjjueiwe">
                      <NavLink to="/about_us">About Us</NavLink>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a
                        href={true}
                        onClick={() => handleSub("travel")}
                        style={{ width: "100%" }}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>Travel info</span>
                        {openSub === "travel" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </a>
                      {openSub === "travel" ? (
                        <ul className="sub_links">
                          <li>
                            <NavLink to="/baggage_policy">
                              Baggage Policy
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="#">Refund Policy</NavLink>
                          </li>
                          <li>
                            <NavLink to="#">
                              Fare Rules
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="#">
                              Dangerous Goods Notice
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/terms_and_condition">Term and Condition</NavLink>
                          </li>
                          <li>
                            <NavLink to="/privacy_policy">Privacy Notice</NavLink>
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  </li>

                  <li>
                    <div>
                      <a
                        href={true}
                        onClick={() => handleSub("miles")}
                        style={{ width: "100%" }}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>Booking</span>
                        {openSub === "miles" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </a>
                      {openSub === "miles" ? (
                        <ul className="sub_links">
                          <li>
                            <NavLink to="/group_booking">Group</NavLink>
                          </li>
                          <li>
                            <NavLink to="/charter_sales">
                              Charter
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/corporate_sales">Corporate</NavLink>
                          </li>
                          <li>
                            <NavLink to="/cargo_sales">Cargo</NavLink>
                          </li>
                          <li>
                            <NavLink to="/travel_agent_sale">
                              Travel Agent
                            </NavLink>
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div className="hhhjjueiwe">
                      <NavLink to="/contact_us">Contact Us</NavLink>
                    </div>
                  </li>
                </ul>

                <div className="buttons-div">
                  <button className="login_button btn">Login</button>
                  <button className="signup btn">Sign up</button>
                  <LanguageSelector />
                </div>
              </div>
            ) : null}


          </nav>
        </div>
      ) : null}
    </>
  );
}
