import Graph from './Graph';
import { useEffect, useRef } from 'react';

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const topoData = [{
        nodes: [
            { id: 'root', label: '根节点', type: 'dual-label-node', size: 50 },
            { id: 'node1', label: '节点 1', type: 'circle' },
            { id: 'node2', label: '节点 2', type: 'circle' },
            { id: 'node3', label: '节点 3', type: 'circle' },
            { id: 'node4', label: '节点 4', type: 'circle' },
        ],
        edges: [
            { source: 'root', target: 'node1' },
            { source: 'root', target: 'node2' },
            { source: 'node2', target: 'node3' },     
            { source: 'node4', target: 'node3'  },       
        ],
      }]

  return (
    <div>
      {topoData.map((data, index) => (
        <Graph key={index} topoData={data} />
      ))}
    </div>
  );

};


