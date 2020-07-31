import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

// ITEM MODEL FOR Modal

// name: {type: String,required: true,},
// client: {type: String,required: true,},
// agency: {type: String,},
// playbackURL: {type: String,required: true,},
// dateCreated: {type: Date,default: Date.now,},
// dateTransmitting: {type: Date,default: Date.now,},

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    client: "",
    agency: "",
    playbackURL: "",
    dateTX: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      client: this.state.client,
      agency: this.state.agency,
      playbackURL: this.state.playbackURL,
      dateTX: this.state.dateTX,
    };

    // Add item via addItem actions
    this.props.addItem(newItem);
    // Close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Video Stream to List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Stream Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Stream Name"
                  onChange={this.onChange}
                />
                <Label for="client">Client</Label>
                <Input
                  type="text"
                  name="client"
                  id="client"
                  placeholder="Client"
                  onChange={this.onChange}
                />
                <Label for="agency">Agency</Label>
                <Input
                  type="text"
                  name="agency"
                  id="agency"
                  placeholder="Agency"
                  onChange={this.onChange}
                />
                <Label for="playbackURL">Amazon IVS Playback URL</Label>
                <Input
                  type="text"
                  name="playbackURL"
                  id="playbackURL"
                  placeholder="Amazon IVS Playback URL"
                  onChange={this.onChange}
                />
                <Label for="dateTX">Transmission Date</Label>
                <Input
                  type="date"
                  name="dateTX"
                  id="dateTX"
                  placeholder="Transmission Date"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
