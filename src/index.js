import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        ></SnackbarProvider>
    <App />
  </React.StrictMode>
);
