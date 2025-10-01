import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Head from 'next/head';

interface Cookbook {
  id: string;
  name: string;
  slug: string;
  theme: string;
  description: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  featured: boolean;
  mealCount: number;
  imageUrl?: string;
  hasAccess?: boolean;
}

export default function Cookbooks() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState<string>('free');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login?redirect=/cookbooks');
      return;
    }

    fetchCookbooks();
  }, [session, status]);

  const fetchCookbooks = async () => {
    try {
      const response = await fetch('/api/cookbooks');
      if (response.ok) {
        const data = await response.json();
        setCookbooks(data.cookbooks);
        setUserPlan(data.userPlan || 'free');
      }
    } catch (error) {
      console.error('Error fetching cookbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCookbookClick = (cookbook: Cookbook) => {
    if (cookbook.hasAccess || userPlan === 'pro') {
      router.push(`/cookbooks/${cookbook.slug}`);
    }
  };

  const unlockedCookbooks = cookbooks.filter(cb => cb.hasAccess);
  const lockedCookbooks = cookbooks.filter(cb => !cb.hasAccess);
  const totalMealsUnlocked = unlockedCookbooks.length * 12;

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Loading your cookbooks...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Cookbooks - Full Gorilla Meal Planner</title>
      </Head>
      
      <div className="cookbooks-page">
        <div className="welcome-section">
          <h1>🦍 YOUR COOKBOOK ARSENAL</h1>
          
          {userPlan === 'free' && (
            <div className="freemium-message">
              <h2>JUST MONKEYING AROUND</h2>
              <p>Based on your goals, we've unlocked <strong>4 cookbooks</strong> to fuel your journey:</p>
              <div className="unlock-stats">
                <div className="stat">
                  <span className="stat-number">{unlockedCookbooks.length}</span>
                  <span className="stat-label">COOKBOOKS UNLOCKED</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{totalMealsUnlocked}</span>
                  <span className="stat-label">RECIPES READY</span>
                </div>
              </div>
              <p className="upgrade-hint">
                Ready for <strong>ALL 25 cookbooks</strong> and <strong>2,250+ recipes</strong>?
              </p>
              <button className="upgrade-btn" onClick={() => router.push('/upgrade')}>
                🦍 UNLEASH THE BEAST - GO PRO
              </button>
            </div>
          )}

          {userPlan === 'pro' && (
            <div className="pro-message">
              <h2>🦍 FULL GORILLA UNLEASHED!</h2>
              <p>You have <strong>complete access</strong> to all <strong>25 cookbooks</strong> and <strong>2,250+ recipes</strong>. Beast mode activated!</p>
            </div>
          )}
        </div>

        {unlockedCookbooks.length > 0 && (
          <div className="cookbook-section">
            <h2 className="section-title">✅ YOUR UNLOCKED COOKBOOKS</h2>
            <div className="cookbook-grid">
              {unlockedCookbooks.map((cookbook) => (
                <div
                  key={cookbook.id}
                  className="cookbook-card unlocked"
                  onClick={() => handleCookbookClick(cookbook)}
                >
                  <div className="cookbook-image">
                    {cookbook.imageUrl ? (
                      <img src={cookbook.imageUrl} alt={cookbook.name} />
                    ) : (
                      <div className="placeholder-image">📚</div>
                    )}
                  </div>
                  <div className="cookbook-info">
                    <h3>{cookbook.name}</h3>
                    <p className="cookbook-theme">{cookbook.theme}</p>
                    <span className="meal-count">{cookbook.mealCount} recipes</span>
                  </div>
                  <div className="cookbook-badge unlocked-badge">
                    ✓ Unlocked
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userPlan === 'free' && lockedCookbooks.length > 0 && (
          <div className="cookbook-section">
            <h2 className="section-title">🔒 UNLEASH THE FULL ARSENAL</h2>
            <p className="section-subtitle">
              {lockedCookbooks.length} more cookbooks waiting for you with Full Gorilla Official (Pro)
            </p>
            <div className="cookbook-grid">
              {lockedCookbooks.map((cookbook) => (
                <div
                  key={cookbook.id}
                  className="cookbook-card locked"
                  onClick={() => router.push('/upgrade')}
                >
                  <div className="cookbook-image locked-overlay">
                    {cookbook.imageUrl ? (
                      <img src={cookbook.imageUrl} alt={cookbook.name} />
                    ) : (
                      <div className="placeholder-image">📚</div>
                    )}
                    <div className="lock-icon">🔒</div>
                  </div>
                  <div className="cookbook-info">
                    <h3>{cookbook.name}</h3>
                    <p className="cookbook-theme">{cookbook.theme}</p>
                    <span className="meal-count">{cookbook.mealCount} recipes</span>
                  </div>
                  <div className="cookbook-badge locked-badge">
                    PRO ONLY
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cookbooks-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 50px;
        }

        .welcome-section h1 {
          font-size: 48px;
          color: #1a1a1a;
          margin-bottom: 30px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .freemium-message {
          background: #1a1a1a;
          color: white;
          padding: 50px 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          border: 3px solid #00ff88;
          box-shadow: 0 10px 40px rgba(0, 255, 136, 0.2);
        }

        .freemium-message h2 {
          font-size: 32px;
          margin-bottom: 15px;
          color: #00ff88;
          font-weight: 900;
          text-transform: uppercase;
        }

        .freemium-message p {
          font-size: 18px;
          line-height: 1.6;
          margin: 15px 0;
        }

        .unlock-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin: 30px 0;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 56px;
          font-weight: 900;
          color: #00ff88;
        }

        .stat-label {
          font-size: 13px;
          color: #1a1a1a;
          margin-top: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .upgrade-hint {
          font-size: 20px;
          margin: 25px 0 20px;
          font-weight: 500;
        }

        .upgrade-btn {
          background: #00ff88;
          color: #1a1a1a;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 900;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
          text-transform: uppercase;
        }

        .upgrade-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 255, 136, 0.5);
        }

        .pro-message {
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          color: #1a1a1a;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          border: 3px solid #00ff88;
        }

        .pro-message h2 {
          font-size: 32px;
          margin-bottom: 10px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cookbook-section {
          margin-bottom: 50px;
        }

        .section-title {
          font-size: 32px;
          color: #1a1a1a;
          margin-bottom: 10px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .section-subtitle {
          font-size: 17px;
          color: #1a1a1a;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .cookbook-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
        }

        .cookbook-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          border: 3px solid #00ff88;
        }

        .cookbook-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 255, 136, 0.2);
        }

        .cookbook-card.locked {
          opacity: 0.7;
        }

        .cookbook-card.locked:hover {
          opacity: 0.9;
        }

        .cookbook-image {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .cookbook-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          font-size: 64px;
        }

        .locked-overlay {
          position: relative;
        }

        .locked-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .lock-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          z-index: 2;
        }

        .cookbook-info {
          padding: 20px;
        }

        .cookbook-info h3 {
          font-size: 20px;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .cookbook-theme {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.4;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .meal-count {
          display: inline-block;
          background: #00ff88;
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 12px;
          color: #1a1a1a;
          font-weight: 800;
          text-transform: uppercase;
        }

        .cookbook-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 3;
        }

        .unlocked-badge {
          background: #00ff88;
          color: #1a1a1a;
          font-weight: 900;
        }

        .locked-badge {
          background: rgba(26, 26, 26, 0.9);
          color: #00ff88;
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .cookbooks-page {
            padding: 20px 15px;
          }

          .welcome-section h1 {
            font-size: 32px;
          }

          .freemium-message {
            padding: 25px;
          }

          .freemium-message h2 {
            font-size: 22px;
          }

          .unlock-stats {
            gap: 30px;
          }

          .stat-number {
            font-size: 36px;
          }

          .cookbook-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }
      `}</style>
    </Layout>
  );
}
