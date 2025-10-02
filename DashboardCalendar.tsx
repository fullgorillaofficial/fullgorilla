import MealCard from './MealCard';

interface DashboardCalendarProps {
  mealPlan: any;
}

export default function DashboardCalendar({ mealPlan }: DashboardCalendarProps) {
  if (!mealPlan) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', background: '#2d2d2d', borderRadius: '20px', border: '3px solid #00ff88' }}>
        <h3 style={{ color: '#00ff88', fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px' }}>No Meal Plan Yet!</h3>
        <p style={{ color: '#aaa', fontSize: '18px' }}>Complete your questionnaire to get started and unleash your potential!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1a1a1a', marginBottom: '30px', textTransform: 'uppercase' }}>Week of {mealPlan.weekOf}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {mealPlan.meals?.map((dayMeals: any) => (
          <div key={dayMeals.day} style={{ 
            background: 'white', 
            padding: '30px', 
            borderRadius: '20px',
            border: '3px solid #00ff88',
            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '25px', fontSize: '28px', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase' }}>{dayMeals.day}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#00ff88', fontWeight: '800', textTransform: 'uppercase', fontSize: '16px' }}>🍳 Breakfast</h4>
                <MealCard meal={dayMeals.breakfast} />
              </div>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#00ff88', fontWeight: '800', textTransform: 'uppercase', fontSize: '16px' }}>🥗 Lunch</h4>
                <MealCard meal={dayMeals.lunch} />
              </div>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#00ff88', fontWeight: '800', textTransform: 'uppercase', fontSize: '16px' }}>🍽️ Dinner</h4>
                <MealCard meal={dayMeals.dinner} />
              </div>
            </div>

            <div style={{ marginTop: '25px', padding: '15px 20px', background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#1a1a1a', fontSize: '16px', fontWeight: '900', textTransform: 'uppercase' }}>Total Calories:</strong>
              <span style={{ color: '#1a1a1a', fontSize: '24px', fontWeight: '900' }}>{dayMeals.breakfast.calories + dayMeals.lunch.calories + dayMeals.dinner.calories}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
