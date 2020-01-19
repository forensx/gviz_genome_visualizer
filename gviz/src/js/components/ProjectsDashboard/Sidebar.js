import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

{
  /* <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {projects.map((project_item, project_index) => (
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
        </Menu> */
}

function Sidebar() {
  const [sidebarVisibility, setsidebarVisibility] = useState(true);
  const [dataLoaded, setdataLoaded] = useState(false);

  const handleChange = () => setsidebarVisibility(!sidebarVisibility);

  return (
    <Sider
      collapsible={true}
      defaultCollapsed={true}
      onCollapse={handleChange}
      collapsed={!sidebarVisibility}
    ></Sider>
  );
}

export default Sidebar;
