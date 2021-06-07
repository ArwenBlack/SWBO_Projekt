
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {Redirect} from 'react-router'
import Login from "./login_component";

export default class CustomModal extends Component {
  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader >Warning</ModalHeader>
        <ModalBody>
              <span>
              <text className="text">Wrong login or password!</text>
                </span>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
           //onClick={this.handleClose}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}