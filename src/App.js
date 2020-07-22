import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ImageView from "./ImageView";
import Home from "./Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} exact />
      <Route path="/image" component={ImageView} />
      hi
    </Switch>
  </BrowserRouter>
);

export default App;
