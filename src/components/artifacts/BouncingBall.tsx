import { useState, useEffect, useRef } from 'react';

export default function BouncingBall() {
  const [speed, setSpeed] = useState(3);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ dx: 2, dy: 1.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((pos) => {
        const container = canvasRef.current;
        if (!container) return pos;

        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const ballSize = 30;

        let newX = pos.x + velocity.dx * (speed / 3);
        let newY = pos.y + velocity.dy * (speed / 3);
        let newDx = velocity.dx;
        let newDy = velocity.dy;

        if (newX <= 0 || newX >= width - ballSize) {
          newDx = -velocity.dx;
          newX = Math.max(0, Math.min(width - ballSize, newX));
        }
        if (newY <= 0 || newY >= height - ballSize) {
          newDy = -velocity.dy;
          newY = Math.max(0, Math.min(height - ballSize, newY));
        }

        if (newDx !== velocity.dx || newDy !== velocity.dy) {
          setVelocity({ dx: newDx, dy: newDy });
        }

        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [velocity, speed]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div
        ref={canvasRef}
        style={{
          width: '100%',
          height: '300px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
          background: '#fafafa',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="speed">Speed:</label>
        <input
          id="speed"
          type="range"
          min="0"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ flex: 1, maxWidth: '200px' }}
        />
        <span style={{ minWidth: '2rem' }}>{speed}</span>
      </div>
    </div>
  );
}
