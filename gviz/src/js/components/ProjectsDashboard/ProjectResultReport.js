import React from "react";
import { connect } from "react-redux";
import { PageHeader, Descriptions, Layout } from "antd";

const { Content } = Layout;

const mapStateToProps = state => {
  return { experiments: state.experiments };
};

const ProjectResultReport = ({ experiments }) => (
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
        <Descriptions.Item label="Created">Aniket Pant</Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Processing Time">10:02:04</Descriptions.Item>
        <Descriptions.Item label="Annotations">
          Irure consequat veniam incididunt esse. Anim nulla excepteur cillum
          reprehenderit labore quis tempor irure nostrud deserunt. Pariatur irure
          duis mollit nisi aliquip qui duis commodo nulla dolor occaecat ad.
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </Content>
);

const ProjectResultCard = connect(mapStateToProps)(ProjectResultReport);
export default ProjectResultCard;