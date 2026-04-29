import React, { Suspense, useEffect, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import "./style/header.css";

// Critical Layout Components (Standard Imports for immediate UI stability)
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Loader from "./component/Loaders/Loader";
import Announcements from "./component/Announcements";
import GoogleTranslate from "./component/googleTranslate";
import FloatingIcons from "./component/FloatingIcons";
import PassengersProvider from "./context/FlightBookingContext";
import { staticPages } from "./utilities/utils";

// Lazy Loaded Components
const Home = lazy(() => import("./component/homePage/Home"));
const About = lazy(() => import("./pages/About"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const LuggagePolicy = lazy(() => import("./pages/LuggagePolicy"));
const TravelExtra = lazy(() => import("./pages/TravelExtra"));
const Cafe = lazy(() => import("./pages/Cafe"));
const TaxiRental = lazy(() => import("./pages/TaxiRental"));
const CafeDetails = lazy(() => import("./pages/CafeDetails"));
const DealAndOffer = lazy(() => import("./pages/DealAndOffer"));
const SpecialAssistance = lazy(() => import("./pages/SpecialAssistance"));
const SpecialAssistanceForm = lazy(
  () => import("./pages/SpecialAssistanceForm"),
);
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const News = lazy(() => import("./pages/News"));
const NewsDetails = lazy(() => import("./pages/NewsDetails"));
const HotelRental = lazy(() => import("./pages/HotelRental"));
const Privacy = lazy(() => import("./component/Privacy"));
const Terms = lazy(() => import("./component/Terms"));
const TAndCs = lazy(() => import("./pages/Terms"));
const Tourist = lazy(() => import("./component/Turist/Tourist"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UtilPagesWrapper = lazy(() => import("./pages/UtilPagesWrapper"));

// Career Section Lazy Loads
const Career = lazy(() => import("./career/pages"));
const CareerHome = lazy(() => import("./career/pages/home"));
const AllJobs = lazy(() => import("./career/pages/AllJobs"));
const JobDetails = lazy(() => import("./career/pages/JobDetails"));
const Applications = lazy(() => import("./career/pages/Applications"));
const Saved = lazy(() => import("./career/pages/Saved"));
const Profile = lazy(() => import("./career/pages/Profile"));
const LoginContainer = lazy(() => import("./career/pages/LoginContainer"));
const LoginOtp = lazy(() => import("./career/pages/LoginOtp"));
const RegContainer = lazy(() => import("./career/pages/RegContainer"));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <PassengersProvider>
      <GoogleTranslate />
      <Announcements />
      <Header />

      <main>
        {/* Suspense handles the loading state while lazy chunks are fetched */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about_us" element={<AboutUs />} />

            <Route
              path="charter_sales"
              element={
                <UtilPagesWrapper
                  {...staticPages.chartered_sales}
                  path="charter_sales"
                />
              }
            />
            <Route
              path="group_booking"
              element={
                <UtilPagesWrapper
                  {...staticPages.group_booking}
                  path="group_booking"
                />
              }
            />
            <Route
              path="travel_agent_sale"
              element={
                <UtilPagesWrapper
                  {...staticPages.group_booking}
                  path="travel_agent_sale"
                />
              }
            />
            <Route
              path="cargo_sales"
              element={
                <UtilPagesWrapper
                  {...staticPages.cargo_sales}
                  path="cargo_sales"
                />
              }
            />
            <Route
              path="corporate_sales"
              element={
                <UtilPagesWrapper
                  {...staticPages.cargo_sales}
                  path="corporate_sales"
                />
              }
            />

            <Route path="baggage_policy" element={<LuggagePolicy />} />
            <Route path="travel_extras" element={<TravelExtra />} />
            <Route path="cafe" element={<Cafe />} />
            <Route path="car_rental" element={<TaxiRental />} />
            <Route path="cafe_details/:id" element={<CafeDetails />} />
            <Route path="deals_offer" element={<DealAndOffer />} />
            <Route path="deals_offer/:id" element={<DealAndOffer />} />
            <Route path="special_assistance" element={<SpecialAssistance />} />
            <Route
              path="special_assistance_form"
              element={<SpecialAssistanceForm />}
            />
            <Route path="privacy_policy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="tourist_attraction" element={<Tourist />} />
            <Route path="contact_us" element={<ContactUs />} />
            <Route path="contact_page" element={<ContactUsPage />} />
            <Route path="terms_and_condition" element={<TAndCs />} />
            <Route path="news" element={<News />} />
            <Route path="news_details/:id" element={<NewsDetails />} />
            <Route path="hotel_rental" element={<HotelRental />} />

            {/* Career Nested Routes */}
            <Route path="career" element={<Career />}>
              <Route index element={<CareerHome />} />
              <Route path="jobs" element={<AllJobs />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="search/:query" element={<AllJobs />} />
              <Route path="applications" element={<Applications />} />
              <Route path="saved" element={<Saved />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<LoginContainer />} />
              <Route path="login_otp" element={<LoginOtp />} />
              <Route path="verify/:token" element={<LoginContainer />} />
              <Route path="verify" element={<RegContainer />} />
              <Route path="register" element={<RegContainer />} />
            </Route>

            {/* CATCH-ALL: Must be the last route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <FloatingIcons />
      <Footer />
    </PassengersProvider>
  );
}

export default App;
