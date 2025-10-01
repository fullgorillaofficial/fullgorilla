import sgMail from '@sendgrid/mail';

async function getCredentials() {
  if (process.env.REPLIT_CONNECTORS_HOSTNAME) {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (xReplitToken) {
      try {
        const connectionSettings = await fetch(
          'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
          {
            headers: {
              'Accept': 'application/json',
              'X_REPLIT_TOKEN': xReplitToken
            }
          }
        ).then(res => res.json()).then(data => data.items?.[0]);

        if (connectionSettings && connectionSettings.settings.api_key && connectionSettings.settings.from_email) {
          return {
            apiKey: connectionSettings.settings.api_key, 
            email: connectionSettings.settings.from_email
          };
        }
      } catch (error) {
        console.warn('Failed to fetch Replit connector credentials, falling back to environment variables');
      }
    }
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const email = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !email) {
    throw new Error('SendGrid credentials not found. Set SENDGRID_API_KEY and SENDGRID_FROM_EMAIL environment variables.');
  }

  return { apiKey, email };
}

async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

const emailStyles = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background-color: #2e7d32; color: white; padding: 30px 20px; text-align: center; border-radius: 5px 5px 0 0; }
  .header h1 { margin: 0; font-size: 28px; }
  .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
  .button { display: inline-block; padding: 14px 40px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
  .button:hover { background-color: #1b5e20; }
  .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 3px; }
  .success { background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 3px; }
  .info { background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 15px; margin: 20px 0; border-radius: 3px; }
  .highlight { background-color: #e8f5e9; padding: 20px; border-radius: 5px; margin: 20px 0; }
  .steps { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
  .step { margin: 15px 0; padding: 10px; border-left: 3px solid #2e7d32; }
  .meal-preview { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border: 1px solid #ddd; }
  .stats-box { background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: center; }
  .stat-item { display: inline-block; margin: 0 15px; }
  .stat-number { font-size: 24px; font-weight: bold; color: #2e7d32; display: block; }
  .stat-label { font-size: 12px; color: #666; }
  .price { font-size: 24px; font-weight: bold; color: #2e7d32; }
  ul { padding-left: 20px; }
  li { margin: 8px 0; }
  h2 { color: #2e7d32; margin-top: 0; }
  h3 { color: #333; margin-top: 0; }
  .support-box { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center; }
`;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const {client, fromEmail} = await getUncachableSendGridClient();
    
    const msg = {
      to: options.to,
      from: fromEmail,
      subject: options.subject,
      html: options.html,
    };

    await client.send(msg);
    console.log('Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(
  userEmail: string,
  userName: string,
  accountType: string = 'individual'
): Promise<boolean> {
  const accountTypeText = accountType === 'family' ? 'family of 4' : accountType === 'couple' ? 'couple' : 'individual';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Welcome to Full Gorilla!</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p style="font-size: 16px;">Welcome to the Full Gorilla Meal Planner family! We're thrilled to have you join our community of health-conscious eaters building better habits through personalized meal planning.</p>
          
          <div class="success">
            <strong>🎉 Your ${accountTypeText} account is active!</strong> You now have access to one full week of personalized meal planning per month.
          </div>
          
          <div class="steps">
            <h3>Get Started in 4 Easy Steps:</h3>
            <div class="step">
              <strong>1. Complete Your Profile</strong><br>
              Tell us about your health goals, dietary restrictions, cooking preferences, and favorite cuisines. This takes just 3 minutes and helps us create the perfect meal plan for you.
            </div>
            <div class="step">
              <strong>2. We Create Your Meal Plan</strong><br>
              Based on your preferences, our system intelligently selects recipes from 48 meals across 4 cookbooks that match your goals and taste. Your personalized Sunday-Saturday meal plan will be sent directly to your inbox!
            </div>
            <div class="step">
              <strong>3. Get Your Grocery List</strong><br>
              We automatically generate a shopping list with all ingredients you need - organized by category to make shopping easy.
            </div>
            <div class="step">
              <strong>4. Cook, Eat & Rate</strong><br>
              Try your meals and rate them! On Saturday, we'll ask for your feedback. Meals rated 3+ stars stay in your rotation, while 2 stars or below are removed.
            </div>
          </div>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/questionnaire" class="button">Complete Your Profile Now →</a>
          </center>
          
          <div class="highlight">
            <h3>What's Included in Your Free Account:</h3>
            <ul>
              <li><strong>One Full Week</strong> (Sunday-Saturday) of meal planning per month</li>
              <li><strong>48 Curated Recipes</strong> from 4 themed cookbooks to choose from</li>
              <li><strong>Intelligent Meal Selection</strong> - we pick the perfect meals for your goals</li>
              <li><strong>Auto-Generated Grocery Lists</strong> organized by category</li>
              <li><strong>Nutritional Information</strong> for every meal</li>
              <li><strong>Portion Adjustments</strong> customized for your ${accountTypeText} needs</li>
            </ul>
          </div>
          
          <div class="info">
            <h3>🚀 Want More?</h3>
            <p style="margin: 10px 0;"><strong>Upgrade to Pro</strong> for unlimited access to all 2,250 recipes across 25 themed cookbooks - from Mediterranean to Asian Fusion, Keto to Vegetarian!</p>
            <p style="margin: 0;">Just $20/month. Upgrade anytime from your dashboard.</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 16px;">Ready to transform your eating habits? Let's get started! 💪</p>
          
          <p style="margin-top: 20px;">Cheers,<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Need Help?</strong> Reply to this email anytime - we're here for you!</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
          <p style="margin-top: 10px;">You're receiving this because you signed up for Full Gorilla Meal Planner.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: '🎉 Welcome to Full Gorilla - Let\'s Build Healthy Habits Together!',
    html
  });
}

export async function sendPaymentFailureEmail(
  userEmail: string, 
  userName: string,
  gracePeriodEnd: Date,
  amount: number = 20,
  lastFourDigits?: string,
  failureReason?: string
): Promise<boolean> {
  const formattedDate = gracePeriodEnd.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const paymentMethodText = lastFourDigits ? `card ending in ${lastFourDigits}` : 'your payment method';
  const reasonText = failureReason ? `<p style="color: #666;"><em>Reason: ${failureReason}</em></p>` : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Full Gorilla Meal Planner</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>We attempted to process your monthly subscription payment of <strong>$${amount}</strong> using ${paymentMethodText}, but the payment didn't go through.</p>
          
          ${reasonText}
          
          <div class="warning">
            <strong>⏰ Your account is still active!</strong><br>
            You have until <strong>${formattedDate}</strong> (3 days) to update your payment method. Your meal plans and recipes remain accessible during this time.
          </div>
          
          <h3>What Happens Next:</h3>
          <div class="steps">
            <div class="step">
              <strong>Now - ${formattedDate}:</strong> Your Pro account remains fully active with access to all 2,250 recipes and unlimited meal planning.
            </div>
            <div class="step">
              <strong>Update Your Payment:</strong> Click the button below to add a new payment method or update your current one. It only takes 2 minutes!
            </div>
            <div class="step">
              <strong>After ${formattedDate}:</strong> If we can't process payment, your account will automatically switch to the Free plan (one full week of meal planning per month from 48 recipes across 4 cookbooks).
            </div>
          </div>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/dashboard?tab=billing" class="button">Update Payment Method →</a>
          </center>
          
          <div class="info">
            <h3>💳 Common Payment Issues:</h3>
            <ul>
              <li>Insufficient funds in account</li>
              <li>Card has expired or been replaced</li>
              <li>Billing address doesn't match card</li>
              <li>Card issuer declined the charge</li>
            </ul>
            <p style="margin: 10px 0;">Most issues are resolved by updating your payment information or trying a different card.</p>
          </div>
          
          <p style="margin-top: 30px;">We don't want you to lose access to your favorite recipes and meal plans! If you have questions or need help, just reply to this email.</p>
          
          <p style="margin-top: 20px;">Keep crushing those health goals! 💪<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Need Help?</strong> Email us at support@fullgorilla.com or reply to this message.</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: '⚠️ Payment Update Needed - Action Required by ' + formattedDate.split(',')[0],
    html
  });
}

export async function sendWeeklyMealPlanEmail(
  userEmail: string,
  userName: string,
  weekStartDate: Date,
  mealPreviews?: Array<{name: string; category: string; calories: number; prepTime: number}>,
  totalCalories?: number,
  totalPrepTime?: number
): Promise<boolean> {
  const formattedDate = weekStartDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  const formattedEndDate = weekEndDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  const mealPreviewsHTML = mealPreviews && mealPreviews.length > 0 ? `
    <h3>🍽️ Meal Previews This Week:</h3>
    ${mealPreviews.slice(0, 3).map(meal => `
      <div class="meal-preview">
        <strong>${meal.name}</strong> (${meal.category})<br>
        <span style="color: #666; font-size: 14px;">
          ${meal.calories} calories • ${meal.prepTime} min prep time
        </span>
      </div>
    `).join('')}
    ${mealPreviews.length > 3 ? `<p style="text-align: center; color: #666;">...and ${mealPreviews.length - 3} more delicious meals!</p>` : ''}
  ` : '';

  const statsHTML = totalCalories && totalPrepTime ? `
    <div class="stats-box">
      <div class="stat-item">
        <span class="stat-number">${totalCalories.toLocaleString()}</span>
        <span class="stat-label">Total Calories This Week</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${Math.round(totalPrepTime / 60)}</span>
        <span class="stat-label">Hours of Cooking</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${mealPreviews?.length || 21}</span>
        <span class="stat-label">Meals Planned</span>
      </div>
    </div>
  ` : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Your Weekly Meal Plan is Ready!</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p style="font-size: 16px;">Great news! Your personalized meal plan for <strong>${formattedDate} - ${formattedEndDate}</strong> has been created and is ready for you.</p>
          
          <div class="success">
            ✅ <strong>Your weekly meal plan includes:</strong> Breakfast, lunch, and dinner for 7 days, all tailored to your preferences and dietary needs.
          </div>
          
          ${statsHTML}
          
          <div class="highlight">
            <h3>This Week's Features:</h3>
            <ul>
              <li>🍽️ <strong>Intelligently Selected Meals</strong> - our system picked recipes matching your taste preferences and dietary restrictions</li>
              <li>🛒 <strong>Complete Grocery List</strong> organized by category for easy shopping</li>
              <li>📊 <strong>Nutritional Breakdown</strong> for each meal to track your goals</li>
              <li>⏱️ <strong>Prep Times Listed</strong> so you can plan your cooking schedule</li>
              <li>👨‍🍳 <strong>Step-by-Step Instructions</strong> for every recipe</li>
            </ul>
          </div>
          
          ${mealPreviewsHTML}
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/dashboard" class="button">View Full Meal Plan →</a>
          </center>
          
          <div class="info">
            <h3>💡 Pro Tips for Success:</h3>
            <ul>
              <li>Download your grocery list before shopping</li>
              <li>Prep ingredients on Sunday for easier weekday cooking</li>
              <li><strong>Rate your meals on Saturday</strong> - meals rated 3+ stars stay in rotation, 2 stars or below are removed</li>
              <li>Check prep times to plan your cooking schedule</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px;"><strong>Important:</strong> On Saturday, we'll send you a review request. Rate your meals honestly - this helps us learn your preferences and pick even better meals for you next week!</p>
          
          <p style="margin-top: 20px;">Let's make this week amazing! 💪<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Questions about a recipe?</strong> Reply to this email - we're here to help!</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: `🍽️ Your Meal Plan is Ready for ${formattedDate}!`,
    html
  });
}

export async function sendSubscriptionUpgradeEmail(
  userEmail: string,
  userName: string,
  amount: number = 20
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Welcome to Full Gorilla Pro!</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p style="font-size: 18px;"><strong>Congratulations! You've upgraded to Pro! 🎉</strong></p>
          
          <div class="success">
            <strong>Your Pro subscription is now active!</strong><br>
            You've unlocked unlimited access to all 2,250 recipes across 25 cookbooks.
          </div>
          
          <div class="highlight">
            <h3>What's New With Your Pro Account:</h3>
            <ul>
              <li>🌟 <strong>2,250 Premium Recipes</strong> - up from 48!</li>
              <li>📚 <strong>All 25 Themed Cookbooks</strong> (Mediterranean, Asian Fusion, Keto, Vegan, and more)</li>
              <li>♾️ <strong>Unlimited Weekly Meal Plans</strong> - no more one week per month limit</li>
              <li>📧 <strong>Weekly Meal Plans</strong> delivered every Sunday morning</li>
              <li>🎯 <strong>Intelligent Meal Selection</strong> from 2,250 recipes based on your profile</li>
              <li>📧 <strong>Priority Support</strong> - get help faster</li>
              <li>📱 <strong>Early Access</strong> to new features</li>
            </ul>
          </div>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/cookbooks" class="button">Explore All Cookbooks →</a>
          </center>
          
          <div class="info">
            <h3>📋 Your Subscription Details:</h3>
            <ul>
              <li><strong>Plan:</strong> Full Gorilla Pro</li>
              <li><strong>Billing:</strong> $${amount}/month</li>
              <li><strong>Next Billing Date:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</li>
              <li><strong>Cancel Anytime:</strong> No commitments, manage from your dashboard</li>
            </ul>
          </div>
          
          <h3>🚀 How It Works:</h3>
          <p>Every Sunday morning, we'll intelligently select and deliver your personalized meal plan from all 25 cookbooks. On Saturday, we'll ask you to rate your meals - this helps us learn what you love!</p>
          
          <p style="margin-top: 30px;">Thank you for supporting Full Gorilla! We're committed to helping you achieve your health goals with delicious, personalized meal planning.</p>
          
          <p style="margin-top: 20px;">Here's to your health journey! 💪<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Questions?</strong> Reply to this email or visit your dashboard settings.</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: '🎉 Welcome to Full Gorilla Pro - All 2,250 Recipes Unlocked!',
    html
  });
}

export async function sendSubscriptionDowngradeEmail(
  userEmail: string,
  userName: string,
  reason: string = 'payment failure after grace period'
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Full Gorilla Meal Planner</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>Your Full Gorilla account has been switched to the <strong>Free Plan</strong> due to ${reason}.</p>
          
          <div class="warning">
            <strong>Your account is still active!</strong> You now have access to the Free plan with one full week of meal planning per month.
          </div>
          
          <h3>What Changed:</h3>
          <div class="steps">
            <div class="step">
              <strong>Before (Pro):</strong> Unlimited weekly meal plans from 2,250 recipes across 25 cookbooks
            </div>
            <div class="step">
              <strong>Now (Free):</strong> One full week (Sunday-Saturday) of meal planning per month from 48 recipes across 4 cookbooks
            </div>
          </div>
          
          <div class="info">
            <h3>You Still Get:</h3>
            <ul>
              <li>✅ One full week of personalized meal planning each month</li>
              <li>✅ 48 delicious recipes from 4 popular cookbooks</li>
              <li>✅ Intelligent meal selection based on your profile</li>
              <li>✅ Auto-generated grocery lists</li>
              <li>✅ Nutritional information for every meal</li>
              <li>✅ Your saved preferences and dietary restrictions</li>
            </ul>
          </div>
          
          <h3>Want Your Pro Benefits Back?</h3>
          <p>Upgrade anytime to regain unlimited access to all 2,250 recipes and features. Just $20/month.</p>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/dashboard?tab=billing" class="button">Upgrade to Pro →</a>
          </center>
          
          <p style="margin-top: 30px;">We understand things happen! If you have questions about your account or need help upgrading, just reply to this email.</p>
          
          <p style="margin-top: 20px;">Keep moving forward! 💪<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Need Help?</strong> Email support@fullgorilla.com or reply to this message.</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: 'Your Full Gorilla Account - Now on Free Plan',
    html
  });
}

export async function sendSubscriptionRenewalReminderEmail(
  userEmail: string,
  userName: string,
  renewalDate: Date,
  amount: number = 20,
  lastFourDigits?: string
): Promise<boolean> {
  const formattedDate = renewalDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const paymentMethodText = lastFourDigits ? `card ending in ${lastFourDigits}` : 'your payment method on file';

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Full Gorilla Meal Planner</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>This is a friendly reminder that your Full Gorilla Pro subscription will automatically renew on <strong>${formattedDate}</strong>.</p>
          
          <div class="info">
            <h3>📋 Upcoming Charge Details:</h3>
            <ul>
              <li><strong>Amount:</strong> $${amount}</li>
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Payment Method:</strong> ${paymentMethodText}</li>
              <li><strong>Subscription:</strong> Full Gorilla Pro (Unlimited access)</li>
            </ul>
          </div>
          
          <h3>No Action Needed!</h3>
          <p>Your subscription will continue automatically and you'll keep enjoying:</p>
          
          <div class="highlight">
            <ul>
              <li>🌟 All 2,250 recipes across 25 cookbooks</li>
              <li>♾️ Unlimited meal planning</li>
              <li>🛒 Auto-generated grocery lists</li>
              <li>📊 Detailed nutritional tracking</li>
              <li>🔄 Recipe swaps and advanced filters</li>
              <li>📧 Priority customer support</li>
            </ul>
          </div>
          
          <h3>Need to Make Changes?</h3>
          <p>If you need to update your payment method or manage your subscription, you can do so anytime from your dashboard:</p>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/dashboard?tab=billing" class="button">Manage Subscription →</a>
          </center>
          
          <p style="margin-top: 30px;">Thank you for being a valued Full Gorilla Pro member! We're honored to be part of your healthy eating journey.</p>
          
          <p style="margin-top: 20px;">Keep crushing it! 💪<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Questions?</strong> Reply to this email - we're here to help!</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
          <p style="margin-top: 10px;">This is an automated reminder for your upcoming subscription renewal.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: `Reminder: Your Full Gorilla Pro Subscription Renews ${formattedDate.split(',')[0]}`,
    html
  });
}

export async function sendMealRatingReminderEmail(
  userEmail: string,
  userName: string,
  unratedMealsCount: number
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Help Us Learn What You Love!</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>We noticed you have <strong>${unratedMealsCount} meals</strong> from your recent meal plans that haven't been rated yet.</p>
          
          <div class="info">
            <strong>⭐ Why Rating Matters:</strong><br>
            Your ratings help us understand your taste preferences better so we can recommend meals you'll absolutely love! It only takes 5 seconds per meal.
          </div>
          
          <h3>How Your Ratings Help:</h3>
          <div class="steps">
            <div class="step">
              <strong>⭐⭐⭐⭐⭐ (5 stars):</strong> "Loved it!" - We'll prioritize similar recipes in your future meal plans
            </div>
            <div class="step">
              <strong>⭐⭐⭐⭐ (4 stars):</strong> "Really good" - We'll include more recipes like this
            </div>
            <div class="step">
              <strong>⭐⭐⭐ (3 stars):</strong> "It was okay" - We'll show these less often
            </div>
            <div class="step">
              <strong>⭐⭐ or ⭐ (1-2 stars):</strong> "Not for me" - We'll stop recommending similar meals
            </div>
          </div>
          
          <div class="highlight">
            <h3>🎯 Better Ratings = Better Meal Plans!</h3>
            <p>The more you rate, the smarter our recommendations become. Users who rate regularly get meal plans they love 85% more often!</p>
          </div>
          
          <center>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/dashboard" class="button">Rate My Meals →</a>
          </center>
          
          <p style="margin-top: 30px;">Take 2 minutes to rate your recent meals and help us create your perfect meal plans! 🌟</p>
          
          <p style="margin-top: 20px;">Thanks for helping us serve you better! 💪<br><strong>The Full Gorilla Team</strong></p>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: `⭐ Rate Your Recent Meals - Help Us Improve Your Plan!`,
    html
  });
}

export async function sendPasswordResetEmail(
  userEmail: string,
  userName: string,
  resetToken: string,
  expiresInHours: number = 24
): Promise<boolean> {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${emailStyles}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦍 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>We received a request to reset your Full Gorilla Meal Planner password.</p>
          
          <div class="warning">
            <strong>⏰ This link expires in ${expiresInHours} hours</strong><br>
            For security, password reset links are only valid for ${expiresInHours} hours.
          </div>
          
          <p>Click the button below to create a new password:</p>
          
          <center>
            <a href="${resetUrl}" class="button">Reset My Password →</a>
          </center>
          
          <div class="info">
            <h3>🔒 Security Tips:</h3>
            <ul>
              <li>Use a strong, unique password</li>
              <li>Combine uppercase, lowercase, numbers, and symbols</li>
              <li>Avoid using the same password across multiple sites</li>
              <li>Never share your password with anyone</li>
            </ul>
          </div>
          
          <div class="warning">
            <strong>⚠️ Didn't Request This?</strong><br>
            If you didn't request a password reset, please ignore this email. Your password will remain unchanged and this link will expire automatically.
          </div>
          
          <p style="margin-top: 30px;">For security reasons, we can't show your current password. But don't worry - creating a new one is quick and easy!</p>
          
          <p style="margin-top: 20px;">Stay secure! 🔐<br><strong>The Full Gorilla Team</strong></p>
          
          <div class="support-box">
            <p style="margin: 0;"><strong>Having Trouble?</strong> Reply to this email and we'll help you get back into your account.</p>
          </div>
        </div>
        <div class="footer">
          <p>Full Gorilla Meal Planner | Healthy eating made simple</p>
          <p style="margin-top: 10px;">This password reset link expires on ${new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toLocaleString('en-US')}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    subject: '🔒 Reset Your Full Gorilla Password',
    html
  });
}
