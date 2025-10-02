import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { cookbooksData } from '../../data/cookbooksData';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscription: true,
        cookbookAccess: {
          include: {
            cookbook: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userPlan = user.subscription?.plan || 'free';
    const accessibleCookbookIds = new Set(
      user.cookbookAccess.map(access => access.cookbook.slug)
    );

    const cookbooksWithAccess = cookbooksData.map(cookbookData => ({
      id: cookbookData.slug,
      ...cookbookData,
      hasAccess: userPlan === 'pro' || accessibleCookbookIds.has(cookbookData.slug)
    }));

    return res.status(200).json({
      cookbooks: cookbooksWithAccess,
      userPlan
    });

  } catch (error) {
    console.error('Error fetching cookbooks:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch cookbooks',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    await prisma.$disconnect();
  }
}
