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
    this.getAllProjects();
  }

  getAllProjects = () => {
    getProjects().then(data => {
      this.setState(
        {
          dataLoaded: true,
          projects: [...data]
        },
        () => {
          console.log(this.state.dataLoaded);
        }
      );
    });
  };

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
          {this.state.projects.map((project_item, project_index) => (
            <SubMenu
              key={"project_" + project_item[0]}
              title={<span>{project_item[0]}</span>}
            >
              {project_item[3].map((experiment, experiment_index) => (
                <Menu.Item
                  key={
                    project_item[0] +
                    "_experiment_" +
                    experiment["experimentTitle"]
                  }
                >
                  {experiment["experimentTitle"]}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
}

const SidebarRender = connect(null, mapDispatchToProps)(Sidebar);
export default SidebarRender;
