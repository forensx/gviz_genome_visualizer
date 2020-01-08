import React from "react";
import { connect } from "react-redux";
import { Breadcrumb, Layout } from "antd";

const { Header } = Layout;

const mapStateToProps = state => {
  return { experiments: state.experiments };
};

const ProjectResultCardHeaderRender = ({ experiments }) => (
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
);

const ProjectResultCardHeader = connect(mapStateToProps)(
  ProjectResultCardHeaderRender
);
export default ProjectResultCardHeader;
