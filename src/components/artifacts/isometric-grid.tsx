import React, { useState } from 'react';

const IsometricGrid = () => {
  const [selectedTriangles, setSelectedTriangles] = useState(new Map());
  const [selectedEdges, setSelectedEdges] = useState(new Set());
  const [drawMode, setDrawMode] = useState('fill');
  const [currentColor, setCurrentColor] = useState('#2563eb');
  const [numberInput, setNumberInput] = useState('');

  const gridSize = 10;
  const sideLength = 40;
  const triangleHeight = sideLength * Math.sqrt(3) / 2;

  const colorOptions = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#7c3aed' },
  ];

  // Penrose triangle pattern - maps triangle numbers to colors
  const penrosePattern = {
    // Blue arm
    '#2563eb': [29, 49, 50, 51, 67, 68, 70, 71, 87, 88, 92, 93, 105, 106, 112, 113, 125, 126, 144],
    // Green arm
    '#16a34a': [69, 89, 90, 107, 108, 127, 128, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156],
    // Purple arm
    '#7c3aed': [30, 31, 52, 53, 72, 73, 94, 95, 114, 115, 129, 130, 131, 132, 133, 134, 135, 136, 137],
  };

  const applyPenrosePattern = () => {
    const triangles = generateTriangles();
    const newMap = new Map();

    Object.entries(penrosePattern).forEach(([color, numbers]) => {
      numbers.forEach(num => {
        const triangle = triangles.find(t => t.number === num);
        if (triangle) {
          newMap.set(triangle.id, color);
        }
      });
    });

    setSelectedTriangles(newMap);
  };

  const width = (gridSize + 1) * sideLength;
  const height = (gridSize + 0.5) * triangleHeight;

  const handleNumberAdd = () => {
    const numbers = numberInput
      .split(',')
      .map(n => n.trim())
      .filter(n => !isNaN(parseInt(n)))
      .map(n => parseInt(n));
    
    setSelectedTriangles(prev => {
      const newMap = new Map(prev);
      numbers.forEach(num => {
        const triangle = generateTriangles().find(t => t.number === num);
        if (triangle) {
          newMap.set(triangle.id, currentColor);
        }
      });
      return newMap;
    });
    setNumberInput('');
  };

  // Previous functions remain the same
  const getTriangleCenter = (points) => {
    const x = (points[0].x + points[1].x + points[2].x) / 3;
    const y = (points[0].y + points[1].y + points[2].y) / 3;
    return { x, y };
  };

  const generateTriangles = () => {
    const triangles = [];
    let counter = 1;
    
    for (let row = 0; row < gridSize; row++) {
      const rowOffset = row % 2 === 1 ? sideLength / 2 : 0;
      
      for (let col = 0; col < gridSize * 2; col++) {
        const centerX = col * (sideLength / 2) + rowOffset;
        const centerY = row * triangleHeight;
        
        if (col % 2 === 0) {
          const points = [
            { x: centerX, y: centerY },
            { x: centerX + sideLength/2, y: centerY + triangleHeight },
            { x: centerX - sideLength/2, y: centerY + triangleHeight }
          ];
          triangles.push({
            points,
            id: `up-${row}-${col}`,
            number: counter++,
            edges: [
              `${centerX},${centerY}-${centerX + sideLength/2},${centerY + triangleHeight}`,
              `${centerX + sideLength/2},${centerY + triangleHeight}-${centerX - sideLength/2},${centerY + triangleHeight}`,
              `${centerX - sideLength/2},${centerY + triangleHeight}-${centerX},${centerY}`
            ]
          });
        } else {
          const points = [
            { x: centerX, y: centerY + triangleHeight },
            { x: centerX + sideLength/2, y: centerY },
            { x: centerX - sideLength/2, y: centerY }
          ];
          triangles.push({
            points,
            id: `down-${row}-${col}`,
            number: counter++,
            edges: [
              `${centerX},${centerY + triangleHeight}-${centerX + sideLength/2},${centerY}`,
              `${centerX + sideLength/2},${centerY}-${centerX - sideLength/2},${centerY}`,
              `${centerX - sideLength/2},${centerY}-${centerX},${centerY + triangleHeight}`
            ]
          });
        }
      }
    }
    return triangles;
  };

  const handleTriangleClick = (triangle, event) => {
    if (drawMode === 'fill') {
      setSelectedTriangles(prev => {
        const newMap = new Map(prev);
        if (newMap.has(triangle.id) && newMap.get(triangle.id) === currentColor) {
          newMap.delete(triangle.id);
        } else {
          newMap.set(triangle.id, currentColor);
        }
        return newMap;
      });
    } else {
      const svgElement = event.currentTarget.closest('svg');
      const svgRect = svgElement.getBoundingClientRect();
      const clickX = event.clientX - svgRect.left;
      const clickY = event.clientY - svgRect.top;
      
      const closestEdge = triangle.edges.reduce((closest, edge) => {
        const [start, end] = edge.split('-');
        const [x1, y1] = start.split(',').map(Number);
        const [x2, y2] = end.split(',').map(Number);
        
        const distance = distanceToLine(clickX, clickY, x1, y1, x2, y2);
        return distance < closest.distance ? { edge, distance } : closest;
      }, { edge: null, distance: Infinity });

      if (closestEdge.edge && closestEdge.distance < 10) {
        setSelectedEdges(prev => {
          const newSet = new Set(prev);
          if (newSet.has(closestEdge.edge)) {
            newSet.delete(closestEdge.edge);
          } else {
            newSet.add(closestEdge.edge);
          }
          return newSet;
        });
      }
    }
  };

  const distanceToLine = (x, y, x1, y1, x2, y2) => {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;
    let xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setDrawMode('fill')}
          className={`px-4 py-2 rounded ${drawMode === 'fill' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Fill Triangles
        </button>
        <button
          onClick={() => setDrawMode('edge')}
          className={`px-4 py-2 rounded ${drawMode === 'edge' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Draw Edges
        </button>
      </div>
      {drawMode === 'fill' && (
        <div className="mb-4 flex gap-2">
          {colorOptions.map(color => (
            <button
              key={color.value}
              onClick={() => setCurrentColor(color.value)}
              className={`w-8 h-8 rounded-full border-2 ${currentColor === color.value ? 'border-black' : 'border-gray-300'}`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      )}
      <svg 
        width={width} 
        height={height} 
        viewBox={`${-sideLength} 0 ${width + 2*sideLength} ${height}`}
        className="border border-gray-300"
      >
        <g>
          {generateTriangles().map((triangle) => {
            const center = getTriangleCenter(triangle.points);
            return (
              <React.Fragment key={triangle.id}>
                <path
                  d={`M ${triangle.points[0].x},${triangle.points[0].y} 
                      L ${triangle.points[1].x},${triangle.points[1].y} 
                      L ${triangle.points[2].x},${triangle.points[2].y} Z`}
                  fill={selectedTriangles.has(triangle.id) ? selectedTriangles.get(triangle.id) : 'white'}
                  stroke="#d1d5db"
                  strokeWidth="1"
                  onClick={(e) => handleTriangleClick(triangle, e)}
                  className="cursor-pointer hover:fill-blue-50 transition-colors"
                />
                <text
                  x={center.x}
                  y={center.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs select-none pointer-events-none"
                  fill={selectedTriangles.has(triangle.id) ? 'white' : 'black'}
                >
                  {triangle.number}
                </text>
                {drawMode === 'edge' && triangle.edges.map((edge, i) => {
                  const [start, end] = edge.split('-');
                  const [x1, y1] = start.split(',').map(Number);
                  const [x2, y2] = end.split(',').map(Number);
                  return (
                    <line
                      key={`${triangle.id}-edge-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={selectedEdges.has(edge) ? '#1e40af' : 'transparent'}
                      strokeWidth="3"
                      className="cursor-pointer"
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </g>
      </svg>
      <div className="mt-4 flex gap-2">
        <button
          onClick={applyPenrosePattern}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Penrose Triangle
        </button>
        <button
          onClick={() => {
            setSelectedTriangles(new Map());
            setSelectedEdges(new Set());
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          placeholder="Enter numbers (e.g., 1,2,3)"
          className="px-3 py-2 border rounded"
        />
        <button
          onClick={handleNumberAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default IsometricGrid;
