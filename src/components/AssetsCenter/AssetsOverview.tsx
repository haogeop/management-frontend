import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Dropdown, Menu, Card, Modal, Form, Tabs } from 'antd';
import { SearchOutlined, DownOutlined, CloudOutlined, IdcardOutlined, BarsOutlined, DatabaseOutlined } from '@ant-design/icons';
import { storageColumns, networkColumns, hostColumns, accountColumns, databaseColumns, CloudColumns} from '../../statics/assets';

const { TabPane } = Tabs;

// 定义数据类型
interface AssetData {
  id: string;
  assetType: string;
  productName: string;
  area: string;
  address: string;
  status: string;
}

// 定义 mock 数据类型
interface MockData {
  [key: string]: AssetData[];
}

const AssetManagement: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<AssetData[]>([]);
  const [activeTab, setActiveTab] = useState('network'); // 默认选中的标签
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const menu = (
    <Menu>
      <Menu.Item key="1">选项 1</Menu.Item>
      <Menu.Item key="2">选项 2</Menu.Item>
      <Menu.Item key="3">选项 3</Menu.Item>
    </Menu>
  );

  const handleModalOpen = () => {
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Received values from form: ', values);
    handleModalClose();
  };

  const fetchData = async (tab: string, page: number, pageSize: number) => {
    setLoading(true);
    // 模拟 API 请求
    setTimeout(() => {
      const mockData: MockData = {
        network: Array.from({ length: 200 }, (_, index) => ({
          id: `${index + 1}`,
          assetType: '网络资产',
          productName: `服务器 ${index + 1}`,
          area: '南区',
          address: `192.168.0.${index + 1}`,
          status: '已上线',
        })),
        storage: Array.from({ length: 200 }, (_, index) => ({
          id: `${index + 1}`,
          assetType: '存储资产',
          productName: `存储设备 ${index + 1}`,
          area: '北区',
          address: `192.168.0.${index + 1}`,
          status: '已下线',
        })),
        host: Array.from({ length: 200 }, (_, index) => ({
          id: `${index + 1}`,
          assetType: '主机资产',
          productName: `虚拟机 ${index + 1}`,
          area: '东区',
          address: `192.168.0.${index + 1}`,
          status: '已上线',
        })),
        database: Array.from({ length: 200 }, (_, index) => ({
          id: `${index + 1}`,
          assetType: '数据库资产',
          productName: `MySQL ${index + 1}`,
          area: '西区',
          address: `192.168.0.${index + 1}`,
          status: '维护中',
        })),
        others: Array.from([])
      };

      const startIndex = (page - 1) * pageSize;
      const paginatedData = mockData[tab].slice(startIndex, startIndex + pageSize);
      
      setDataSource(paginatedData);
      setPagination({ current: page, pageSize, total: mockData[tab].length });
      setLoading(false);
    }, 1000);
  };

  const switchColumnData = (tab: string) => {
    switch (tab) {
      case "storage": 
        setColumns(storageColumns)
        break
      case "network":
        setColumns(networkColumns)
        break
      case "host":
        setColumns(hostColumns)
        break
      case "account":
        setColumns(accountColumns)
        break
      case "database": 
        setColumns(databaseColumns)
        break
      case "others":
        setColumns(CloudColumns)
        break
    }
    return [
      { title: '序号', dataIndex: 'id', key: 'id' },
      { title: '资产类型', dataIndex: 'assetType', key: 'assetType' },
      { title: '产品名称', dataIndex: 'productName', key: 'productName' },
      { title: '区域', dataIndex: 'area', key: 'area' },
      { title: '地址', dataIndex: 'address', key: 'address' },
      { title: '状态', dataIndex: 'status', key: 'status' },
    ];
  };

  useEffect(() => {
    fetchData(activeTab, pagination.current, pagination.pageSize);
    switchColumnData(activeTab); // 设置列
  }, [activeTab, pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    fetchData(activeTab, pagination.current, pagination.pageSize); // 根据新页码请求数据
  };

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      {/* 统计信息区域 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <span>存储资产</span>
            <div style={{ marginTop: '12px' }}>5</div>
          </Card>
          <Card size="small" style={{ textAlign: 'center' }}>
            <span>网络资产</span>
            <div style={{ marginTop: '12px' }}>5</div>
          </Card>
          <Card size="small" style={{ textAlign: 'center' }}>
            <span>主机资产</span>
            <div style={{ marginTop: '12px' }}>5</div>
          </Card>
          <Card size="small" style={{ textAlign: 'center' }}>
            <span>数据库资产</span>
            <div style={{ marginTop: '12px' }}>5</div>
          </Card>
        </div>
        {/* 多云资产接入区域 */}
        <div style={{ flex: 1, marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ marginBottom: '8px' }}>多云资产接入</span>
          <Space>
            <Button icon={<CloudOutlined />} onClick={handleModalOpen} />
            <Button icon={<IdcardOutlined />} onClick={handleModalOpen} />
            <Button icon={<DatabaseOutlined />} onClick={handleModalOpen} />
            <Button icon={<BarsOutlined />} onClick={handleModalOpen} />
          </Space>
        </div>
      </div>


      {/* 搜索和操作区域 */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="搜索"
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
        <Dropdown overlay={menu}>
          <Button>
            多资产导入 <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {/* Tabs 和表格区域 */}
      <Tabs defaultActiveKey="storage" onChange={setActiveTab}>
        <TabPane tab="存储" key="storage">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
        <TabPane tab="网络" key="network">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
        <TabPane tab="主机" key="host">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
        <TabPane tab="账号" key="account">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
        <TabPane tab="数据库" key="database">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
        <TabPane tab="其他云资源" key="others">
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
          />
        </TabPane>
      </Tabs>

      {/* 模态框 */}
      <Modal
        title="账户登录"
        visible={visible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="账户"
            name="account"
            rules={[{ required: true, message: '请输入账户!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetManagement;