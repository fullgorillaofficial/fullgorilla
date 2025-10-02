export interface CookbookData {
  name: string;
  slug: string;
  theme: string;
  description: string;
  category: 'cuisine' | 'health-goal' | 'diet-specific' | 'lifestyle' | 'specialty';
  tags: string[];
  isPremium: boolean;
  featured: boolean;
  mealCount: number;
}

export const cookbooksData: CookbookData[] = [
  {
    name: 'Italian Whole Foods',
    slug: 'italian-whole-foods',
    theme: 'Italian cuisine with whole, unprocessed ingredients',
    description: 'Authentic Italian recipes using fresh, whole ingredients - from classic pasta dishes to hearty soups',
    category: 'cuisine',
    tags: ['italian', 'mediterranean', 'pasta', 'comfort-food'],
    isPremium: false,
    featured: true,
    mealCount: 90
  },
  {
    name: 'Asian Fusion',
    slug: 'asian-fusion',
    theme: 'Chinese, Japanese, Thai, Korean, and Indian flavors',
    description: 'A delicious journey through Asia with recipes from Chinese stir-fries to Japanese bowls and Thai curries',
    category: 'cuisine',
    tags: ['asian', 'chinese', 'japanese', 'thai', 'korean', 'indian'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Latin American',
    slug: 'latin-american',
    theme: 'Mexican, Peruvian, Brazilian, and Caribbean recipes',
    description: 'Vibrant flavors from Mexico, Peru, Brazil, and the Caribbean with bold spices and fresh ingredients',
    category: 'cuisine',
    tags: ['latin', 'mexican', 'caribbean', 'south-american'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Mediterranean & Middle Eastern',
    slug: 'mediterranean-middle-eastern',
    theme: 'Greek, Lebanese, Moroccan, and Turkish recipes',
    description: 'Heart-healthy Mediterranean and Middle Eastern dishes with olive oil, fresh herbs, and whole grains',
    category: 'cuisine',
    tags: ['mediterranean', 'middle-eastern', 'greek', 'lebanese'],
    isPremium: false,
    featured: true,
    mealCount: 90
  },
  {
    name: 'American Healthy Comfort',
    slug: 'american-healthy-comfort',
    theme: 'BBQ, Southern, and Modern American fusion',
    description: 'Comfort food favorites made healthy - from BBQ to Southern classics with a nutritious twist',
    category: 'cuisine',
    tags: ['american', 'comfort-food', 'bbq', 'southern'],
    isPremium: false,
    featured: true,
    mealCount: 90
  },
  {
    name: 'African Roots',
    slug: 'african-roots',
    theme: 'Ethiopian, West African, and North African cuisine',
    description: 'Rich, flavorful dishes from across Africa with unique spices and traditional cooking methods',
    category: 'cuisine',
    tags: ['african', 'ethiopian', 'moroccan'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Global Street Food',
    slug: 'global-street-food',
    theme: 'Healthy wraps, bowls, and handhelds from around the world',
    description: 'Street food classics made healthy - portable meals perfect for on-the-go eating',
    category: 'cuisine',
    tags: ['street-food', 'wraps', 'bowls', 'portable'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Healthy Gut',
    slug: 'healthy-gut',
    theme: 'Microbiome-focused recipes for digestive health',
    description: 'Gut-healing recipes with probiotics, prebiotics, and fiber-rich foods to support digestive wellness',
    category: 'health-goal',
    tags: ['gut-health', 'digestive', 'probiotics', 'fiber'],
    isPremium: false,
    featured: true,
    mealCount: 90
  },
  {
    name: 'Brain & Energy Boosting',
    slug: 'brain-energy-boosting',
    theme: 'Foods that enhance mental clarity and sustained energy',
    description: 'Nutrient-dense meals to fuel your mind and body with steady energy throughout the day',
    category: 'health-goal',
    tags: ['brain-health', 'energy', 'mental-clarity', 'focus'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Heart Healthy Meals',
    slug: 'heart-healthy-meals',
    theme: 'Cardiovascular health-focused nutrition',
    description: 'Heart-smart recipes low in saturated fat and rich in omega-3s, fiber, and antioxidants',
    category: 'health-goal',
    tags: ['heart-health', 'cardiovascular', 'low-sodium', 'omega-3'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Hormone Balance & Women\'s Health',
    slug: 'hormone-balance-womens-health',
    theme: 'Recipes supporting hormonal health and women\'s wellness',
    description: 'Nutrient-rich meals designed to support hormonal balance, PCOS, and women\'s health needs',
    category: 'health-goal',
    tags: ['hormones', 'womens-health', 'pcos', 'menopause'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Immune Boosting Recipes',
    slug: 'immune-boosting-recipes',
    theme: 'Strengthen your immune system naturally',
    description: 'Vitamin and mineral-rich recipes to support immune function and overall health',
    category: 'health-goal',
    tags: ['immune-system', 'vitamins', 'antioxidants', 'wellness'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Lean Muscle & Athletic Recovery',
    slug: 'lean-muscle-athletic-recovery',
    theme: 'High-protein meals for muscle building and recovery',
    description: 'Performance-focused nutrition with optimal protein and nutrients for athletes and active individuals',
    category: 'health-goal',
    tags: ['muscle-building', 'athletic', 'high-protein', 'recovery'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Weight Loss Made Easy',
    slug: 'weight-loss-made-easy',
    theme: 'Satisfying meals for healthy weight loss',
    description: 'Delicious, filling recipes that support sustainable weight loss without feeling deprived',
    category: 'health-goal',
    tags: ['weight-loss', 'low-calorie', 'high-fiber', 'satisfying'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Healthy Weight Gain',
    slug: 'healthy-weight-gain',
    theme: 'Nutrient-dense meals for lean bulk',
    description: 'Calorie-rich, wholesome recipes to support healthy weight gain and muscle development',
    category: 'health-goal',
    tags: ['weight-gain', 'lean-bulk', 'high-calorie', 'muscle'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Vegan Whole Foods',
    slug: 'vegan-whole-foods',
    theme: 'Plant-based meals with no animal products',
    description: 'Delicious vegan recipes using whole, unprocessed plant foods for complete nutrition',
    category: 'diet-specific',
    tags: ['vegan', 'plant-based', 'no-animal-products'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Vegetarian Balance',
    slug: 'vegetarian-balance',
    theme: 'No meat, includes dairy and eggs',
    description: 'Well-balanced vegetarian meals with dairy and eggs for complete protein and nutrition',
    category: 'diet-specific',
    tags: ['vegetarian', 'dairy', 'eggs', 'meatless'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Gluten-Free Everyday',
    slug: 'gluten-free-everyday',
    theme: 'Delicious meals without gluten',
    description: 'Naturally gluten-free and adapted recipes that never sacrifice taste or texture',
    category: 'diet-specific',
    tags: ['gluten-free', 'celiac', 'wheat-free'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Dairy-Free Solutions',
    slug: 'dairy-free-solutions',
    theme: 'No dairy, full flavor',
    description: 'Satisfying dairy-free meals with creative alternatives that taste amazing',
    category: 'diet-specific',
    tags: ['dairy-free', 'lactose-free', 'no-milk'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Keto Reset',
    slug: 'keto-reset',
    theme: 'Whole food keto, not junk-keto',
    description: 'Clean keto recipes using real, whole foods - high fat, low carb, nutrient-dense',
    category: 'diet-specific',
    tags: ['keto', 'low-carb', 'high-fat', 'ketogenic'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Paleo Lifestyle',
    slug: 'paleo-lifestyle',
    theme: 'Ancestral eating for modern health',
    description: 'Paleo-friendly recipes based on whole foods our ancestors ate - no grains, dairy, or processed foods',
    category: 'diet-specific',
    tags: ['paleo', 'grain-free', 'ancestral', 'whole-foods'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Blue Zones & Longevity Meals',
    slug: 'blue-zones-longevity',
    theme: 'Eat like the world\'s healthiest populations',
    description: 'Recipes inspired by Blue Zones where people live longest - plant-forward, whole foods, community-centered',
    category: 'lifestyle',
    tags: ['longevity', 'blue-zones', 'plant-forward', 'healthy-aging'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Quick & Budget-Friendly',
    slug: 'quick-budget-friendly',
    theme: '30-minute meals that won\'t break the bank',
    description: 'Fast, affordable recipes perfect for busy lifestyles without compromising nutrition or taste',
    category: 'lifestyle',
    tags: ['quick', 'budget-friendly', '30-minutes', 'affordable'],
    isPremium: false,
    featured: true,
    mealCount: 90
  },
  {
    name: 'Healthy Desserts',
    slug: 'healthy-desserts',
    theme: 'Guilt-free sweet treats',
    description: 'Satisfy your sweet tooth with nutritious desserts made from whole ingredients',
    category: 'specialty',
    tags: ['desserts', 'sweet', 'treats', 'healthy-indulgence'],
    isPremium: true,
    featured: false,
    mealCount: 90
  },
  {
    name: 'Power Snacks & Small Plates',
    slug: 'power-snacks-small-plates',
    theme: 'Energy-boosting snacks and light meals',
    description: 'Protein-rich snacks and small plates perfect for between meals or light dining',
    category: 'specialty',
    tags: ['snacks', 'small-plates', 'protein', 'portable'],
    isPremium: true,
    featured: false,
    mealCount: 90
  }
];

export function getCookbookBySlug(slug: string): CookbookData | undefined {
  return cookbooksData.find(cb => cb.slug === slug);
}

export function getFreeTierCookbooks(): CookbookData[] {
  return cookbooksData.filter(cb => !cb.isPremium);
}

export function getPremiumCookbooks(): CookbookData[] {
  return cookbooksData.filter(cb => cb.isPremium);
}

export function getCookbooksByCategory(category: string): CookbookData[] {
  return cookbooksData.filter(cb => cb.category === category);
}

export function getCookbooksByTag(tag: string): CookbookData[] {
  return cookbooksData.filter(cb => cb.tags.includes(tag));
}
