import React from "react";
import "./App.css";
import PublicLayout from "./app/shared/layouts/public.layout";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateLayout from "./app/shared/layouts/privateLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/app" component={PublicLayout} />
          <Route path="/" component={PrivateLayout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
