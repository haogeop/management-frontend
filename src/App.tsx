// import { useEffect, useState } from 'react';
import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Home from './components/Home'
import Topological from './components/Topological';
import AssetsOverview from './components/AssetsCenter/AssetsOverview'
import { Label } from '@antv/g6';


const { Header, Content, Sider } = Layout;

const Settings = () => <div>设置内容</div>;
const Users = () => <div>用户管理内容</div>;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const routes = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '2',
      icon: <LaptopOutlined />,
      label: <Link to="/topological">多云资产态势</Link>,
    },
    {
      key: '3',
      icon: <NotificationOutlined />,
      label: "资产中心",
      children: [
        { key: 'assetsOverview', label: <Link to="/assetsOverview">资产总览</Link> },
        { key: 'riskAssets', label: <Link to="/users">风险资产</Link>}
      ]
    }, {
      key: 'riskCenter',
      icon: <></>,
      label: '风险中心',
      children: [
        { key: 'riskAnalysis', label: <Link to="/riskAnalysis">风险分析</Link> },
        { key: 'rules', label: <Link to="/riskAnalysis">规则展示</Link> },
        ]
    }, {
      key: 'AIOperate',
      icon: <></>,
      label: 'AI运营',
      children: [
        { key: 'alarmCenter', label: <Link to="/riskAnalysis">告警中心</Link> },
        { key: 'treatCenter', label: <Link to="/riskAnalysis"></Link> }
      ]
    }
  ];

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
          <div className="demo-logo" style={{ color: 'white', fontSize: '20px' }}>系统名称</div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
              items={routes}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb
              items={[{ title: '首页' }, { title: '列表' }, { title: '应用' }]}
              style={{ margin: '16px 0' }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topological" element={<Topological />} />
                <Route path="/assetsOverview" element={<AssetsOverview />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;