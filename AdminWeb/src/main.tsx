import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./app/App";
import "./assets/theme/theme.css";
import "primeicons/primeicons.css";
import "./i18n";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
