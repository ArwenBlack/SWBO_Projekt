
import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav, Container, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class Navbar_component extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            something: true
        }
    }

    componentDidMount = () =>{
        this.handleNavBar()
    }
    handleNavBar = () => {
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            this.setState({loggedIn: true})
        }
    }
    handleNavBarHelper = () => {
        this.setState({loggedIn: true})
    }
    handleLogOut = () => {
        localStorage.removeItem('user')
        this.setState({loggedIn: false})
    }
    render(){
        return(
            <>
                {!this.state. loggedIn && (
          //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
          //     <div className="collapse navbar-collapse" id="navbarText">
          //         <ul className="navbar-nav mr-auto">
          //               <li className="nav navbar-nav navbar-left">
          //                   <Link className="nav-link" to={"/"}>Home</Link>
          //               </li>
          //         </ul>
          //         <li className="nav navbar-nav navbar-right">
          //             <Link className="nav-link" to={"/login"}>Login</Link>
          //             <Link className="nav-link" to={"/register"}>Register</Link>
          //         </li>
          //     </div>
          // </nav>
                    <Navbar bg="light" variant="light" expand="lg" sticky="top">
                <Nav className="container-fluid">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Nav>
            </Navbar>
                )}
        {this.state.loggedIn && (
            <Navbar bg="light" variant="light" expand="lg" sticky="top">
                <Nav className="container-fluid">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link>Hi {JSON.parse(localStorage.getItem('user')).user.username}</Nav.Link>
                        <Nav.Link href="/forum">Forum</Nav.Link>
                        <Nav.Link onClick = {this.handleLogOut} href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Nav>
            </Navbar>
        )}
        </>

        )
    }

}

export default Navbar_component