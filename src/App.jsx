import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import VanityScene from './components/VanityScene';
import { jsPDF } from 'jspdf';

export default function App() {
  const [stations, setStations] = useState(1);
  const [basinColor, setBasinColor] = useState({ hex: '#ffffff', code: 'WHT' });
  const [faucetFinish, setFaucetFinish] = useState({ hex: '#e5e5e5', code: 'CHRM' });
  const [wallColor, setWallColor] = useState('#3a3d40');
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef();
  const sku = `VN-ST${stations}-${basinColor.code}-${faucetFinish.code}`;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
     
      if (mobile) setIsDrawerOpen(false);
      else setIsDrawerOpen(true);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const downloadPDF = () => {
    if (!canvasRef.current) return;
    const imgData = canvasRef.current.toDataURL('image/png');
    const doc = new jsPDF();
    
    doc.setFillColor(18, 30, 49);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("COMMERCIAL VANITY SPECIFICATION SHEET", 15, 22);

    doc.setFont("monospace", "bold");
    doc.setFontSize(15);
    doc.setTextColor(0, 122, 204);
    doc.text(`CONFIG SKU: ${sku}`, 15, 48);
    doc.addImage(imgData, 'PNG', 15, 55, 180, 95);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text("Configuration Parameters", 15, 165);
    doc.line(15, 168, 195, 168);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Modular Station Layout: ${stations} Station Unit(s)`, 18, 178);
    doc.text(`Solid Surface Slab Tone: ${basinColor.code}`, 18, 188);
    doc.text(`Hardware Fixture Finish: ${faucetFinish.code}`, 18, 198);

    doc.save(`SpecSheet-${sku}.pdf`);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#111111', color: 'white', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
      
      {/* 3D Canvas Viewport */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Canvas 
          shadows
          gl={{ preserveDrawingBuffer: true }} 
          camera={{ position: [0, 2.2, 5.0], fov: 45 }}
          onCreated={({ gl }) => { canvasRef.current = gl.domElement; }}
        >
          <color attach="background" args={['#141414']} />
          <VanityScene 
            stations={stations} 
            basinColor={basinColor.hex} 
            faucetFinish={faucetFinish} 
            wallColor={wallColor} 
          />
          <OrbitControls enableDamping maxPolarAngle={Math.PI / 2 - 0.05} minDistance={2} maxDistance={8} />
        </Canvas>
      </div>

    
      {isMobile && (
        <button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 100, background: '#00a2ff', color: 'white', border: 'none', padding: '12px 20px', borderRadius: 12, fontWeight: 'bold', fontSize: 14, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,162,255,0.4)', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}
        >
          {isDrawerOpen ? '✕ Close Menu' : '✏️ Configure'}
        </button>
      )}

      
      <div style={{ 
        position: 'absolute', 
        top: isMobile ? (isDrawerOpen ? '0' : '-100%') : '20px', 
        left: isMobile ? '0' : '20px', 
        width: isMobile ? '100%' : '320px', 
        height: isMobile ? 'auto' : 'calc(100vh - 40px)', 
        maxHeight: isMobile ? '85vh' : 'none',
        zIndex: 90, 
        background: 'rgba(20, 20, 20, 0.65)', 
        backdropFilter: 'blur(24px) saturate(180%)', 
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        padding: '30px 24px', 
        borderRadius: isMobile ? '0 0 24px 24px' : '20px', 
        border: '1px solid rgba(255, 255, 255, 0.08)', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        boxSizing: 'border-box',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        
       
        <div style={{ marginBottom: 25 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 22, background: '#00a2ff', borderRadius: 4, display: 'inline-block' }}></span>
            VANITY R3F PRO
          </h2>
          <p style={{ margin: '6px 0 0 0', fontSize: 12, color: '#aaa' }}>Commercial 3D Configurator</p>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 25, marginTop: 0 }} />

       
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 11, color: '#00a2ff', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>Modular Stations</label>
          <div style={{ display: 'flex', gap: 8, background: 'rgba(0,0,0,0.2)', padding: 4, borderRadius: 10 }}>
            {[1, 2, 3].map(num => (
              <button 
                key={num} 
                onClick={() => setStations(num)} 
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  background: stations === num ? '#00a2ff' : 'transparent', 
                  color: stations === num ? '#white' : '#ccc', 
                  border: 'none', 
                  borderRadius: 8, 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
              >
                {num} {num === 1 ? 'Unit' : 'Units'}
              </button>
            ))}
          </div>
        </div>

       
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 11, color: '#00a2ff', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>Solid Surface Tone</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              {hex: '#ffffff', code: 'WHT', name: 'Alabaster'}, 
              {hex: '#2c3e50', code: 'BLU', name: 'Slate Blue'}, 
              {hex: '#151515', code: 'BLK', name: 'Midnight'}
            ].map(c => (
              <div 
                key={c.code} 
                onClick={() => setBasinColor(c)} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)',
                  border: basinColor.code === c.code ? '2px solid #00a2ff' : '2px solid rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  padding: '10px 6px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: basinColor.code === c.code ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.hex, margin: '0 auto 6px auto', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <div style={{ fontSize: 10, fontWeight: 600, color: basinColor.code === c.code ? '#fff' : '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
              </div>
            ))}
          </div>
        </div>

       
        <div style={{ marginBottom: 30 }}>
          <label style={{ display: 'block', fontSize: 11, color: '#00a2ff', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>Hardware Finish</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {hex: '#e5e5e5', code: 'CHRM', name: 'Polished Chrome'}, 
              {hex: '#d4af37', code: 'GOLD', name: 'Brushed Gold'}, 
              {hex: '#222222', code: 'MATBLK', name: 'Matte Black'}
            ].map(f => (
              <button 
                key={f.code} 
                onClick={() => setFaucetFinish(f)} 
                style={{ 
                  width: '100%',
                  padding: '12px 16px', 
                  background: faucetFinish.code === f.code ? 'rgba(0,162,255,0.15)' : 'rgba(255,255,255,0.03)', 
                  color: faucetFinish.code === f.code ? '#00a2ff' : '#eee', 
                  border: faucetFinish.code === f.code ? '1px solid #00a2ff' : '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: 10, 
                  cursor: 'pointer', 
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: f.hex, border: '1px solid rgba(255,255,255,0.2)' }} />
                {f.name}
              </button>
            ))}
          </div>
        </div>

       
        <button 
          onClick={downloadPDF} 
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#27ae60', 
            border: 'none', 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: 14,
            borderRadius: 10, 
            cursor: 'pointer', 
            marginTop: 'auto', 
            boxShadow: '0 6px 20px rgba(39,174,96,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#219653'}
          onMouseLeave={(e) => e.target.style.background = '#27ae60'}
        >
          <span>📄</span> Export Spec PDF
        </button>
      </div>

     
      <div style={{ 
        position: 'absolute', 
        bottom: isMobile ? '16px' : '20px', 
        right: isMobile ? '16px' : '20px', 
        zIndex: 10, 
        background: 'rgba(0, 122, 204, 0.9)', 
        backdropFilter: 'blur(10px)',
        padding: '10px 18px', 
        borderRadius: 8, 
        fontFamily: 'monospace', 
        fontSize: isMobile ? 12 : 14, 
        fontWeight: 'bold', 
        letterSpacing: 1,
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        SKU: {sku}
      </div>
    </div>
  );
}