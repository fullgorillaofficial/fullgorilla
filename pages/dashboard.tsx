import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import DashboardCalendar from '../components/DashboardCalendar';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch('/api/meals');
        const data = await response.json();
        setMealPlan(data);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMealPlan();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard - Full Gorilla Meal Planner</title>
      </Head>
      <div style={{ padding: '40px 20px', background: '#f5f5f5', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '10px', textTransform: 'uppercase' }}>
              Welcome Back, {session?.user?.name || 'Beast'}! 🦍
            </h1>
            <p style={{ fontSize: '20px', color: '#555', fontWeight: '500' }}>Your weekly meal plan to unleash your potential</p>
          </div>
          
          <DashboardCalendar mealPlan={mealPlan} />

          <div style={{ marginTop: '50px', background: '#1a1a1a', padding: '40px', borderRadius: '20px', border: '3px solid #00ff88' }}>
            <h2 style={{ color: '#00ff88', fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '25px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => router.push('/cookbooks')}
                style={{ padding: '16px 35px', background: '#00ff88', color: '#1a1a1a', border: 'none', cursor: 'pointer', borderRadius: '50px', fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)' }}
              >
                Browse Cookbooks
              </button>
              <button 
                onClick={() => router.push('/questionnaire')}
                style={{ padding: '16px 35px', background: 'transparent', color: '#00ff88', border: '3px solid #00ff88', cursor: 'pointer', borderRadius: '50px', fontSize: '16px', fontWeight: '900', textTransform: 'uppercase' }}
              >
                Update Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
