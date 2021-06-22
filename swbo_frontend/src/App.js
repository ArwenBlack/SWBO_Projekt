import styles from './App.module.css';
import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login_component";
import Default from "./components/default_component"
import Register_component from "./components/register_component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home_component";
import Navbar_component from "./components/Navbar_component"
import Comments from "./components/comments_component";
class App extends Component {

    render() {
    return (<Router>

        <div className={styles["App"]}>
            <Navbar_component />
         <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Default} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register_component}/>
            <Route path="/home" component={Home}/>
            <Route path="/comments" component={Comments}/>
          </Switch>
        </div>
      </div>
        </div></Router>
    );
  }
}

export default App;
