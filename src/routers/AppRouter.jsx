import React from 'react'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'

import AddExpensePage from '../components/AddExpensePage.jsx'
import EditExpencePage from '../components/EditExpencePage.jsx'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.jsx'
import Header from '../components/Header.jsx'
import HelpPage from '../components/HelpPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/edit" component={EditExpencePage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
