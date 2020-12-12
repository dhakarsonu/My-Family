import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './component/dashboard';
import Login from './component/login';
import Signup from './component/signup';
const App = ({ history }) => (
    <Router history={history}>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Router>
);

export default App;