export type Plan = 'free' | 'pro';

export interface SubscriptionFeatures {
  weeksPerMonth: number;
  cookbookAccess: 'limited' | 'unlimited';
  totalMealsAvailable: number;
  canAccessPremiumCookbooks: boolean;
  cookbooksUnlocked: number;
}

export function getSubscriptionFeatures(plan: Plan): SubscriptionFeatures {
  if (plan === 'pro') {
    return {
      weeksPerMonth: Infinity,
      cookbookAccess: 'unlimited',
      totalMealsAvailable: 2250,
      canAccessPremiumCookbooks: true,
      cookbooksUnlocked: 25
    };
  }

  return {
    weeksPerMonth: 1,
    cookbookAccess: 'limited',
    totalMealsAvailable: 48,
    canAccessPremiumCookbooks: false,
    cookbooksUnlocked: 4
  };
}

export function canAccessCookbook(userPlan: Plan, cookbookIsPremium: boolean): boolean {
  if (userPlan === 'pro') {
    return true;
  }

  return !cookbookIsPremium;
}

export function getRemainingWeeks(userPlan: Plan, weeksUsedThisMonth: number): number {
  const features = getSubscriptionFeatures(userPlan);
  
  if (features.weeksPerMonth === Infinity) {
    return Infinity;
  }

  return Math.max(0, features.weeksPerMonth - weeksUsedThisMonth);
}

export function shouldShowUpgradePrompt(userPlan: Plan): boolean {
  return userPlan === 'free';
}

export function getUpgradeMessage(userPlan: Plan): string {
  if (userPlan === 'pro') {
    return '';
  }

  return 'Upgrade to Pro for unlimited weekly meal plans and access to all 2,250 recipes across 25 cookbooks!';
}
