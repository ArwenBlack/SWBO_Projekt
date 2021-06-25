
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