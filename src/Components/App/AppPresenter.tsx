import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
  } from "react-router-dom";
import routes from "../../routes";
import Home from "../../Routes/Home";

const AppPresenter: React.FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.home} exact={true} component={Home} />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  </BrowserRouter>
);

export default AppPresenter;
