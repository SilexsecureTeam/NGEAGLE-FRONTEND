import React, { useEffect, useState } from 'react'
import logo from '../../images/ng_logo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import CancelIcon from '@mui/icons-material/Cancel'
import LanguageSelector from '../../component/LanguageSelector'
import NavBarSticky from './NavBarSticky'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import useRequest from '../../hooks/useRequest'
// import {  }

export default function NavBar({ selected, setSelected }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openSub, setOpenSub] = useState('')
  const [openNav, setOpenNav] = useState(false)
  const [scrollChaNav, setScrollChaNav] = useState(false)
  const { data: menus, fetchData: fetchMenus } = useRequest('menu', 'POST')
  const { data: submenus, fetchData: fetchSubmenus } = useRequest('submenu', 'POST')

  useEffect(() => {
    fetchMenus();
    fetchSubmenus();
  }, []);

  useEffect(() => {
    if (openNav) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openNav]);

  useEffect(() => {
    setOpenNav(false);
  }, [navigate]);

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
    if(window.scrollY >= 490){
    setScrollChaNav(true)
    }else {
    setScrollChaNav(false)
    }
}
window.addEventListener('scroll', changeNavBar)

  return (
    <>
      {!location.pathname.includes("career") ? (
        <div className="navbar-container">
          <nav>
            <a className="ngEagleLogo" href="/">
              <img src={logo} alt="NG logo" />
            </a>

            <div className="desktop-view">
              { scrollChaNav ? <NavBarSticky /> :

              (
              <>
              <div className="border-bottom">
                <ul>
                  {menus?.map((menu, index) => (
                    <li key={index} className="menu text-nowrap">
                      <a href={true}>Travel info</a>
                      <div className="menu-sub row">
                        <div className="col-3 border-end"> 
                          <img src={logo} alt="" />
                        </div>
                        <div className="col-9 pt-5">
                          <div className="row">
                            <div className="col-4 sub_details">
                              <p>{menu?.title}</p>
                              <ul>
                                <li>
                                  <NavLink to="/about_us">Who are we</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/baggage_policy">
                                    Extra Luggages
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink>Car Park deals</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/group_booking">
                                    Group Booking
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/cargo_sales">
                                    Cargo Sales
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                            <div className="col-4 sub_details">
                              <p>Flight Deal</p>
                              <ul>
                                <li>
                                  <NavLink to="/travel_extras">
                                    Travel Extras
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/tourist_attraction">
                                    Tourist Attraction
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/car_rental">
                                    Car Rental Services
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/charter_sales">
                                    Chartered Services
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/terms_and_condition">
                                    Terms and Condition
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                            <div className="col-4 sub_details">
                              <p>Safer Travel</p>
                              <ul>
                                <li>
                                  <NavLink to="/news">News on NGEagle</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/privacy_policy">
                                    Privacy Policy
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/terms_and_condition">
                                    Terms and Condition
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  <li className="menu text-nowrap">
                    <a href={true}>Eagle Miles</a>
                    <div className="menu-sub row">
                      <div className="col-3 border-end">
                        <img src={logo} alt="" />
                      </div>
                      <div className="col-9 pt-5">
                        <div className="row">
                          <div className="col-4 sub_details">
                            <p>Travel Extra</p>
                            <ul>
                              <li>
                                <NavLink to="/about_us">Who are we</NavLink>
                              </li>
                              <li>
                                <NavLink to="/baggage_policy">
                                  Extra Luggages
                                </NavLink>
                              </li>
                              <li>
                                <NavLink>Car Park deals</NavLink>
                              </li>
                            </ul>
                          </div>
                          <div className="col-4 sub_details">
                            <p>Flight Deal</p>
                            <ul>
                              <li>
                                <NavLink to="/travel_extras">
                                  Travel Extras
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/tourist_attraction">
                                  Tourist Attraction
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/car_rental">
                                  Car Rental Services
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/charter_services">
                                  Charter Services
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          <div className="col-4 sub_details">
                            <p>Safer Travel</p>
                            <ul>
                              <li>
                                <NavLink to="/news">News on NGEagle</NavLink>
                              </li>
                              <li>
                                <NavLink to="/privacy_policy">
                                  Privacy Policy
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/terms_and_condition">
                                  Terms and Condition
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
                <div className="foorcveNav">
                  <div className="d-flex justify-content-between foorcveNavM">
                    <div className=""><img src={logo} alt="NG logo" /></div>
                    <div className="foorcveNavIcon">
                      <CancelIcon fontSize="large" onClick={handleNav} />
                    </div>
                  </div>
                </div>
                <ul>
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
                            <NavLink to="/about_us">Who are we</NavLink>
                          </li>
                          <li>
                            <NavLink to="/baggage_policy">
                              Extra Luggages
                            </NavLink>
                          </li>
                          <li>
                            <NavLink>Car Park deals(coming soon)</NavLink>
                          </li>
                          <li>
                            <NavLink to="/travel_extras">Travel Extras</NavLink>
                          </li>
                          <li>
                            <NavLink to="/tourist_attraction">
                              Tourist Attraction
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/car_rental">
                              Car Rental Services
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/group_booking">Group Booking</NavLink>
                          </li>
                          <li>
                            <NavLink to="/cargo_sales">Cargo Sales</NavLink>
                          </li>
                          <li>
                            <NavLink to="/news">News on NGEagle</NavLink>
                          </li>
                          <li>
                            <NavLink to="/privacy_policy">
                              Privacy Policy
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/terms_and_condition">
                              Terms and Condition
                            </NavLink>
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
                        <span>Eagle Miles</span>
                        {openSub === "miles" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </a>
                      {openSub === "miles" ? (
                        <ul className="sub_links">
                          <li>
                            <NavLink to="/about">Who are we</NavLink>
                          </li>
                          <li>
                            <NavLink to="/baggage_policy">
                              Extra Luggages
                            </NavLink>
                          </li>
                          <li>
                            <NavLink>Car Park deals(coming soon)</NavLink>
                          </li>
                          <li>
                            <NavLink to="/travel_extras">Travel Extras</NavLink>
                          </li>
                          <li>
                            <NavLink to="/tourist_attraction">
                              Tourist Attraction
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/car_rental">
                              Car Rental Services
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/news">News on NGEagle</NavLink>
                          </li>
                          <li>
                            <NavLink to="/privacy_policy">
                              Privacy Policy
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/terms_and_condition">
                              Terms and Condition
                            </NavLink>
                          </li>
                        </ul>
                      ) : null}
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
