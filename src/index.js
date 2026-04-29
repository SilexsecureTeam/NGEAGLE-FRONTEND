import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";

// 👇️ IMPORTANT: div ID has to match with index.html
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>,
);
