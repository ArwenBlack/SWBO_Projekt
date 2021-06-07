
import React, { Component} from "react";
import {Redirect} from 'react-router'
import  styles from "../styles/home_style.module.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import App from "../App";

class Home extends Component {
    render(){
        return (
            <form>
                <h3>Loged in</h3>
            </form>
        )
    }
}

export default Home;