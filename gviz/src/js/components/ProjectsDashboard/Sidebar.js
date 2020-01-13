import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { toggleSidebar } from "../../actions/index";
import { getProjects } from "./DataFunctions";

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
      sidebarVisibility: true,
      dataLoaded: false,
      projects: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAllProjects()
  }

  getAllProjects = () => {
    getProjects().then(data => {
        this.setState(
            {
                dataLoaded: true,
                projects: [...data]
            },
            () => {
              console.log(this.state.dataLoaded)
              console.log(this.state.projects)
            }
        )
    })
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
          {
            this.state.projects.map((item, index) => (
              <SubMenu key = {index} title = {<span>{item[0]}</span>}>
                
              </SubMenu>
            ))}
        </Menu>
      </Sider>
    );
  }
}

const SidebarRender = connect(null, mapDispatchToProps)(Sidebar);
export default SidebarRender;
