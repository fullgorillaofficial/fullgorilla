import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, age, gender, accountType, plan } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    age,
    gender,
    accountType,
    plan,
    createdAt: new Date().toISOString()
  };

  return res.status(201).json({ 
    message: 'User created successfully',
    user: newUser 
  });
}
