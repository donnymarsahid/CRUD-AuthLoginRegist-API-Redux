import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Access/Login';
import Register from './Access/Register';
import AddContact from './CRUD/AddContact';
import Homepage from './CRUD/Homepage';
import UpdateContact from './CRUD/UpdateContact';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/addcontact" component={AddContact} />
          <Route path="/update/:id" component={UpdateContact} />
          {/* access */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
