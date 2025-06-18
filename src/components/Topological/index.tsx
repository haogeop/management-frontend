import Graph from './Graph';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

export default () => {

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleZoomIn = (index: number) => {
    setCurrentIndex(index);
  };

  const handleZoomOut = () => {
    setCurrentIndex(null);
  };

  const graphs = [
    {
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
      }, 
      {
        nodes: [
            { id: 'root', label: '根节点', type: 'dual-label-node', size: 50 },
            { id: 'node1', label: '节点 1', type: 'circle' },
            { id: 'node2', label: '节点 2', type: 'circle' },
            { id: 'node3', label: '节点 3', type: 'circle' },
            { id: 'node4', label: '节点 4', type: 'circle' },
        ],
        edges: [
            { source: 'root', target: 'node1' },
            { source: 'node1', target: 'node2' },
            { source: 'node2', target: 'node3' },     
            { source: 'node4', target: 'node3'  },       
        ],
      }
    ]

  return (
    <div>
      {/* {topoData.map((data, index) => (
        <Graph key={index} topoData={data} />
      ))} */}
      {graphs.map((graphData, index) => {
        const isZoomedIn = currentIndex === index;
        const graphWidth = isZoomedIn ? window.innerWidth : 400; // 放大时使用窗口宽度
        const graphHeight = isZoomedIn ? window.innerHeight : 300; // 放大时使用窗口高度

        return (
          <div key={index} style={{ margin: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
              {isZoomedIn ? (
                <Button onClick={handleZoomOut}>缩小</Button>
              ) : (
                <Button onClick={() => handleZoomIn(index)}>放大</Button>
              )}
            </div>
            <div
              style={{
                width: graphWidth,
                height: graphHeight,
                transition: 'all 0.3s',
              }}
            >
              <Graph topoData={graphData} width={graphWidth} height={graphHeight} />
            </div>
          </div>
        );
      })}
    </div>
  );

};


