import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import QuestionnaireForm from '../components/QuestionnaireForm';

export default function Questionnaire() {
  const router = useRouter();
  const [responses, setResponses] = useState({});

  const handleComplete = async (data: any) => {
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Questionnaire - Full Gorilla Meal Planner</title>
      </Head>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Personalize Your Meal Plan</h1>
        <p>Answer these questions to help us create the perfect meal plan for you.</p>
        
        <QuestionnaireForm onComplete={handleComplete} />
      </div>
    </Layout>
  );
}
