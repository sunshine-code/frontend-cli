import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { install } from "offline-plugin/runtime";

import Store from "./Store";
import Routes from "./Routes";

const ROOT_ELEMENT = document.getElementById("root");
const STORE = new Store();

render(
  <AppContainer>
    <Provider store={STORE}>
      {Routes}
    </Provider>,
  </AppContainer>,
  ROOT_ELEMENT
);

if (module.hot) {
  module.hot.accept("./Routes", () => {
    render(
      <AppContainer>
        <Provider store={STORE}>
          {Routes}
        </Provider>,
      </AppContainer>,
      ROOT_ELEMENT
    );
  });
}

// OfflinePlugin initialization, don't run anything after this
install();
