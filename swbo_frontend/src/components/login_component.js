import React, { Component} from "react";
import {Redirect} from 'react-router'
import  styles from "../styles/login_style.module.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Home from "../components/home_component"
class Login extends Component{
	state = {
	    isSignedUp: false,
        username: "",
        password: "",
  }
  hangleUserChange = event => {
    this.setState({ username: event.target.value });
  }
  hanglePassChange = event => {
    this.setState({ password: event.target.value });
  }
  handleLogin = (item) => {
    const user = {
      username: this.state.username,
		password: this.state.password
    };
    axios.post(`/login/`,  user )
      .then(res => {
        if (res.status === 200) {
            this.setState({isSignedUp: true});
        }
      })
  }
    render(){
	    if (this.state.isSignedUp) {
         return <Redirect to = {{ pathname: "/home", component: Home }} />;
         }
    	return(
    		<div className={styles["body"]}>
				<div className={styles["back_image"]}>
    			<div className={styles["form-structor"]}>
					<div className={styles["center"]}>
						<h2 className={styles["form-title"]} id={styles["login"]}>Sign In</h2>
						<div className={styles["form-holder"]}>
                            <div className={styles["label"]}>Username</div>
							<input type="username" className={styles["input"]} placeholder="Username" onChange = {this.hangleUserChange}/>
							<div className={styles["label"]}>Password</div>
							<input type="password" className={styles["input"]} placeholder="Password" onChange = {this.hanglePassChange}/>
						</div>
						<button className={styles["submit-btn"]} onClick={this.handleLogin}>Sign In</button>
					</div>
				</div>
				</div>
    		</div>
		)
    }
}
export default Login