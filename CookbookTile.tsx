interface CookbookTileProps {
  cookbook: {
    id: number;
    name: string;
    theme: string;
    mealCount: number;
    image?: string;
    isPremium: boolean;
  };
}

export default function CookbookTile({ cookbook }: CookbookTileProps) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '12px', 
      overflow: 'hidden',
      background: 'white',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {cookbook.isPremium && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#FFD700',
          color: '#000',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          PREMIUM
        </div>
      )}
      
      <div style={{ 
        width: '100%', 
        height: '200px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px'
      }}>
        🍽️
      </div>
      
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{cookbook.name}</h3>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>{cookbook.theme}</p>
        <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>{cookbook.mealCount} recipes</p>
      </div>
    </div>
  );
}
