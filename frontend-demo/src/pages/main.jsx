import React from 'react';
import { Layout, Typography, Button, Card, Row, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
// import './MainPage.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const MainPage = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="login-button">
          <Button icon={<LoginOutlined />} size="large">
            Login
          </Button>
        </div>
      </Header>
      <Content className="content">
        <div className="hero">
          <div className="hero-content">
            <Title className="hero-title">Welcome to My App</Title>
            <Text className="hero-text">
              This is a description of what my app does.
            </Text>
            <Button className="hero-button" type="primary" size="large">
              Get Started
            </Button>
          </div>
        </div>

        <div className="section" style={{ backgroundColor: '#f0f2f5' }}>
          <Title className="section-title">Section 1</Title>
          <Text>
            This is the content of section 1. Add your text, images, and
            components here.
          </Text>
        </div>

        <div className="section">
          <Title className="section-title">Section 2</Title>
          <Text>
            This is the content of section 2. Add your text, images, and
            components here.
          </Text>
        </div>

        <div className="section" style={{ backgroundColor: '#f0f2f5' }}>
          <Title className="section-title">Section 3</Title>
          <Text>
            This is the content of section 3. Add your text, images, and
            components here.
          </Text>
        </div>

        <div className="section">
          <Title className="section-title">Section 4</Title>
          <Text>
            This is the content of section 4. Add your text, images, and
            components here.
          </Text>
        </div>

        <div className="section" style={{ backgroundColor: '#f0f2f5' }}>
          <Title className="section-title">Section 5</Title>
          <Text>
            This is the content of section 5. Add your text, images, and
            components here.
          </Text>
        </div>

        <div className="section">
          <Title className="section-title">Donated Medicines</Title>
          <Row gutter={[16, 16]} className="medicine-card-row">
            <Col span={8}>
              <Card title="Medicine 1" extra={<Button type="primary">Accept</Button>}>
                Description of the donated medicine 1.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Medicine 2" extra={<Button type="primary">Accept</Button>}>
                Description of the donated medicine 2.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Medicine 3" extra={<Button type="primary">Accept</Button>}>
                Description of the donated medicine 3.
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer className="footer">© 2023 My App. All rights reserved.</Footer>
    </Layout>
  );
};

export default MainPage;
