import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventListing from './components/EventListing/EventListing';
import EventBooking from './components/EventBooking/EventBooking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={EventListing} />
          <Route path="/eventbooking/:eventId" component={EventBooking} />
          <Route render={() => <h2>404 Page Not Found</h2>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
