import React, { Component} from "react";
import {Redirect} from 'react-router'
import  styles from "../styles/login_style.module.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import App from "../App";
import Navbar_component from "./Navbar_component";
class Login extends Component{
	state = {
	    isOpen: false,
	    isSignedUp: 0,
        username: "",
        password: "",
        user: {
	        username: "",
            password: ""
        }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
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
            localStorage.setItem('user', JSON.stringify(res.data))
            this.setState({isSignedUp: 1});
        }
      })
      .catch(error => {
            this.setState({isOpen:true});
        });
    }
    handleOpenModal = () => {
        this.setState({ isOpen: true });
	}

	handleCloseModal = () => {
        this.setState({ isOpen: false });
    }
    render(){
	    if (this.state.isSignedUp === 1) {
         return <Redirect to = "/forum" />;
         }
    	return(
    	    <div> <Navbar_component />
    		<div className={styles["body"]}>
				<div className={styles["back_image"]}>
    			<div className={styles["form-structor"]} >
					<div className={styles["center"]}>
						<h2 className={styles["form-title"]} id={styles["login"]}>Sign In</h2>
						<div className={styles["form-holder"]}>
                            <div className={styles["label"]} >Username</div>
							<input type="username"  onFocus={(e) => e.target.value = ""}  className={styles["input"]} placeholder="Username" onChange = {this.hangleUserChange}/>
							<div className={styles["label"]} >Password</div>
							<input type="password" onFocus={(e) => e.target.value = ""}  className={styles["input"]} placeholder="Password" onChange = {this.hanglePassChange}/>
						</div>
						<button className={styles["submit-btn"]} onClick={this.handleLogin}>Sign In</button>
					</div>
				</div>
				</div>
                <Modal isOpen={this.state.isOpen} onCloseModal={this.handleCloseModal}>
                    <ModalHeader >Warning</ModalHeader>
                    <ModalBody>
                    <span>
                        <text className="text">Wrong login or password!</text>
                    </span>
                    </ModalBody>
                     <ModalFooter>
                    <Button
                        color="danger"
                        onClick={this.handleCloseModal}
                    >Close</Button>
                    </ModalFooter>
                 </Modal>
    		</div>
            </div>
		)
    }
}
export default Login