import React from "react";
import { Layout, Menu, Icon, Button, Dropdown, Breadcrumb, Modal } from "antd";
import { PageHeader, Descriptions } from "antd";
import SidebarRender from "./Sidebar";
import ProjectResultCard from './ProjectResultReport';
import "antd/dist/antd.css";

const { Header, Sider, Content } = Layout;

export default class Projects extends React.Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
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
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw"
        }}
      >
        <Header
          mode="inline"
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={this.showModal}>
                  Experiment
                </Menu.Item>
                <Menu.Item key="2">Project</Menu.Item>
              </Menu>
            }
            style={{ marginLeft: "auto" }}
          >
            <Button style={{ marginLeft: "auto" }}>
              New <Icon type="down" style={{}} />
            </Button>
          </Dropdown>
          <Button>Admin</Button>
        </Header>
        <Layout
          style={{
            flex: "auto"
          }}
        >
          <SidebarRender />
          <div className="experimentCreateModal">
            <Modal
              title="Project Creation Wizard"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
              Project Creation modal. Enter project details here.
            </Modal>
          </div>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Breadcrumb
                style={{
                  padding: 18,
                  flex: "auto"
                }}
              >
                <Breadcrumb.Item>6CI Monoclonal Antibody</Breadcrumb.Item>
                <Breadcrumb.Item>PIR-A and PIR-B</Breadcrumb.Item>
              </Breadcrumb>
            </Header>
            <ProjectResultCard />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
