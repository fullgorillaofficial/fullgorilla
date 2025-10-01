interface Meal {
  id: number;
  name: string;
  category: string;
  cookbookId: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  ingredients: string[];
  dietary: string[];
}

interface UserPreferences {
  healthGoal?: string;
  dietaryRestrictions?: string[];
  cookingTime?: string;
  cuisinePreferences?: string[];
  spiceLevel?: string;
  calorieTarget?: number;
}

export function generateWeeklyMealPlan(
  meals: Meal[], 
  preferences: UserPreferences,
  accountType: 'free' | 'paid' = 'free'
): any {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealPlan = [];

  for (const day of daysOfWeek) {
    const breakfast = meals.find(m => m.category === 'breakfast') || meals[0];
    const lunch = meals.find(m => m.category === 'lunch') || meals[1];
    const dinner = meals.find(m => m.category === 'dinner') || meals[2];

    mealPlan.push({
      day,
      breakfast: { id: breakfast.id, name: breakfast.name, calories: breakfast.calories },
      lunch: { id: lunch.id, name: lunch.name, calories: lunch.calories },
      dinner: { id: dinner.id, name: dinner.name, calories: dinner.calories }
    });
  }

  return {
    weekOf: new Date().toISOString().split('T')[0],
    meals: accountType === 'free' ? mealPlan.slice(0, 7) : mealPlan
  };
}

export function filterMealsByDietary(meals: Meal[], restrictions: string[]): Meal[] {
  if (!restrictions || restrictions.length === 0 || restrictions.includes('None')) {
    return meals;
  }

  return meals.filter(meal => {
    return restrictions.every(restriction => 
      meal.dietary.includes(restriction.toLowerCase())
    );
  });
}

export function calculateNutrition(meals: Meal[]): {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
} {
  return meals.reduce((acc, meal) => ({
    totalCalories: acc.totalCalories + meal.calories,
    totalProtein: acc.totalProtein + meal.protein,
    totalCarbs: acc.totalCarbs + meal.carbs,
    totalFats: acc.totalFats + meal.fats
  }), { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 });
}

export function generateGroceryList(weeklyMeals: Meal[]): { [category: string]: string[] } {
  const groceryList: { [category: string]: Set<string> } = {
    'Produce': new Set(),
    'Meat & Seafood': new Set(),
    'Dairy': new Set(),
    'Pantry': new Set()
  };

  const produceItems = ['avocado', 'lettuce', 'broccoli', 'carrots', 'lemon', 'tomato', 'onion'];
  const meatItems = ['chicken', 'salmon', 'beef', 'turkey', 'pork'];
  const dairyItems = ['egg', 'milk', 'cheese', 'butter', 'yogurt', 'parmesan'];

  weeklyMeals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      const lowerIngredient = ingredient.toLowerCase();
      
      if (produceItems.some(item => lowerIngredient.includes(item))) {
        groceryList['Produce'].add(ingredient);
      } else if (meatItems.some(item => lowerIngredient.includes(item))) {
        groceryList['Meat & Seafood'].add(ingredient);
      } else if (dairyItems.some(item => lowerIngredient.includes(item))) {
        groceryList['Dairy'].add(ingredient);
      } else {
        groceryList['Pantry'].add(ingredient);
      }
    });
  });

  return Object.fromEntries(
    Object.entries(groceryList).map(([category, items]) => [category, Array.from(items)])
  );
}
