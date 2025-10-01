export type QuestionType = 'radio' | 'checkbox' | 'text' | 'number' | 'select' | 'multi-select' | 'height' | 'slider';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  section: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  appliesTo?: 'primary' | 'all' | 'family-member';
  skipIf?: (responses: Record<string, any>) => boolean;
  multiSelect?: boolean;
  maxSelections?: number;
}

export const questionnaireConfig: Question[] = [
  {
    id: 'q1',
    section: 'Account Setup',
    text: 'What type of account are you setting up?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'individual', label: 'Just me (Individual)' },
      { value: 'couple', label: 'Me and my partner (Couple)' },
      { value: 'family', label: 'Me and my family (Family)' }
    ]
  },
  {
    id: 'q2',
    section: 'Account Setup',
    text: 'How many people total?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    skipIf: (responses) => responses.q1 === 'individual',
    options: [
      { value: '2', label: '2 people' },
      { value: '3', label: '3 people' },
      { value: '4', label: '4 people' }
    ]
  },
  {
    id: 'q3',
    section: 'Account Setup',
    text: "Let's get everyone's name",
    type: 'text',
    appliesTo: 'primary',
    required: true,
    skipIf: (responses) => responses.q1 === 'individual',
    placeholder: 'Enter names for each family member'
  },
  {
    id: 'q4',
    section: 'Basic Profile',
    text: 'What is your exact age?',
    type: 'number',
    appliesTo: 'all',
    required: true,
    min: 1,
    max: 120,
    placeholder: 'Enter age in years'
  },
  {
    id: 'q5',
    section: 'Basic Profile',
    text: 'What is your biological sex?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]
  },
  {
    id: 'q6',
    section: 'Basic Profile',
    text: 'What is your height?',
    type: 'height',
    appliesTo: 'all',
    required: true
  },
  {
    id: 'q7',
    section: 'Basic Profile',
    text: 'What is your current weight?',
    type: 'number',
    appliesTo: 'all',
    required: true,
    min: 50,
    max: 500,
    placeholder: 'Weight in lbs'
  },
  {
    id: 'q8',
    section: 'Basic Profile',
    text: 'What is your target weight?',
    type: 'number',
    appliesTo: 'all',
    required: true,
    min: 50,
    max: 500,
    placeholder: 'Target weight in lbs'
  },
  {
    id: 'q9',
    section: 'Basic Profile',
    text: 'What is your current body fat %? (if known, optional)',
    type: 'number',
    appliesTo: 'all',
    required: false,
    min: 1,
    max: 70,
    placeholder: 'Body fat percentage'
  },
  {
    id: 'q10',
    section: 'Basic Profile',
    text: 'What region do you live in? (helps us pick seasonal, locally-available ingredients)',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'northeast', label: 'Northeast (NY, PA, NJ, etc.)' },
      { value: 'southeast', label: 'Southeast (FL, GA, NC, SC, etc.)' },
      { value: 'midwest', label: 'Midwest (IL, OH, MI, IN, etc.)' },
      { value: 'southwest', label: 'Southwest (TX, AZ, NM, etc.)' },
      { value: 'west-coast', label: 'West Coast (CA, OR, WA)' },
      { value: 'mountain-west', label: 'Mountain West (CO, UT, ID, MT, WY)' },
      { value: 'alaska-hawaii', label: 'Alaska/Hawaii' },
      { value: 'other', label: 'Other/International' }
    ]
  },
  {
    id: 'q11',
    section: 'Health Goals & Timeline',
    text: 'What are your primary health goals? (Select ALL that apply)',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'lose-weight', label: 'Lose weight' },
      { value: 'gain-weight', label: 'Gain weight' },
      { value: 'build-muscle', label: 'Build lean muscle' },
      { value: 'maintain-weight', label: 'Maintain current weight' },
      { value: 'gut-health', label: 'Improve gut health & digestion' },
      { value: 'mental-clarity', label: 'Boost energy & mental clarity' },
      { value: 'heart-health', label: 'Support heart health' },
      { value: 'longevity', label: 'Longevity & Blue Zone living' },
      { value: 'sleep', label: 'Better sleep quality' },
      { value: 'inflammation', label: 'Reduce inflammation' },
      { value: 'stress-relief', label: 'Stress relief & mood support' },
      { value: 'health-condition', label: 'Manage a health condition' },
      { value: 'wellness', label: 'Overall wellness & vitality' }
    ]
  },
  {
    id: 'q12',
    section: 'Health Goals & Timeline',
    text: 'What timeline are you aiming for?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: '1-3-months', label: '1-3 months' },
      { value: '3-6-months', label: '3-6 months' },
      { value: '6-12-months', label: '6-12 months' },
      { value: 'long-term', label: 'Long-term lifestyle change (1+ years)' }
    ]
  },
  {
    id: 'q13',
    section: 'Health Goals & Timeline',
    text: 'What is most important to you?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'speed', label: 'Speed of results' },
      { value: 'sustainability', label: 'Sustainability' },
      { value: 'flexibility', label: 'Flexibility' }
    ]
  },
  {
    id: 'q14',
    section: 'Health Goals & Timeline',
    text: 'What is your biggest struggle with past diets?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'too-restrictive', label: 'Too restrictive/boring' },
      { value: 'too-complicated', label: 'Too complicated' },
      { value: 'always-hungry', label: 'Always hungry' },
      { value: 'no-time', label: 'No time to cook' },
      { value: 'no-results', label: "Didn't see results" },
      { value: 'not-stick', label: "Couldn't stick with it" },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q15',
    section: 'Health Goals & Timeline',
    text: 'On a scale of 1-10, how motivated are you right now?',
    type: 'slider',
    appliesTo: 'all',
    required: true,
    min: 1,
    max: 10
  },
  {
    id: 'q16',
    section: 'Medical History',
    text: 'Are there any diagnosed medical conditions?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q17',
    section: 'Medical History',
    text: 'Select all that apply:',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    skipIf: (responses) => responses.q16 === 'no',
    options: [
      { value: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
      { value: 'high-bp', label: 'High blood pressure' },
      { value: 'high-cholesterol', label: 'High cholesterol' },
      { value: 'heart-disease', label: 'Heart disease' },
      { value: 'kidney-disease', label: 'Kidney disease' },
      { value: 'pcos', label: 'PCOS' },
      { value: 'thyroid', label: 'Thyroid condition (hypo/hyper)' },
      { value: 'ibs', label: 'IBS/Digestive issues' },
      { value: 'autoimmune', label: 'Autoimmune condition' },
      { value: 'joint-pain', label: 'Joint pain/Arthritis' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q18',
    section: 'Medical History',
    text: 'Is there a family history of health conditions?',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'heart-disease', label: 'Heart disease' },
      { value: 'obesity', label: 'Obesity' },
      { value: 'thyroid', label: 'Thyroid issues' },
      { value: 'pcos', label: 'PCOS' },
      { value: 'cancer', label: 'Cancer' },
      { value: 'none', label: 'None' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q19',
    section: 'Medical History',
    text: 'Are you currently taking medications that affect appetite, digestion, or metabolism?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'prefer-not-say', label: 'Prefer not to say' }
    ]
  },
  {
    id: 'q20',
    section: 'Medical History',
    text: 'Are there any hormonal concerns?',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'thyroid', label: 'Thyroid issues' },
      { value: 'pcos-endo', label: 'PCOS/Endometriosis' },
      { value: 'menopause', label: 'Menopause/Perimenopause' },
      { value: 'low-testosterone', label: 'Low testosterone' },
      { value: 'pregnant-breastfeeding', label: 'Pregnant or breastfeeding' },
      { value: 'trying-conceive', label: 'Trying to conceive' },
      { value: 'none', label: 'None' }
    ]
  },
  {
    id: 'q21',
    section: 'Medical History',
    text: 'Do you currently experience any of these? (Select all that apply)',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'low-energy', label: 'Low energy or frequent fatigue' },
      { value: 'brain-fog', label: 'Brain fog or focus issues' },
      { value: 'joint-pain', label: 'Joint pain or inflammation' },
      { value: 'bloating', label: 'Bloating, gas, or IBS symptoms' },
      { value: 'acid-reflux', label: 'Acid reflux/heartburn' },
      { value: 'constipation', label: 'Constipation or irregular bowel movements' },
      { value: 'poor-sleep', label: 'Poor sleep or insomnia' },
      { value: 'high-stress', label: 'High stress levels' },
      { value: 'none', label: 'None of these' }
    ]
  },
  {
    id: 'q22',
    section: 'Medical History',
    text: 'Are there any food allergies?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q23',
    section: 'Medical History',
    text: 'Select all that apply:',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    skipIf: (responses) => responses.q22 === 'no',
    options: [
      { value: 'dairy', label: 'Dairy/Lactose' },
      { value: 'eggs', label: 'Eggs' },
      { value: 'peanuts', label: 'Peanuts' },
      { value: 'tree-nuts', label: 'Tree nuts (almonds, cashews, etc.)' },
      { value: 'shellfish', label: 'Shellfish' },
      { value: 'fish', label: 'Fish' },
      { value: 'soy', label: 'Soy' },
      { value: 'wheat-gluten', label: 'Wheat/Gluten' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q24',
    section: 'Medical History',
    text: 'Are there any food intolerances? (separate from allergies)',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'lactose', label: 'Lactose' },
      { value: 'gluten', label: 'Gluten' },
      { value: 'fodmaps', label: 'FODMAPs' },
      { value: 'nightshades', label: 'Nightshades' },
      { value: 'histamine', label: 'Histamine' },
      { value: 'none', label: 'None' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q25',
    section: 'Dietary Preferences',
    text: 'Do you follow a specific diet?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'no-restrictions', label: 'No restrictions (eats everything)' },
      { value: 'vegetarian', label: 'Vegetarian (no meat, dairy/eggs okay)' },
      { value: 'vegan', label: 'Vegan (no animal products)' },
      { value: 'pescatarian', label: 'Pescatarian (fish okay, no other meat)' },
      { value: 'keto', label: 'Keto/Low-carb' },
      { value: 'paleo', label: 'Paleo' },
      { value: 'mediterranean', label: 'Mediterranean' },
      { value: 'high-protein', label: 'High-protein' },
      { value: 'low-sodium', label: 'Low-sodium' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q26',
    section: 'Dietary Preferences',
    text: 'Do you eat red meat?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q25 === 'vegan' || responses.q25 === 'vegetarian',
    options: [
      { value: 'regularly', label: 'Yes, regularly' },
      { value: 'occasionally', label: 'Yes, occasionally' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q27',
    section: 'Dietary Preferences',
    text: 'Do you eat poultry?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q25 === 'vegan' || responses.q25 === 'vegetarian',
    options: [
      { value: 'regularly', label: 'Yes, regularly' },
      { value: 'occasionally', label: 'Yes, occasionally' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q28',
    section: 'Dietary Preferences',
    text: 'Do you eat seafood?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q25 === 'vegan',
    options: [
      { value: 'all-types', label: 'Yes, all types' },
      { value: 'fish-only', label: 'Yes, fish only (no shellfish)' },
      { value: 'shellfish-only', label: 'Shellfish only' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q29',
    section: 'Dietary Preferences',
    text: 'Are there any religious or cultural dietary restrictions?',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    options: [
      { value: 'halal', label: 'Halal' },
      { value: 'kosher', label: 'Kosher' },
      { value: 'hindu-no-beef', label: 'Hindu (no beef)' },
      { value: 'no-pork', label: 'No pork' },
      { value: 'other', label: 'Other' },
      { value: 'none', label: 'None' }
    ]
  },
  {
    id: 'q30',
    section: 'Dietary Preferences',
    text: 'Select your TOP 5 favorite cuisines:',
    type: 'checkbox',
    appliesTo: 'all',
    required: true,
    multiSelect: true,
    maxSelections: 5,
    options: [
      { value: 'american', label: 'American/Comfort Food' },
      { value: 'italian', label: 'Italian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'chinese', label: 'Chinese' },
      { value: 'japanese', label: 'Japanese' },
      { value: 'thai', label: 'Thai' },
      { value: 'indian', label: 'Indian' },
      { value: 'mediterranean', label: 'Mediterranean/Greek' },
      { value: 'french', label: 'French' },
      { value: 'korean', label: 'Korean' },
      { value: 'vietnamese', label: 'Vietnamese' },
      { value: 'middle-eastern', label: 'Middle Eastern' },
      { value: 'southern', label: 'Southern/Soul Food' },
      { value: 'caribbean', label: 'Caribbean' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q31',
    section: 'Dietary Preferences',
    text: 'Which cuisines do you dislike?',
    type: 'checkbox',
    appliesTo: 'all',
    required: false,
    multiSelect: true,
    options: [
      { value: 'american', label: 'American/Comfort Food' },
      { value: 'italian', label: 'Italian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'chinese', label: 'Chinese' },
      { value: 'japanese', label: 'Japanese' },
      { value: 'thai', label: 'Thai' },
      { value: 'indian', label: 'Indian' },
      { value: 'mediterranean', label: 'Mediterranean/Greek' },
      { value: 'french', label: 'French' },
      { value: 'korean', label: 'Korean' },
      { value: 'vietnamese', label: 'Vietnamese' },
      { value: 'middle-eastern', label: 'Middle Eastern' },
      { value: 'southern', label: 'Southern/Soul Food' },
      { value: 'caribbean', label: 'Caribbean' },
      { value: 'none', label: 'None' }
    ]
  },
  {
    id: 'q32',
    section: 'Dietary Preferences',
    text: 'How do you feel about spicy food?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'love-spicy', label: 'Love it spicy!' },
      { value: 'mild-medium', label: 'Mild to medium spice' },
      { value: 'no-spice', label: 'Prefer no spice' }
    ]
  },
  {
    id: 'q33',
    section: 'Dietary Preferences',
    text: 'Are there any foods you absolutely will NOT eat? (even if not allergic)',
    type: 'text',
    appliesTo: 'all',
    required: false,
    placeholder: 'e.g., mushrooms, Brussels sprouts, liver'
  },
  {
    id: 'q34',
    section: 'Dietary Preferences',
    text: 'Are there foods you want included often? (favorites to prioritize)',
    type: 'text',
    appliesTo: 'all',
    required: false,
    placeholder: 'e.g., salmon, avocado, sweet potatoes'
  },
  {
    id: 'q35',
    section: 'Dietary Preferences',
    text: 'Do you want healthy versions of desserts/snacks included?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes, definitely!' },
      { value: 'occasionally', label: 'Occasionally' },
      { value: 'no', label: 'No, just main meals' }
    ]
  },
  {
    id: 'q36',
    section: 'Dietary Preferences',
    text: 'Do you drink coffee or tea daily?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'coffee', label: 'Yes, coffee' },
      { value: 'tea', label: 'Yes, tea' },
      { value: 'both', label: 'Both' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q37',
    section: 'Dietary Preferences',
    text: 'Do you drink alcohol? How often?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'never', label: 'Never/Rarely' },
      { value: '1-2-month', label: '1-2 times per month' },
      { value: '1-2-week', label: '1-2 times per week' },
      { value: '3-4-week', label: '3-4 times per week' },
      { value: 'daily', label: 'Daily' }
    ]
  },
  {
    id: 'q38',
    section: 'Dietary Preferences',
    text: 'Do you struggle more with:',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'salty', label: 'Salty cravings' },
      { value: 'sweet', label: 'Sweet cravings' },
      { value: 'both', label: 'Both equally' },
      { value: 'neither', label: 'Neither' }
    ]
  },
  {
    id: 'q39',
    section: 'Sleep & Hydration',
    text: 'How many hours of sleep per night?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'less-5', label: 'Less than 5 hours' },
      { value: '5-6', label: '5-6 hours' },
      { value: '7-8', label: '7-8 hours' },
      { value: '8-9', label: '8-9 hours' },
      { value: '9-plus', label: '9+ hours' }
    ]
  },
  {
    id: 'q40',
    section: 'Sleep & Hydration',
    text: 'How much water do you drink daily?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'less-4', label: 'Less than 4 cups' },
      { value: '4-6', label: '4-6 cups' },
      { value: '6-8', label: '6-8 cups (recommended)' },
      { value: '8-10', label: '8-10 cups' },
      { value: '10-plus', label: '10+ cups' }
    ]
  },
  {
    id: 'q41',
    section: 'Fitness & Activity',
    text: 'How physically active are you on a typical day?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'sedentary', label: 'Sedentary (desk job, little exercise)' },
      { value: 'lightly-active', label: 'Lightly active (light exercise 1-3 days/week)' },
      { value: 'moderately-active', label: 'Moderately active (exercise 3-5 days/week)' },
      { value: 'very-active', label: 'Very active (intense exercise 6-7 days/week)' },
      { value: 'extremely-active', label: 'Extremely active (athlete/physical job + daily training)' }
    ]
  },
  {
    id: 'q42',
    section: 'Fitness & Activity',
    text: 'Do you currently follow a workout routine?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q43',
    section: 'Fitness & Activity',
    text: 'How many days per week do you work out?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q42 === 'no',
    options: [
      { value: '1', label: '1 day' },
      { value: '2', label: '2 days' },
      { value: '3', label: '3 days' },
      { value: '4', label: '4 days' },
      { value: '5', label: '5 days' },
      { value: '6', label: '6 days' },
      { value: '7', label: '7 days' }
    ]
  },
  {
    id: 'q44',
    section: 'Fitness & Activity',
    text: 'What type of exercise do you mostly do?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q42 === 'no',
    options: [
      { value: 'strength', label: 'Strength training' },
      { value: 'cardio', label: 'Cardio (running, cycling, etc.)' },
      { value: 'sports', label: 'Sports' },
      { value: 'mixed', label: 'Mixed (combination)' },
      { value: 'yoga', label: 'Yoga/Pilates' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q45',
    section: 'Fitness & Activity',
    text: "How long are typical workout sessions?",
    type: 'radio',
    appliesTo: 'all',
    required: true,
    skipIf: (responses) => responses.q42 === 'no',
    options: [
      { value: 'under-30', label: 'Under 30 minutes' },
      { value: '30-45', label: '30-45 minutes' },
      { value: '45-60', label: '45-60 minutes' },
      { value: '60-90', label: '60-90 minutes' },
      { value: '90-plus', label: '90+ minutes' }
    ]
  },
  {
    id: 'q46',
    section: 'Fitness & Activity',
    text: 'Do you want meal plans synced with training schedule?',
    type: 'radio',
    appliesTo: 'all',
    required: true,
    options: [
      { value: 'yes', label: 'Yes (higher calories on workout days)' },
      { value: 'no', label: 'No (consistent daily intake)' }
    ]
  },
  {
    id: 'q47',
    section: 'Cooking & Meal Logistics',
    text: 'What is your cooking skill level?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'beginner', label: 'Beginner (can follow simple recipes)' },
      { value: 'intermediate', label: 'Intermediate (comfortable with most techniques)' },
      { value: 'advanced', label: 'Advanced (confident with complex recipes)' }
    ]
  },
  {
    id: 'q48',
    section: 'Cooking & Meal Logistics',
    text: 'How much time can you spend cooking breakfast?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: '5-or-less', label: '5 minutes or less' },
      { value: '5-15', label: '5-15 minutes' },
      { value: '15-30', label: '15-30 minutes' },
      { value: '30-plus', label: '30+ minutes' }
    ]
  },
  {
    id: 'q49',
    section: 'Cooking & Meal Logistics',
    text: 'How much time can you spend cooking lunch?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: '5-or-less', label: '5 minutes or less' },
      { value: '5-15', label: '5-15 minutes' },
      { value: '15-30', label: '15-30 minutes' },
      { value: '30-plus', label: '30+ minutes' }
    ]
  },
  {
    id: 'q50',
    section: 'Cooking & Meal Logistics',
    text: 'How much time can you spend cooking dinner?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: '15-or-less', label: '15 minutes or less' },
      { value: '15-30', label: '15-30 minutes' },
      { value: '30-45', label: '30-45 minutes' },
      { value: '45-60', label: '45-60 minutes' },
      { value: '60-plus', label: '60+ minutes (I love cooking!)' }
    ]
  },
  {
    id: 'q51',
    section: 'Cooking & Meal Logistics',
    text: 'What kitchen equipment do you have? (Select all that apply)',
    type: 'checkbox',
    appliesTo: 'primary',
    required: true,
    multiSelect: true,
    options: [
      { value: 'stove-oven', label: 'Stove/Oven' },
      { value: 'microwave', label: 'Microwave' },
      { value: 'slow-cooker', label: 'Slow cooker/Crockpot' },
      { value: 'instant-pot', label: 'Instant Pot/Pressure cooker' },
      { value: 'air-fryer', label: 'Air fryer' },
      { value: 'grill', label: 'Grill' },
      { value: 'blender', label: 'Blender' },
      { value: 'food-processor', label: 'Food processor' }
    ]
  },
  {
    id: 'q52',
    section: 'Cooking & Meal Logistics',
    text: 'Do you prefer batch cooking/meal prep or cooking fresh daily?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'meal-prep', label: 'Love meal prep!' },
      { value: 'mix', label: 'Mix of both' },
      { value: 'fresh', label: 'Prefer cooking fresh' }
    ]
  },
  {
    id: 'q53',
    section: 'Cooking & Meal Logistics',
    text: 'How many meals per day does your household need?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: '3-meals', label: '3 meals (breakfast, lunch, dinner)' },
      { value: '4-meals', label: '4 meals (breakfast, lunch, dinner, snack)' },
      { value: '6-meals', label: '6 small meals (athlete/bodybuilder grazing throughout day)' },
      { value: 'dinner-only', label: 'Just dinner (others handled separately)' }
    ]
  },
  {
    id: 'q54',
    section: 'Cooking & Meal Logistics',
    text: 'Do you prefer:',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'larger-meals', label: 'Larger meals, less often' },
      { value: 'smaller-meals', label: 'Smaller meals/snacks more often' }
    ]
  },
  {
    id: 'q55',
    section: 'Cooking & Meal Logistics',
    text: 'Do you pack lunches or eat out during the week?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'pack', label: 'Pack lunches (need lunch recipes)' },
      { value: 'eat-out', label: 'Eat out for lunch (only need breakfast/dinner)' },
      { value: 'mix', label: 'Mix of both' }
    ]
  },
  {
    id: 'q56',
    section: 'Cooking & Meal Logistics',
    text: 'How often do you eat out or order takeout?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'rarely', label: 'Rarely (1-2 times per month)' },
      { value: '1-2-week', label: '1-2 times per week' },
      { value: '3-4-week', label: '3-4 times per week' },
      { value: '5-plus-week', label: '5+ times per week' }
    ]
  },
  {
    id: 'q57',
    section: 'Cooking & Meal Logistics',
    text: 'Where do you prefer to shop? (Select all that apply)',
    type: 'checkbox',
    appliesTo: 'primary',
    required: true,
    multiSelect: true,
    options: [
      { value: 'large-grocery', label: 'Large grocery store (wide selection, all brands)' },
      { value: 'natural-organic', label: 'Natural/Organic stores (Whole Foods, Sprouts, Trader Joe\'s)' },
      { value: 'farmers-markets', label: 'Local farmers markets (seasonal, fresh produce)' },
      { value: 'local-farms', label: 'Local farms (meat, eggs, honey)' },
      { value: 'wholesale', label: 'Wholesale clubs (Costco, Sam\'s Club)' },
      { value: 'online', label: 'Online grocery delivery' }
    ]
  },
  {
    id: 'q58',
    section: 'Grocery & Budget',
    text: "What's your weekly grocery budget for meals?",
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'under-75', label: 'Under $75' },
      { value: '75-150', label: '$75-$150' },
      { value: '150-250', label: '$150-$250' },
      { value: '250-350', label: '$250-$350' },
      { value: '350-plus', label: '$350+' }
    ]
  },
  {
    id: 'q59',
    section: 'Grocery & Budget',
    text: 'Are you willing to buy specialty ingredients?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'yes', label: 'Yes, open to new ingredients' },
      { value: 'sometimes', label: 'Sometimes, if not too expensive' },
      { value: 'no', label: 'No, prefer common ingredients only' }
    ]
  },
  {
    id: 'q60',
    section: 'Lifestyle Considerations',
    text: 'Do you travel often or need portable meals?',
    type: 'radio',
    appliesTo: 'primary',
    required: true,
    options: [
      { value: 'yes', label: 'Yes, travel frequently (need portable options)' },
      { value: 'occasionally', label: 'Occasionally' },
      { value: 'no', label: 'No, mostly eating at home' }
    ]
  }
];
