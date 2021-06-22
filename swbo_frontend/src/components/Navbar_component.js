
import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class Navbar_component extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            something: true
        }
    }

    componentDidMount = () =>{
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            this.setState({loggedIn: true})
        }
    }
    handleLogOut = () => {
        localStorage.removeItem('user')
        this.setState({loggedIn: false})
    }
    render(){
        return(
            <div className="NavBar">
                {!this.state. loggedIn && (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                        <li className="nav navbar-nav navbar-left">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                  </ul>
                  <li className="nav navbar-nav navbar-right">
                      <Link className="nav-link" to={"/login"}>Login</Link>
                      <Link className="nav-link" to={"/register"}>Register</Link>
                  </li>
              </div>
          </nav>
                )}
        {this.state.loggedIn && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                        <li className="nav navbar-nav navbar-left">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                  </ul>
                  <li className="nav navbar-nav navbar-right">

                      <Link className="nav-link" to={"/home"}>Hi {JSON.parse(localStorage.getItem('user')).user.username}</Link>
                      <Link className="nav-link" onClick = {this.handleLogOut} to={"/"}>Logout</Link>
                  </li>
              </div>
          </nav>)}
        </div>

        )
    }
}

export default Navbar_component