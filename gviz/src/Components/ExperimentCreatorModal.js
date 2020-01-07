import React, { Component } from "react";
import { Modal, Button } from "antd";

export class ExperimentCreatorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ModalText: "Learn some react",
      confirmLoading: false
    };
  }

  componentDidUpdate() {
      const { visible } = this.props;
      this.setState({
          visible: visible
      })
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal
          title="Create an experiment"
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default ExperimentCreatorModal;
