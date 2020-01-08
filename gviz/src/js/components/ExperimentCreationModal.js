import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { toggleExperimentModal } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        toggleExperimentModal: experimentModalVisibility => dispatch(toggleExperimentModal())
    };
  }

class ExperimentCreationModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        experimentModalVisibility: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleChange(event) {
    this.setState({ experimentModalVisibility: true });
    this.props.toggleExperimentModal();
  }
  handleOk = () => {
    setTimeout(() => {
      this.setState({
        experimentModalVisibility: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      experimentModalVisibility: false
    });
  };
  render() {
    const { experimentModalVisibility } = this.state;
    return (
        <Modal
        title="Experiment Creation Wizard"
        visible={experimentModalVisibility}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        Experiment Creation modal. Enter project details here.
      </Modal>
    );
  }
}

const ExperimentCreationModal = connect(null, mapDispatchToProps)(ExperimentCreationModalForm);
export default ExperimentCreationModal;
