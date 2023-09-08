/* eslint-disable react/no-deprecated */
import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

