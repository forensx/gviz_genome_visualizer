import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import SidebarRender from "./Sidebar";
import ProjectResultCard from "./ProjectResultReport";
import "antd/dist/antd.css";
import ProjectResultCardHeader from "./ProjectResultCardHeader";
import { getProjects } from "./DataFunctions";
import { getProjectsRedux } from "../../actions/index";

const { Header } = Layout;

function ProjectDashboard() {
  // const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(true);
    console.log(dataLoaded);
  }, []);

  return (
    <div>
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
                <Menu.Item key="1">Experiment</Menu.Item>
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

          <Layout>
            <ProjectResultCardHeader />
            <ProjectResultCard />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

// <ExperimentCreationModal />
export default ProjectDashboard;
