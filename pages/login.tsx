import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Head>
        <title>Login - Full Gorilla Meal Planner</title>
      </Head>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '450px', width: '100%', background: '#2d2d2d', padding: '50px 40px', borderRadius: '20px', border: '3px solid #00ff88' }}>
          <h1 style={{ color: '#00ff88', fontSize: '42px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>Welcome Back</h1>
          <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '40px', fontSize: '16px' }}>Ready to unleash your inner beast?</p>
          
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: '#ff4444', background: '#331111', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}
            
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="email" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border 0.3s' }}
                onFocus={(e) => e.target.style.border = '2px solid #00ff88'}
                onBlur={(e) => e.target.style.border = '2px solid #444'}
              />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{ color: '#00ff88', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 18px', background: '#1a1a1a', border: '2px solid #444', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border 0.3s' }}
                onFocus={(e) => e.target.style.border = '2px solid #00ff88'}
                onBlur={(e) => e.target.style.border = '2px solid #444'}
              />
            </div>
            
            <button type="submit" style={{ width: '100%', padding: '16px', background: '#00ff88', color: '#1a1a1a', border: 'none', cursor: 'pointer', borderRadius: '50px', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Login
            </button>
          </form>
          
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#aaa', fontSize: '15px' }}>
            Don't have an account? <Link href="/signup" style={{ color: '#00ff88', fontWeight: '700', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
