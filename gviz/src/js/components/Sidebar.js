import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { toggleSidebar } from "../actions/index";

const { Sider } = Layout;
const { SubMenu } = Menu;

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: sidebarVisibility => dispatch(toggleSidebar())
  };
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisibility: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ sidebarVisibility: !this.state.sidebarVisibility });
    this.props.toggleSidebar();
  }
  render() {
    const { sidebarVisibility } = this.state;
    return (
      <Sider
        collapsible={true}
        defaultCollapsed={true}
        onCollapse={this.handleChange}
        collapsed={!sidebarVisibility}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <SubMenu key="sub1" title={<span>6CI Monoclonal Antibody</span>}>
            <Menu.Item key="s1_1">PIR-A and PIR-B</Menu.Item>
            <Menu.Item key="s1_2">PIR-C and PIR-D</Menu.Item>
            <Menu.Item key="s1_3">PIR-E and PIR-F</Menu.Item>
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
    );
  }
}

const SidebarRender = connect(null, mapDispatchToProps)(Sidebar);
export default SidebarRender;
