import { cookbooksData, CookbookData } from '../data/cookbooksData';

interface QuestionnaireResponses {
  q11?: string[];
  q25?: string;
  q30?: string[];
  q17?: string[];
  q20?: string[];
  q23?: string[];
  q24?: string[];
  q53?: string;
}

export function assignCookbooksBasedOnPreferences(
  primaryResponses: QuestionnaireResponses,
  familyMembers: Array<{responses: QuestionnaireResponses}>
): string[] {
  const scores: Map<string, number> = new Map();
  
  cookbooksData.forEach(cookbook => {
    scores.set(cookbook.slug, 0);
  });

  const allResponses = [primaryResponses, ...familyMembers.map(m => m.responses)];

  allResponses.forEach(responses => {
    const healthGoals = responses.q11 || [];
    const dietType = responses.q25;
    const favoriteCuisines = responses.q30 || [];
    const medicalConditions = responses.q17 || [];
    const hormonalConcerns = responses.q20 || [];
    const allergies = responses.q23 || [];
    const intolerances = responses.q24 || [];

    cookbooksData.forEach(cookbook => {
      let score = scores.get(cookbook.slug) || 0;

      if (dietType === 'vegan' && cookbook.slug === 'vegan-whole-foods') {
        score += 50;
      }
      
      if (dietType === 'vegetarian' && cookbook.slug === 'vegetarian-balance') {
        score += 50;
      }

      if (dietType === 'keto' && cookbook.slug === 'keto-reset') {
        score += 50;
      }

      if (dietType === 'paleo' && cookbook.slug === 'paleo-lifestyle') {
        score += 50;
      }

      if (dietType === 'pescatarian' && cookbook.slug === 'mediterranean-middle-eastern') {
        score += 30;
      }

      if ((allergies.includes('wheat-gluten') || intolerances.includes('gluten')) 
          && cookbook.slug === 'gluten-free-everyday') {
        score += 40;
      }

      if ((allergies.includes('dairy') || intolerances.includes('lactose')) 
          && cookbook.slug === 'dairy-free-solutions') {
        score += 40;
      }

      if (healthGoals.includes('gut-health') && cookbook.slug === 'healthy-gut') {
        score += 35;
      }

      if (healthGoals.includes('mental-clarity') && cookbook.slug === 'brain-energy-boosting') {
        score += 35;
      }

      if (healthGoals.includes('heart-health') && cookbook.slug === 'heart-healthy-meals') {
        score += 35;
      }

      if (healthGoals.includes('build-muscle') && cookbook.slug === 'lean-muscle-athletic-recovery') {
        score += 35;
      }

      if (healthGoals.includes('lose-weight') && cookbook.slug === 'weight-loss-made-easy') {
        score += 35;
      }

      if (healthGoals.includes('gain-weight') && cookbook.slug === 'healthy-weight-gain') {
        score += 35;
      }

      if ((hormonalConcerns.includes('pcos-endo') || hormonalConcerns.includes('menopause')) 
          && cookbook.slug === 'hormone-balance-womens-health') {
        score += 30;
      }

      if (healthGoals.includes('longevity') && cookbook.slug === 'blue-zones-longevity') {
        score += 30;
      }

      favoriteCuisines.forEach(cuisine => {
        cookbook.tags.forEach(tag => {
          if (tag.toLowerCase().includes(cuisine.toLowerCase()) || 
              cuisine.toLowerCase().includes(tag.toLowerCase())) {
            score += 20;
          }
        });
      });

      scores.set(cookbook.slug, score);
    });
  });

  const cookingTime = primaryResponses.q53;
  if (cookingTime === '3-meals' || cookingTime === 'dinner-only') {
    const quickScore = scores.get('quick-budget-friendly') || 0;
    scores.set('quick-budget-friendly', quickScore + 25);
  }

  if (cookingTime === '6-meals') {
    const snackScore = scores.get('power-snacks-small-plates') || 0;
    scores.set('power-snacks-small-plates', snackScore + 20);
  }

  const freeTierSlugs = cookbooksData
    .filter(cb => !cb.isPremium)
    .map(cb => cb.slug);

  freeTierSlugs.forEach(slug => {
    const currentScore = scores.get(slug) || 0;
    scores.set(slug, currentScore + 10);
  });

  const sortedCookbooks = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1]);

  const selected: string[] = [];
  
  for (const [slug, score] of sortedCookbooks) {
    if (selected.length >= 4) break;
    selected.push(slug);
  }

  while (selected.length < 4) {
    const remaining = cookbooksData
      .filter(cb => !selected.includes(cb.slug))
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    
    if (remaining.length > 0) {
      selected.push(remaining[0].slug);
    }
  }

  return selected;
}

export function getCookbookDetails(slugs: string[]): CookbookData[] {
  return slugs
    .map(slug => cookbooksData.find(cb => cb.slug === slug))
    .filter((cb): cb is CookbookData => cb !== undefined);
}
