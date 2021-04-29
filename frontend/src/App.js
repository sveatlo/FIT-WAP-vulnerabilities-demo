import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute, ProvideAuth } from "./auth";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/error_not_found";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/portal/home";
import { TransactionNew } from "./pages/portal/transaction_new";
import { TransactionsList } from "./pages/portal/transactions_list";
import { TransactionsListSecure } from "./pages/portal/transactions_list_secure";

import "./App.css";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Layout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/transactions/list/:filter?">
                  <TransactionsList />
                </Route>
                <Route path="/transactions/list-secure/:filter?">
                  <TransactionsListSecure />
                </Route>
                <Route path="/transactions/new">
                  <TransactionNew />
                </Route>
                <Route path="*">
                  <Redirect to="/404" />
                </Route>
              </Switch>
            </Layout>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
