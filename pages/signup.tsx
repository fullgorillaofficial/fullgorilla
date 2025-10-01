import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    accountType: 'individual',
    plan: 'free'
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/questionnaire');
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Sign Up - Full Gorilla Meal Planner</title>
      </Head>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '550px', width: '100%', background: '#2d2d2d', padding: '50px 40px', borderRadius: '20px', border: '3px solid #00ff88' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Image 
              src="/images/full-gorilla-logo-white.png" 
              alt="Full Gorilla" 
              width={200}
              height={100}
              style={{ 
                width: '200px',
                height: 'auto',
                filter: 'drop-shadow(0 8px 20px rgba(0, 255, 136, 0.3))'
              }} 
              priority
            />
          </div>
          <h1 style={{ color: '#00ff88', fontSize: '42px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>Join The Pack</h1>
          <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '40px', fontSize: '16px' }}>Start your journey to beast-mode nutrition</p>
          
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: '#ff4444', background: '#331111', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}
            
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="age" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
                />
              </div>

              <div>
                <label htmlFor="gender" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="accountType" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
              >
                <option value="individual">Individual</option>
                <option value="couple">Couple</option>
                <option value="family">Family (up to 4)</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="plan" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Choose Your Level</label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
              >
                <option value="free">Just Monkeying Around (Free - 7 days/month)</option>
                <option value="paid">Full Gorilla Official (Pro - $9.99/mo)</option>
              </select>
            </div>

            <button type="submit" style={{ width: '100%', padding: '16px', background: '#00ff88', color: '#1a1a1a', border: 'none', cursor: 'pointer', borderRadius: '50px', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)' }}>
              Unleash The Beast!
            </button>
          </form>
          
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#aaa', fontSize: '15px' }}>
            Already have an account? <Link href="/login" style={{ color: '#00ff88', fontWeight: '700', textDecoration: 'none' }}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
