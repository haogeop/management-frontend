import { Graph } from '@antv/g6';
import { useEffect, useRef } from 'react';
import './my-custom-node'; // 引入自定义节点实现

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
}

const MyGraph: React.FC<GraphProps> = ({ topoData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null); // 存储图实例

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建图实例
    graphRef.current = new Graph({
      container: containerRef.current,
      width: 400,
      height: 300,
      padding: 20,
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
      background: '#f0f0f0',
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

    graphRef.current.render();
    graphRef.current.fitView();

    // 清理图实例
    // return () => {
    //   graphRef.current?.destroy();
    //   graphRef.current = null; // 重置图实例
    // };

  }, [topoData]);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <div ref={containerRef} />
    </div>
  );
};

export default MyGraph;