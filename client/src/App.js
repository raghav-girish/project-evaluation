
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CoordinatorHome from "./Pages/admin/coordinatorHome";
import login from "./Pages/loginPage";
import facultyHome from "./Pages/faculty/facultyHome";
import Search from './Pages/searchEngine/SearchTest';
import Test from './Pages/searchEngine/Search';
import Test1 from './Pages/searchEngine/ImageTest';
import SearchHome from './Pages/SearchHome';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={SearchHome}></Route>         
          <Route exact path="/login" component={login}></Route> 
          <Route exact path="/test" component={Test}></Route> 
          <Route exact path="/test1" component={Test1}></Route> 
          <Route
            exact
            path="/coordinatorHome"
            component={CoordinatorHome}
          ></Route>
          <Route
            exact
            path="/facultyHome"
            component={facultyHome}
          ></Route>   
           <Route
            exact
            path="/search"
            component={Search}
          ></Route>      
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
