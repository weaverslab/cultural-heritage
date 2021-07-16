import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorkerRegistration.register();
