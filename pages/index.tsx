import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Full Gorilla Meal Planner - Build Healthier Eating Habits</title>
        <meta name="description" content="Weekly meal planning and grocery lists for individuals, couples, and families" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: 'white' }}>
        <img 
          src="/images/full-gorilla-logo-white.png" 
          alt="Full Gorilla" 
          style={{ 
            maxWidth: '300px', 
            width: '100%', 
            height: 'auto', 
            marginBottom: '40px',
            filter: 'drop-shadow(0 10px 30px rgba(0, 255, 136, 0.3))'
          }} 
        />
        <h1 style={{ fontSize: '64px', marginBottom: '20px', color: '#00ff88', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>
          UNLEASH YOUR INNER BEAST
        </h1>
        <p style={{ fontSize: '28px', color: '#e0e0e0', maxWidth: '900px', margin: '0 auto 50px', fontWeight: '500' }}>
          The most complete custom meal planning and grocery list system ever built
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{
            background: '#00ff88',
            color: '#1a1a1a',
            padding: '18px 50px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: '900',
            textTransform: 'uppercase',
            boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)',
            transition: 'all 0.3s'
          }}>
            Get Started Free
          </Link>
          <Link href="/login" style={{
            background: 'transparent',
            color: '#00ff88',
            padding: '18px 50px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: '900',
            textTransform: 'uppercase',
            border: '3px solid #00ff88'
          }}>
            Login
          </Link>
        </div>
      </div>

      <div style={{ padding: '60px 20px', background: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          display: 'block',
          position: 'absolute',
          top: '18%',
          left: '-8%',
          width: '450px',
          height: '300px',
          backgroundImage: 'url(/images/food-bg-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '1',
          transform: 'rotate(-15deg)',
          borderRadius: '20px'
        }}></div>
        <div style={{
          display: 'block',
          position: 'absolute',
          top: '42%',
          right: '-8%',
          width: '450px',
          height: '300px',
          backgroundImage: 'url(/images/food-bg-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '1',
          transform: 'rotate(12deg)',
          borderRadius: '20px'
        }}></div>
        <div style={{
          display: 'block',
          position: 'absolute',
          top: '70%',
          left: '-8%',
          width: '450px',
          height: '300px',
          backgroundImage: 'url(/images/food-bg-3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '1',
          transform: 'rotate(-15deg)',
          borderRadius: '20px'
        }}></div>

        <h2 style={{ fontSize: '42px', marginBottom: '50px', color: '#1a1a1a', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          Why Full Gorilla?
        </h2>
        
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ padding: '40px 30px', background: '#f8f8f8', borderRadius: '16px', border: '3px solid #00ff88' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🍽️</div>
            <h3 style={{ marginBottom: '15px', fontSize: '26px', fontWeight: '800', color: '#1a1a1a' }}>2,250 RECIPES</h3>
            <p style={{ color: '#1a1a1a', lineHeight: '1.8', fontSize: '17px' }}>
              25 themed cookbooks with 90 meals each. Mediterranean to Keto, Italian to Asian Fusion—we've got you covered.
            </p>
          </div>

          <div style={{ padding: '40px 30px', background: '#f8f8f8', borderRadius: '16px', border: '3px solid #00ff88' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📋</div>
            <h3 style={{ marginBottom: '15px', fontSize: '26px', fontWeight: '800', color: '#1a1a1a' }}>SMART MEAL PLANS</h3>
            <p style={{ color: '#1a1a1a', lineHeight: '1.8', fontSize: '17px' }}>
              Personalized weekly plans based on YOUR health goals, dietary restrictions, and taste preferences.
            </p>
          </div>

          <div style={{ padding: '40px 30px', background: '#f8f8f8', borderRadius: '16px', border: '3px solid #00ff88' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
            <h3 style={{ marginBottom: '15px', fontSize: '26px', fontWeight: '800', color: '#1a1a1a' }}>AUTO GROCERY LISTS</h3>
            <p style={{ color: '#1a1a1a', lineHeight: '1.8', fontSize: '17px' }}>
              Organized shopping lists categorized by aisle, generated automatically from your weekly meal plan.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 20px', background: '#1a1a1a' }}>
          <h2 style={{ fontSize: '48px', marginBottom: '20px', color: '#00ff88', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center' }}>Choose Your Level</h2>
          <p style={{ fontSize: '20px', color: '#e0e0e0', textAlign: 'center', marginBottom: '60px' }}>You can always start with Freemium and upgrade to Pro when you're ready to Unleash The Beast!</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginTop: '40px', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ background: '#2d2d2d', padding: '50px 35px', borderRadius: '20px', border: '3px solid #555' }}>
              <h3 style={{ fontSize: '32px', marginBottom: '10px', color: '#00ff88', fontWeight: '900' }}>JUST MONKEYING AROUND</h3>
              <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '20px' }}>Freemium Plan</p>
              <p style={{ fontSize: '48px', fontWeight: '900', color: '#00ff88', marginBottom: '30px' }}>$0<span style={{ fontSize: '20px', fontWeight: 'normal', color: '#aaa' }}>/mo</span></p>
              <ul style={{ textAlign: 'left', lineHeight: '2.2', color: '#ddd', listStyle: 'none', padding: 0 }}>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span> 7 days of meals per month</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span> 4 cookbooks (48 meals)</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span> Basic meal planning</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span> Grocery list generation</li>
              </ul>
              <Link href="/signup" style={{
                display: 'block',
                background: 'transparent',
                color: '#00ff88',
                padding: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
                marginTop: '40px',
                fontWeight: '900',
                textTransform: 'uppercase',
                border: '3px solid #00ff88',
                textAlign: 'center',
                fontSize: '18px'
              }}>
                Start Free
              </Link>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)', padding: '50px 35px', borderRadius: '20px', border: '3px solid #00ff88', position: 'relative', boxShadow: '0 10px 40px rgba(0, 255, 136, 0.3)' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-18px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: '#1a1a1a',
                color: '#00ff88',
                padding: '8px 30px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '900',
                border: '2px solid #00ff88'
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: '32px', marginBottom: '10px', color: '#1a1a1a', fontWeight: '900' }}>FULL GORILLA OFFICIAL</h3>
              <p style={{ fontSize: '18px', color: '#1a1a1a', marginBottom: '20px', fontWeight: '600' }}>Pro Plan</p>
              <p style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '30px' }}>$9.99<span style={{ fontSize: '20px', fontWeight: 'normal' }}>/mo</span></p>
              <ul style={{ textAlign: 'left', lineHeight: '2.2', color: '#1a1a1a', listStyle: 'none', padding: 0, fontWeight: '500' }}>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✓</span> Unlimited weekly meal plans</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✓</span> All 25 cookbooks (2,250 meals)</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✓</span> Advanced customization</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✓</span> Save & rate favorite meals</li>
                <li style={{ paddingLeft: '25px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✓</span> Family support (up to 4)</li>
              </ul>
              <Link href="/signup" style={{
                display: 'block',
                background: '#1a1a1a',
                color: '#00ff88',
                padding: '16px',
                borderRadius: '50px',
                textDecoration: 'none',
                marginTop: '40px',
                fontWeight: '900',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: '18px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
              }}>
                Unleash The Beast!
              </Link>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Home;
