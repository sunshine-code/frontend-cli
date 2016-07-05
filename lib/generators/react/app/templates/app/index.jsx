import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { install } from "offline-plugin/runtime";

import Store from "./Store";
import App from "./App";

const ROOT_ELEMENT = document.getElementById("root");
const STORE = new Store();

render(
  <AppContainer>
    {App(STORE)}
  </AppContainer>,
  ROOT_ELEMENT
);

if (module.hot) {
  module.hot.accept("./App", () => {
    render(
      <AppContainer>
        {App(STORE)}
      </AppContainer>,
      ROOT_ELEMENT
    );
  });
}

// OfflinePlugin initialization, don't run anything after this
install();
