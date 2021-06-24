import React, { Component} from "react";
import "../styles/home_style.module.css"
import Navbar_component from "./Navbar_component";
class Default extends Component{
    render(){
        return (
            <div>
                <Navbar_component />

            <form>
                <h3>AppName</h3>
            </form>
        </div>
        )
    }
}
export default Default;