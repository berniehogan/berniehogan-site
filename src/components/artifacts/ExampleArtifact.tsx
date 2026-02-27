import { useState } from 'react';

/**
 * Example artifact component.
 * 
 * Drop your Claude-generated React artifacts here.
 * They'll be hydrated as interactive islands on otherwise static pages.
 * 
 * Usage in an Astro page:
 * ---
 * import ExampleArtifact from '../components/artifacts/ExampleArtifact';
 * ---
 * <ExampleArtifact client:load />
 */

export default function ExampleArtifact() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '1.5rem', 
      border: '1px solid #e0e0e0', 
      borderRadius: '4px',
      margin: '1.5rem 0' 
    }}>
      <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
        Interactive artifact example
      </p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #1a1a1a',
          background: 'white',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}
