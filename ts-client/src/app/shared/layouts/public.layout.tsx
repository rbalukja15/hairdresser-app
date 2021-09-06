import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import PublicNavbar from "../components/partials/header";
import Footer from "../components/partials/footer";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../modules/auth/authSlice";

const PublicLayout = () => {
  const loggedIn = useAppSelector(selectAuth);

  if (!loggedIn) {
    return (
      <div>
        <PublicNavbar>
          <Switch>
            {/*<Route exact path="/app/login" component={Login} />*/}
          </Switch>
        </PublicNavbar>
        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default withRouter(PublicLayout);
