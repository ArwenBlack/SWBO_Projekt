import styles from './App.module.css';
import {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login_component";
import Default from "./components/default_component"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (<Router>
        <div className={styles["App"]}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                        <li className="nav navbar-nav navbar-left">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                  </ul>
                  <li className="nav navbar-nav navbar-right">
                      <Link className="nav-link" to={"/login"}>Login</Link>
                  </li>
              </div>
          </nav>
         <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Default} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
        </div></Router>
    );
  }
}

export default App;
