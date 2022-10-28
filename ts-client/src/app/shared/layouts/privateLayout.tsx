import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Footer from '../components/partials/footer';
import PublicNavbar from '../components/partials/header';
import { Counter } from '../../../features/counter/Counter';
import { useAppSelector } from '../../hooks';
import { selectAuth } from '../../modules/auth/authSlice';
import Product from '../../modules/product/pages';
import Buying from '../../modules/buying/pages';
import Sale from '../../modules/sale/pages';

const PrivateLayout = () => {
    const { loggedIn } = useAppSelector(selectAuth);

    return (
        <div>
            <PublicNavbar>
                {/*{loggedIn ? (*/}
                <Switch>
                    <Route exact path={'/counter'} component={Counter} />
                    <Route exact path={'/products'} component={Product} />
                    <Route exact path={'/buyings'} component={Buying} />
                    <Route exact path={'/sales'} component={Sale} />
                </Switch>
                {/*) : (*/}
                {/*    <Redirect to="/app/login" />*/}
                {/*)}*/}
            </PublicNavbar>
            <Footer />
        </div>
    );
};

export default withRouter(PrivateLayout);
