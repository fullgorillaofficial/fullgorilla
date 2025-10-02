import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const sampleMealPlan = {
      weekOf: new Date().toISOString().split('T')[0],
      meals: [
        {
          day: 'Monday',
          breakfast: { id: 1, name: 'Avocado Toast', calories: 350 },
          lunch: { id: 2, name: 'Grilled Chicken Salad', calories: 450 },
          dinner: { id: 3, name: 'Salmon with Roasted Vegetables', calories: 550 }
        },
        {
          day: 'Tuesday',
          breakfast: { id: 4, name: 'Greek Yogurt Parfait', calories: 300 },
          lunch: { id: 5, name: 'Quinoa Buddha Bowl', calories: 500 },
          dinner: { id: 6, name: 'Turkey Meatballs with Pasta', calories: 600 }
        },
        {
          day: 'Wednesday',
          breakfast: { id: 7, name: 'Oatmeal with Berries', calories: 280 },
          lunch: { id: 8, name: 'Vegetable Stir Fry', calories: 420 },
          dinner: { id: 9, name: 'Grilled Steak with Sweet Potato', calories: 650 }
        }
      ]
    };

    return res.status(200).json(sampleMealPlan);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
