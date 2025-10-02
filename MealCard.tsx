interface MealCardProps {
  meal: {
    id: number;
    name: string;
    calories: number;
    image?: string;
  };
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px',
      background: 'white',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {meal.image && (
        <div style={{ 
          width: '100%', 
          height: '150px', 
          background: '#f0f0f0', 
          borderRadius: '4px',
          marginBottom: '10px'
        }} />
      )}
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{meal.name}</h3>
      <p style={{ margin: 0, color: '#666' }}>{meal.calories} calories</p>
    </div>
  );
}
