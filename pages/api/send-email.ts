import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import {
  sendPaymentFailureEmail,
  sendWeeklyMealPlanEmail,
  sendWelcomeEmail,
  sendSubscriptionUpgradeEmail,
  sendSubscriptionDowngradeEmail,
  sendSubscriptionRenewalReminderEmail,
  sendMealRatingReminderEmail,
  sendPasswordResetEmail
} from '../../utils/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { type, email, name } = req.body;

  if (!type || !email || !name) {
    return res.status(400).json({ error: 'Missing required fields: type, email, name' });
  }

  try {
    let success = false;

    switch (type) {
      case 'welcome': {
        const { accountType } = req.body;
        success = await sendWelcomeEmail(email, name, accountType);
        break;
      }

      case 'payment_failure': {
        const { gracePeriodEnd, amount, lastFourDigits, failureReason } = req.body;
        if (!gracePeriodEnd) {
          return res.status(400).json({ error: 'gracePeriodEnd is required for payment_failure emails' });
        }
        success = await sendPaymentFailureEmail(
          email, 
          name, 
          new Date(gracePeriodEnd),
          amount,
          lastFourDigits,
          failureReason
        );
        break;
      }

      case 'weekly_meal_plan': {
        const { weekStartDate, mealPreviews, totalCalories, totalPrepTime } = req.body;
        if (!weekStartDate) {
          return res.status(400).json({ error: 'weekStartDate is required for weekly_meal_plan emails' });
        }
        success = await sendWeeklyMealPlanEmail(
          email, 
          name, 
          new Date(weekStartDate),
          mealPreviews,
          totalCalories,
          totalPrepTime
        );
        break;
      }

      case 'subscription_upgrade': {
        const upgradeAmount = req.body.amount || 20;
        success = await sendSubscriptionUpgradeEmail(email, name, upgradeAmount);
        break;
      }

      case 'subscription_downgrade': {
        const { reason } = req.body;
        success = await sendSubscriptionDowngradeEmail(
          email, 
          name, 
          reason || 'payment failure after grace period'
        );
        break;
      }

      case 'subscription_renewal_reminder': {
        const { renewalDate, renewalAmount, renewalLastFourDigits } = req.body;
        if (!renewalDate) {
          return res.status(400).json({ error: 'renewalDate is required for subscription_renewal_reminder emails' });
        }
        success = await sendSubscriptionRenewalReminderEmail(
          email,
          name,
          new Date(renewalDate),
          renewalAmount || 20,
          renewalLastFourDigits
        );
        break;
      }

      case 'meal_rating_reminder': {
        const { unratedMealsCount } = req.body;
        if (!unratedMealsCount) {
          return res.status(400).json({ error: 'unratedMealsCount is required for meal_rating_reminder emails' });
        }
        success = await sendMealRatingReminderEmail(email, name, unratedMealsCount);
        break;
      }

      case 'password_reset': {
        const { resetToken, expiresInHours } = req.body;
        if (!resetToken) {
          return res.status(400).json({ error: 'resetToken is required for password_reset emails' });
        }
        success = await sendPasswordResetEmail(
          email,
          name,
          resetToken,
          expiresInHours || 24
        );
        break;
      }

      default:
        return res.status(400).json({ 
          error: 'Invalid email type. Must be one of: welcome, payment_failure, weekly_meal_plan, subscription_upgrade, subscription_downgrade, subscription_renewal_reminder, meal_rating_reminder, password_reset' 
        });
    }

    if (success) {
      return res.status(200).json({ 
        message: 'Email sent successfully',
        type,
        recipient: email
      });
    } else {
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error in send-email API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
