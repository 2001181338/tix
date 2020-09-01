import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routesHome } from './routes';
import Navbar from './Components/Navbar';
import './css/main.css'
function App() {
  const showHomeLayout = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return <Route key={index} exact={item.exact} path={item.path} component={item.component} />
      })
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {showHomeLayout(routesHome)}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
