import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import { routesAdmin, routesHome, } from './routes';
import './css/main.css'
import HomeTemplate from './Template/HomeTemplate'
import AdminTemlate from './Template/AdminTemplate'
function App() {
  const showHomeLayout = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return <HomeTemplate key={index} exact={item.exact} path={item.path} Component={item.component} />
      })
    }
  }
  const showAdminLayout = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return <AdminTemlate key={index} exact={item.exact} path={item.path} Component={item.component} />
      })
    }
  }
  
  return (
    <BrowserRouter>
      <Switch>
        {showHomeLayout(routesHome)}

        {showAdminLayout(routesAdmin)}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
