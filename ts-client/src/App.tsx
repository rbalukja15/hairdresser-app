import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import PrivateLayout from './app/shared/layouts/privateLayout';
import PublicLayout from './app/shared/layouts/public.layout';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
