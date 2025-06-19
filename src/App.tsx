import { useEffect, useState } from 'react';
import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import Home from './components/Home'
import Topological from './components/Topological';
import AssetsOverview from './components/AssetsCenter/AssetsOverview'
import { useLocation } from 'react-router-dom';
import { Label } from '@antv/g6';
import path from 'path';


const { Header, Content, Sider } = Layout;

const Users = () => <div>用户管理内容</div>;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);


  const routes = [
    {
      key: '1',
      icon: <UserOutlined />,
      path: '/home',
      label: <Link to="/home">首页</Link>,
    },
    {
      key: '2',
      path: '/topological',
      icon: <LaptopOutlined />,
      label: <Link to="/topological">多云资产态势</Link>,
    },
    {
      key: '3',
      icon: <NotificationOutlined />,
      label: "资产中心",
      path: '/assets',
      // exact: false,
      children: [
        { key: 'assetsOverview', path: '/assetsOverview', label: <Link to="/assetsOverview">资产总览</Link> },
        { key: 'riskAssets', path: '/riskAssets', label: <Link to="/users">风险资产</Link>}
      ]
    }, {
      key: 'riskCenter',
      icon: <></>,
      label: '风险中心',
      children: [
        { key: 'riskAnalysis', path: '/riskAnalysis', label: <Link to="/riskAnalysis">风险分析</Link> },
        { key: 'rules', path: '/rules', label: <Link to="/riskAnalysis">规则展示</Link> },
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

  
const findSelectedKeys = (pathname: string, routes: any[]) => {
  const result: any[] = [];
  
  // 递归检查路由
  const checkRoutes = (routes: any[]) => {
    for (const route of routes) {
      // 情况1：当前路由完全匹配
      if (route.path && pathname === route.path) {
        result.push(route.key);
        return true;
      }
      
      // 情况2：当前路由是前缀匹配（用于父菜单高亮）
      if (route.path && pathname.startsWith(route.path + '/')) {
        result.push(route.key);
      }
      
      // 检查子路由
      if (route.children) {
        if (checkRoutes(route.children)) {
          return true; // 子路由匹配则终止查找
        }
      }
    }
    return false;
  };

  checkRoutes(routes);
  console.log('result', result)
  return result;
};

  const location = useLocation();
  const currentPath = location.pathname;
  const { pathname } = useLocation();

  return (
    // <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', boxShadow: '0 2px 4px rgba(78, 89, 105, 0.5)',}}>
          <div className="demo-logo" style={{ color: '#1D2129', fontSize: '20px' }}>Arco Pro</div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }} collapsible collapsed={collapsed} trigger={null} >
            <Menu
              mode="inline"
              selectedKeys={findSelectedKeys(pathname, routes)} // 这个地方要改成从path里面取
              style={{ height: '100%', borderRight: 0 }}
              items={routes}
            />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                left: '50%', // 水平居中
                position: 'absolute',
                transform: 'translateX(-50%)',
                bottom: '16px', // 距离底部的距离
              }}
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
                <Route path="/home" element={<Home />} />
                <Route path="/topological" element={<Topological />} />
                <Route path="/assetsOverview" element={<AssetsOverview />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    // </Router>
  );
};

export default App;