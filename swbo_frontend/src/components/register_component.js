import React, { Component} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./home_component";
import styles from "../styles/register_style.module.css";
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"

class Register_component extends Component {
    state = {
        bad_pass: false,
	    isOpen: false,
	    isSignedUp: 0,
        username: "",
        password: "",
        password2: "",
        email: ""
    }
    handleUserChange = event => {
        this.setState({ username: event.target.value });
    }

    handlePassChange = event => {
        this.setState({ password: event.target.value });
    }
    hasNumbers(t)
    {
        var regex = /\d/g;
        return regex.test(t);
    }
    checkPass = event => {
        if (event.target.value.length < 8){
            document.getElementById('err').innerHTML = 'Password to short. Need at least 8 characters'
            if (!this.hasNumbers(event.target.value)){
                document.getElementById('err').innerHTML += '. Password too common'
            }
        }
        else if (event.target.value.length >= 8 && !this.hasNumbers(event.target.value)){
            document.getElementById('err').innerHTML = 'Password too common'
        }
        else{
            document.getElementById('err').innerHTML = ''
        }
    }


    handlePass2Change = event => {
        this.setState({password2: event.target.value});
    }

    checkPassC = event => {
        if (!(event.target.value === this.state.password)){
            document.getElementById('errcheck').innerHTML = 'Passwords are not equal'
        }
        else {
            document.getElementById('errcheck').innerHTML = ''
        }
    }
    checkMail = event => {
        if (!event.target.value.match(/\S+@\S+\.\S+/)){
            document.getElementById('errmail').innerHTML = 'Email not valid'
        }
        else if( event.target.value.indexOf(' ')!==-1 || event.target.value.indexOf('..')!==-1){
            document.getElementById('errmail').innerHTML = 'Email not valid'
        }
        else{
            document.getElementById('errmail').innerHTML = ''
        }
    }


    handleEmailChange = event => {
        this.setState({email: event.target.value});
    }

    handleRegister = (item) => {
    const user = {
        username: this.state.username,
		password: this.state.password,
        password2: this.state.password2,
        email: this.state.email
    };
    axios.post(`/create_user/`,  user)
      .then(res => {
        if (res.status === 201) {
            this.setState({isSignedUp: 1});
        }
      })
      .catch(error => {
            this.setState({isOpen:true});
            if (error.response.request.response.includes("A user with that username already exists."))
                document.getElementById("bad_register_cred").innerHTML += "A user with that username already exists."
            if (error.response.request.response.includes("This field must be unique."))
                document.getElementById("bad_register_cred").innerHTML += "<br /> This e-mail address is already in use."
            if (error.response.request.response.includes("This field may not be blank."))
                document.getElementById("bad_register_cred").innerHTML += "<br /> Please complete all fields."
            else
                document.getElementById("bad_register_cred").innerHTML  = "An error occurred. Please try again"
        });
    }
    handleOpenModal = () => {
        this.setState({ isOpen: true });
	}

	handleCloseModal = () => {
        this.setState({ isOpen: false });
    }

   render() {
       return (
           <div className={styles["body"]}>
               <div className={styles["back_image"]}>
                   <div className={styles["form-structor"]}>
                       <div className={styles["center"]}>
                           <h2 className={styles["form-title"]} id={styles["login"]}>Register</h2>
                           <div className={styles["form-holder"]}>
                               <div className={styles["label"]}>Username</div>
                                    <input type="username" onFocus={(e) => e.target.value = ""} className={styles["input"]}
                                        placeholder="Username" onChange={this.handleUserChange}/>
                               <div className={styles["label"]}>Password</div>
                                    <input type="password" onFocus={(e) => e.target.value = ""} className={styles["input"]}
                                        placeholder="Password" onChange={this.handlePassChange} onKeyUp={this.checkPass}/>
                                        <div className={styles["label1"]} id = 'err'> </div>
                               <div className={styles["label"]}>Confirm Password</div>
                                    <input type="password" onFocus={(e) => e.target.value = ""} className={styles["input"]}
                                        placeholder="Password" onChange={this.handlePass2Change} onKeyUp={this.checkPassC}/>
                                        <div className={styles["label1"]} id = 'errcheck'> </div>
                               <div className={styles["label"]}>Email</div>
                                    <input type="email" onFocus={(e) => e.target.value = ""} className={styles["input"]}
                                        placeholder="Email" onChange={this.handleEmailChange} onKeyUp = {this.checkMail}/>
                                        <div className={styles["label1"]} id = 'errmail'> </div>
                           </div>
                           <button className={styles["submit-btn"]} onClick={this.handleRegister}>Register</button>
                       </div>
                   </div>
               </div>
               <Modal isOpen={this.state.isOpen} onCloseModal={this.handleCloseModal}>
                    <ModalHeader >Wrong data</ModalHeader>
                    <ModalBody>
                    <span>
                        <text className="text" id = "bad_register_cred"> </text>
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
       )
   }
}

export default Register_component;