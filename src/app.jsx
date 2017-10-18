import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const AddExpensePage = () => (
  <div>My add expense component</div>
)

const EditExpencePage = () => (
  <div>Edit Expenses</div>
)

const ExpenseDashboardPage = (props) => (
  <div>
    Dashboard component
  </div>
)

const HelpPage = () => (
  <div>Help Page</div>
)

const NotFoundPage = () => (
  <div>
    404  - <Link to="/">Go Home</Link>
  </div>
)

const Header = () => (
  <hearde>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
  </hearde>
)

const routes = (
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

ReactDOM.render(routes, document.getElementById('app'))
