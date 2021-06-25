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

export default class CreateCommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: this.props.activeItem,
    };
  }
    handleChange = (e) => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true}  toggle={toggle}>
        <ModalHeader toggle={toggle}>Create new comment </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                id="post-content"
                name = "content"
                value={this.state.activeItem.content}
                onChange={this.handleChange}
                placeholder="Enter content"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}