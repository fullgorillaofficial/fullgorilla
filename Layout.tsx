import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        background: '#1a1a1a', 
        color: 'white', 
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #00ff88'
      }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/images/full-gorilla-logo-white.png" alt="Full Gorilla Logo" style={{ height: '50px', width: 'auto' }} />
        </Link>
        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          {session ? (
            <>
              <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase' }}>Dashboard</Link>
              <Link href="/cookbooks" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase' }}>Cookbooks</Link>
              <Link href="/questionnaire" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase' }}>Preferences</Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{ 
                  background: '#00ff88', 
                  color: '#1a1a1a', 
                  border: 'none', 
                  padding: '10px 20px', 
                  cursor: 'pointer',
                  borderRadius: '50px',
                  fontWeight: '900',
                  fontSize: '14px',
                  textTransform: 'uppercase'
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase' }}>Login</Link>
              <Link href="/signup" style={{ 
                background: '#00ff88', 
                color: '#1a1a1a', 
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: '900',
                fontSize: '14px',
                textTransform: 'uppercase'
              }}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{ 
        background: '#1a1a1a', 
        padding: '30px', 
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '3px solid #00ff88'
      }}>
        <p style={{ color: '#aaa', margin: 0, fontSize: '14px' }}>&copy; 2025 Full Gorilla Meal Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}
