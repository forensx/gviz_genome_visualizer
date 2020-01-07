import React from "react";
import { Layout, Menu, Icon } from "antd";
import 'antd/dist/antd.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Projects extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style = {{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}>
        <Header style = {{
            height: "10vh"
        }}>Header navbar here</Header>
        <Layout style = {{
            flex: "auto"
        }}>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <SubMenu
                    key="sub1"
                    title={
                        <span>Project 1</span>
                    }
                    >
                    <Menu.Item key="1">Experiment 1</Menu.Item>
                    <Menu.Item key="2">Experiment 2</Menu.Item>
                    <Menu.Item key="3">Experiment 3</Menu.Item>
                </SubMenu>
                <Menu.Item key="sub2">
                <span>Project 2</span>
                </Menu.Item>
                <Menu.Item key="sub3">
                <span>Project 3</span>
                </Menu.Item>
                <Menu.Item key="sub4">
                <span>Project 4</span>
                </Menu.Item>
                <Menu.Item key="sub5">
                <span>Project 5</span>
                </Menu.Item>
                <Menu.Item key="sub6">
                <span>Project 6</span>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                style = {{
                    padding: 18,
                }}
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                />
            </Header>
            <Content
                style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                        }}
            >
                Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
