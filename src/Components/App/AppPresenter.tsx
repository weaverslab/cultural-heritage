import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import Detail from "../../Routes/Detail";
import Home from "../../Routes/Home";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;
const MobileSizeView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const AppPresenter: React.FunctionComponent = () => (
  <Wrapper>
    <MobileSizeView>
      <BrowserRouter>
        <Switch>
          <Route path={routes.home} exact={true} component={Home} />
          <Route path={routes.detail} exact={true} component={Detail} />
          <Redirect from={"*"} to={"/"} />
        </Switch>
      </BrowserRouter>
    </MobileSizeView>
  </Wrapper>
);

export default AppPresenter;
