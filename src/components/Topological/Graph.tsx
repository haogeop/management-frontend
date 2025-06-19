import { Graph } from '@antv/g6';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button } from 'antd'
// import './my-custom-node'; // 引入自定义节点实现

interface Node {
  id: string;
  label: string;
  type: string;
  size?: number;
  [key: string]: any; // 允许添加其他属性
}

interface Edge {
  source: string;
  target: string;
  [key: string]: any; // 允许添加其他属性
}

interface GraphProps {
  topoData: {
    nodes: Node[];
    edges: Edge[];
  };
  width:  number,
  height: number
}

const MyGraph: React.FC<GraphProps> = ({ topoData, width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null); // 存储图实例

  const [scale, setScale] = useState(1);


  useEffect(() => {
    if (!containerRef.current) return;

    // 销毁旧实例
    if (graphRef.current) {
      graphRef.current.destroy();
      graphRef.current = null;
    }

    // 创建图实例
    graphRef.current = new Graph({
      container: containerRef.current,
      width,
      height,
      padding: 20,
      plugins: [
        'grid-line'
      ],
      behaviors: [
        'zoom-canvas', 
        'drag-canvas', 
        { 
        key: 'auto-adapt-label', 
        type: 'auto-adapt-label',
        padding: 0,
        throttle: 200
        }
    ],
      edge: {
        type: 'polyline',
        style: {
          stroke: '#91d5ff',
          lineWidth: 2,
          endArrow: true,
        },
        state: {
          selected: {
            stroke: '#1890ff',
            lineWidth: 3,
          },
        },
      },
        animation: true,
    //   background: '#f0f0f0',
      autoFit: {
        type: 'view',
        options: {
          when: 'overflow',
          direction: 'both',
        },
      },
      layout: {
        type: 'force',
      },
      data: {
        nodes: topoData.nodes.map(node => ({
          ...node,
          id: node.id,
          label: node.label,
          type: node.type,
          size: node.size || 30, // 默认大小
        })),
        edges: topoData.edges.map(edge => ({
          ...edge,
          source: edge.source,
          target: edge.target,
        })),
      },
    });

     // 确保图实例存在后再渲染
    if (graphRef.current) {
      setTimeout(() => {
        graphRef.current?.render();
        graphRef.current?.fitView();
      }, 0); // 延迟渲染
    }

    // 清理图实例
    return () => {
            graphRef.current?.destroy();
            graphRef.current = null; // 重置图实例
    };


  }, [topoData]);

  return (
    <div style={{ position: 'relative', width, height }}>
        {/* <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
        <Button icon={<ZoomInOutlined />} onClick={zoomIn} />
        <Button icon={<ZoomOutOutlined />} onClick={zoomOut} />
      </div> */}
      <div ref={containerRef} />
    </div>
  );
};

export default MyGraph;