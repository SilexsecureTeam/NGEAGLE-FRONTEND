# NG Eagle — Airline Website, Booking & Career Portal (Frontend)

Public-facing React frontend for **NG Eagle Limited** (ngeagle.com): flight search/booking flow, hotel/taxi/cafe extras, informational pages, and a separate **Careers portal** (job listings, applications, candidate login).

This README replaces the default Create React App boilerplate that shipped with the repository, with project-specific setup, structure, and configuration notes for the receiving technical team.

---

## Tech Stack

| Layer         | Technology                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Framework     | React 18 (Create React App / `react-scripts` 5)                                                   |
| Routing       | React Router v6                                                                                   |
| HTTP          | Axios + `axios-hooks`                                                                             |
| UI / Styling  | MUI (Material UI) + Emotion, Bootstrap 5 + React-Bootstrap, styled-components, Tailwind CSS, Sass |
| Payments      | Paystack (`react-paystack`)                                                                       |
| Date/Calendar | MUI X Date Pickers, `daterangepicker` (jQuery-based), `dayjs`, `moment`                           |

> The project currently ships **four styling systems** (MUI/Emotion, Bootstrap, styled-components, Tailwind) and **two date libraries** (`dayjs`, `moment`) plus a jQuery-dependent date-range picker alongside MUI's own date picker.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended) and npm
- Access to the backend API (see [Configuration](#configuration) — currently hardcoded, not environment-driven)

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

Starts the dev server on **port 3001** (overridden in `package.json`, not CRA's default 3000):

```json
"start": "set PORT=3001 && react-scripts start"
```

> Note: `set PORT=3001` is Windows `cmd` syntax. On macOS/Linux this will not set the variable correctly — use `cross-env` or `PORT=3001 react-scripts start` instead if running outside Windows.

### Build for production

```bash
npm run build
```

Outputs an optimized static build to `/build`, ready to be served by Plesk/Nginx/Apache per the deployment workflow in the project's handover documentation.

### Test

```bash
npm test
```

---

## Configuration

There is currently **no `.env` file or environment-variable-driven configuration** in this repository. API base URLs are hardcoded directly in source:

**Main site** — `src/axios.js`

```js
export const url = "https://stock.ngeagle.com/";
// other commented-out endpoints are left in the file (staging/demo URLs)
```

**Recommended fix:** move both values into `.env` (`REACT_APP_API_URL`, `REACT_APP_CAREER_API_URL`), commit a `.env.example` with placeholder values, and delete the commented-out dead URLs once confirmed unused.

---

## Project Structure

```
public/                     Static assets, index.html, manifest.json, searchapi.js
src/
├── App.js                  Root component / route definitions
├── axios.js                Main-site API client + base URL
├── SystemGuard.js          (route/auth guard — verify usage)
├── PassengersData.js       Passenger form data model
│
├── Layout/                 Header, Footer, nav variants, flight booking widgets
│   └── components/
│       ├── BookFlight/     Flight search & booking widget
│       └── NavBar*.js      Multiple nav implementations (see Known Issues)
│
├── PLANE/                  Home/landing "Plane" page variant
│
├── career/                 Careers portal (separate mini-app)
│   ├── url.js               Career-portal API base URL
│   ├── components/          Job cards, header, nav
│   └── pages/                Jobs listing, job details, applications, login/OTP,
│                              registration, candidate profile, saved jobs
│
├── component/               Shared components: About, ChatBot, Deals & Offers,
│                              Hotel/Taxi/Dish cards, Luggage/Baggage, Terms &
│                              Policies, Tourist info, language selector, modal
│
├── context/                 FlightBookingContext (React Context state)
├── hooks/                   useFetchImages, useRequest
├── pages/                   Route-level pages: About, Contact, Cafe, Deals,
│                              Hotel Rental, Luggage Policy, News, Taxi Rental,
│                              Terms, Travel Agent/Corporate Sales, 404
├── style/                    Page/feature-level CSS
├── utilities/                 constants.js, utils.js
└── images/                    Icons, SVGs
```

---

## Key Modules

- **Flight booking flow** — `Layout/components/BookFlight/`, `Layout/components/FlightBooking*.js`, `context/FlightBookingContext.js`, `PassengersData.js`
- **Careers portal** — `src/career/` is effectively a self-contained sub-application with its own API base URL, auth pages (login, OTP, registration), and job browsing/application flow
- **Travel extras** — Hotel, Taxi Rental, Cafe, Deals & Offers, Tourist info components under `component/` and corresponding `pages/`
- **Support widget** — `component/ChatBot/`
- **Payments** — Paystack integration via `react-paystack` (search codebase for usage before assuming it's wired into the live booking flow)

---

## Dependency Reference

| Package                                                                     | Purpose                                                                               |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `react`, `react-dom`, `react-scripts`                                       | Core framework + CRA build tooling                                                    |
| `react-router-dom`                                                          | Client-side routing                                                                   |
| `axios`, `axios-hooks`                                                      | HTTP client and React data-fetching hooks                                             |
| `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` | Material UI component library                                                         |
| `@mui/x-date-pickers`, `dayjs`                                              | Calendar / date picker components                                                     |
| `daterangepicker`, `jquery`                                                 | Legacy jQuery date-range picker (jQuery is a dependency of this package specifically) |
| `moment`                                                                    | Legacy date library — overlaps with `dayjs`, candidate for removal                    |
| `bootstrap`, `react-bootstrap`                                              | Bootstrap CSS framework + React bindings                                              |
| `styled-components`                                                         | CSS-in-JS (third styling system in use)                                               |
| `tailwindcss` (dev)                                                         | Utility-first CSS framework (fourth styling system in use)                            |
| `sass`                                                                      | SCSS compilation                                                                      |
| `react-paystack`                                                            | Paystack payment integration                                                          |
| `react-modal`, `sweetalert2`                                                | Modals and alert dialogs                                                              |
| `react-multi-carousel`, `swiper`                                            | Two separate carousel/slider libraries                                                |
| `react-icons`                                                               | Icon set                                                                              |
| `html-to-react`                                                             | Parses raw HTML strings into React elements                                           |
| `country-state-city`                                                        | Country/state/city datasets for forms                                                 |
| `web-vitals`                                                                | Performance metric reporting                                                          |
| `@testing-library/*`                                                        | Testing utilities (dev)                                                               |

---

## Support / Ownership

- **Client:** NG Eagle Limited
- **Original consultant:** Silex Secure Lab
- For infrastructure access (Plesk, hosting credentials, backend/CMS repository, database), refer to the separate project handover package — this repository covers the frontend only.
