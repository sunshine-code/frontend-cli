import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Root from "./components/Root";
import Sample from "./components/Sample";

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Sample} />
    </Route>
  </Router>
);
