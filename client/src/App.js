import React, { Component } from "react";
import ResponsiveDrawer from "./components/navigation/AppNavMaterial";

//Redux files
import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Route, Switch } from "react-router-dom";

//Authentication
import { loadUser } from "./actions/authActions";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Import Components
//import EnhancedTableHead from "./components/About";
import category_component from "./components/category/categories_component";
import itemShopping from "./components/items/itemShopping";
import Home from "./components/Home";
import client_component from "./components/clients/client_component";
import about_components from "./components/about/about_components";
import sales_component from "./components/sales/sales_component";
import buyings_component from "./components/buyings/buyings_component";
import employee from "./components/employees/employees_component";

//Toastr Component
import ReduxToastr from "react-redux-toastr";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      //To use redux into the components, to get the things from the state we wrap everything into a provider
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <ResponsiveDrawer>
              <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
              />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sales" component={sales_component} />
                <Route path="/buyings" component={buyings_component} />
                <Route path="/shopping" component={itemShopping} />
                <Route path="/about" component={about_components} />
                <Route path="/category" component={category_component} />
                <Route path="/clients" component={client_component} />
                <Route path="/employees" component={employee} />
              </Switch>
            </ResponsiveDrawer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
