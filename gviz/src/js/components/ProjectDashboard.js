import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import SidebarRender from "./Sidebar";
import ProjectResultCard from "./ProjectResultReport";
import "antd/dist/antd.css";
import ProjectResultCardHeader from "./ProjectResultCardHeader";
import ExperimentCreationModal from "./ExperimentCreationModal";
import { toggleExperimentModal } from "../actions/index";

const { Header } = Layout;

function mapDispatchToProps(dispatch) {
  return {
    toggleExperimentModal: experimentModalVisibility =>
      dispatch(toggleExperimentModal())
  };
}

class ProjectDashboardRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experimentModalVisibility: false
    };

    this.handleExperimentModal = this.handleExperimentModal.bind(this);
  }

  handleExperimentModal(event) {
    this.setState({ experimentModalVisibility: true });
    this.props.toggleExperimentModal();
  }

  render() {
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
                <Menu.Item key="1" onClick={this.handleExperimentModal}>
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
          <ExperimentCreationModal />
          <Layout>
            <ProjectResultCardHeader />
            <ProjectResultCard />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const ProjectDashboard = connect(null, mapDispatchToProps)(ProjectDashboardRender);
export default ProjectDashboard;
