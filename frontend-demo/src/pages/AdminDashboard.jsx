import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Tag, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import RequestedMedicinesTab from './components/RequestedMedicinesTab'; // Import your RequestedMedicinesTab component here
import ApprovedMedicinesTab from './components/ApprovedMedicinesTab'; // Import your ApprovedMedicinesTab component here
import ProfileEdit from './ProfileEdit'; // Import your ProfileEdit component here
import '../FormStyle.css'; // Import your custom CSS styles for Dashboard

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('requested-medicines');
  const [profileEditVisible, setProfileEditVisible] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleProfileEdit = () => {
    setProfileEditVisible(!profileEditVisible);
  };

  const requestedMedicinesData = [
    {
      id: 1,
      medicineName: 'Medicine 1',
      status: 'Pending',
    },
    {
      id: 2,
      medicineName: 'Medicine 2',
      status: 'Accepted',
    },
    {
      id: 3,
      medicineName: 'Medicine 3',
      status: 'Rejected',
    },
    // Add more requested medicines...
  ];

  const handleStatusChange = (id, newStatus) => {
    // Logic to update the status of requested medicine
  };

  const handleViewDetails = (id) => {
    // Logic to view details of requested medicine
  };

  const handleLogout = () => {
    // Logic to handle logout
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Button type="link" onClick={toggleProfileEdit}>
          Update Profile
        </Button>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button type="link" onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  let mainContent;

  switch (activeTab) {
    case 'requested-medicines':
      mainContent = (
        <RequestedMedicinesTab
          requestedMedicines={requestedMedicinesData}
          handleStatusChange={handleStatusChange}
          handleViewDetails={handleViewDetails}
        />
      );
      break;
    case 'approved-medicines':
      mainContent = <ApprovedMedicinesTab />;
      break;
    // Add cases for other tabs...
    default:
      mainContent = null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ minHeight: '100vh', background: '#001529' }}
      >
        <Menu theme="dark" mode="inline" selectedKeys={[activeTab]}>
          <Menu.Item key="requested-medicines" icon={<MenuOutlined />} onClick={() => setActiveTab('requested-medicines')}>
            Requested Medicines
          </Menu.Item>
          <Menu.Item key="approved-medicines" icon={<EditOutlined />} onClick={() => setActiveTab('approved-medicines')}>
            Approved Medicines
          </Menu.Item>
          {/* Add more menu items for additional tabs */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: '#001529',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`} onClick={toggleSidebar}>
              {collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: '24px', color: '#fff' }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: '24px', color: '#fff' }} />
              )}
            </div>
            <span style={{ fontSize: '18px', marginLeft: '10px' }}>Hey, Admin</span>
          </div>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="link">
              <UserOutlined style={{ fontSize: '24px' }} />
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px auto',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {mainContent}
        </Content>
      </Layout>
      <Modal
        visible={profileEditVisible}
        onCancel={toggleProfileEdit}
        footer={null}
        destroyOnClose
        width="100%"
      >
        <ProfileEdit />
      </Modal>
    </Layout>
  );
};

export default Dashboard;





