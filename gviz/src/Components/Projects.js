import React from "react";
import { Layout, Menu, Icon, Button, Dropdown, Breadcrumb, Modal } from "antd";
import { PageHeader, Descriptions } from "antd";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete
} from "antd";
import ExperimentCreatorModal from "./ExperimentCreatorModal";
import "antd/dist/antd.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Projects extends React.Component {
  state = {
    collapsed: false,
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <SubMenu key="sub1" title={<span>6CI Monoclonal Antibody</span>}>
                <Menu.Item key="s1_1">Experiment 1</Menu.Item>
                <Menu.Item key="s1_2">Experiment 2</Menu.Item>
                <Menu.Item key="s1_3">Experiment 3</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span>1-155-2 Mouse Monoclonal Antibody</span>}
              >
                <Menu.Item key="s2_1">Experiment 1</Menu.Item>
                <Menu.Item key="s2_2">Experiment 2</Menu.Item>
                <Menu.Item key="s2_3">Experiment 3</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Icon
                style={{
                  padding: 20
                }}
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
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
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <PageHeader
                ghost={false}
                title="6CI Monoclonal Antibody"
                subTitle="PIR-A and PIR-B"
                extra={[]}
              >
                <Descriptions size="small" column={3}>
                  <Descriptions.Item label="Created">
                    Aniket Pant
                  </Descriptions.Item>
                  <Descriptions.Item label="Creation Time">
                    2017-01-10
                  </Descriptions.Item>
                  <Descriptions.Item label="Processing Time">
                    10:02:04
                  </Descriptions.Item>
                  <Descriptions.Item label="Annotations">
                    Irure consequat veniam incididunt esse. Anim nulla excepteur
                    cillum reprehenderit labore quis tempor irure nostrud
                    deserunt. Pariatur irure duis mollit nisi aliquip qui duis
                    commodo nulla dolor occaecat ad.
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
