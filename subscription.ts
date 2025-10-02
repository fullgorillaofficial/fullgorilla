import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = req.query.userId as string;

    const subscriptionData = {
      userId: userId || '1',
      plan: 'free',
      status: 'active',
      features: {
        mealsPerMonth: 7,
        cookbookAccess: 'limited',
        totalMealsAvailable: 48
      },
      upgradeUrl: '/api/stripe/checkout'
    };

    return res.status(200).json(subscriptionData);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
