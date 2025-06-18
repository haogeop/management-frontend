export const storageColumns = [
  { title: '资产ID', dataIndex: 'id', key: 'id' },
  { title: '资产名称', dataIndex: 'assetType', key: 'assetType' },
  { title: '存储类型', dataIndex: 'productName', key: 'productName' },
  { title: '容量大小', dataIndex: 'area', key: 'area' },
  { title: '已用容量', dataIndex: 'address', key: 'address' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },

];

export const networkColumns = [
   { title: '资产ID', dataIndex: 'id', key: 'id' },
  { title: '资产名称', dataIndex: 'assetType', key: 'assetType' },
  { title: '资产类型', dataIndex: 'assetType', key: 'assetType' },
  { title: '地域', dataIndex: 'area', key: 'area' },
    { title: '网络范围', dataIndex: 'networkWide', key: 'networkWide' },
  { title: '网络结构复杂度指示', dataIndex: 'pointer', key: 'pointer' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', dataIndex: 'operate', key: 'operate' },
]

export const hostColumns = [
    { title: '主机ID', dataIndex: 'id', key: 'id' },
    { title: '主机名称', dataIndex: 'name', key: 'name' },
    { title: 'IP地址', dataIndex: 'address', key: 'address' },
    { title: '资产ID', dataIndex: 'assetsId', key: 'assetsId' },
    { title: 'VPC ID', dataIndex: 'vpcId', key: 'vpcId' },
    { title: '子网ID', dataIndex: 'vsw', key: 'vsw' },
    { title: 'CPU/内存', dataIndex: 'cpu', key: 'cpu' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
]

export const accountColumns = [
    { title: '账号ID', dataIndex: 'id', key: 'id' },
    { title: '账号名称', dataIndex: 'name', key: 'name' },
    { title: '登陆IP', dataIndex: 'address', key: 'address' },
    { title: 'MFA', dataIndex: 'mfa', key: 'mfa' },
    { title: '子网ID', dataIndex: 'vsw', key: 'vsw' },
    { title: '风险等级', dataIndex: 'riskLevel', key: 'riskLevel' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
]

export const databaseColumns = [
    { title: '数据库ID', dataIndex: 'id', key: 'id' },
    { title: '数据库名称', dataIndex: 'name', key: 'name' },
    { title: '数据库类型', dataIndex: 'type', key: 'type' },
    { title: '所属区域', dataIndex: 'area', key: 'area' },
    { title: '存储使用率', dataIndex: 'usageRate', key: 'usageRate' },
    { title: '风险等级', dataIndex: 'riskLevel', key: 'riskLevel' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
]

export const CloudColumns = [
    { title: '实例ID', dataIndex: 'id', key: 'id' },
    { title: '资产名称', dataIndex: 'name', key: 'name' },
    { title: '资产类型', dataIndex: 'type', key: 'type' },
    { title: '所属区域', dataIndex: 'area', key: 'area' },
    { title: '所属私有网络', dataIndex: 'network', key: 'network' },
    { title: '风险等级', dataIndex: 'riskLevel', key: 'riskLevel' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
]