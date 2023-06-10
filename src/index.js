import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
window.Popper = require("popper.js").default;

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>,
  document.getElementById("app")
);

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}