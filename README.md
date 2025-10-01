# Full Gorilla Meal Planner

A weekly meal planning and grocery list web app designed to help individuals, couples, and families build healthier eating habits. The app generates meal plans from a curated set of **2,250 meals across 25 themed cookbooks**, tailored to user preferences and goals.

---

## 🌟 User Story
Dana (49, male, weight loss goal) signs up on the website, chooses a plan (Free or Paid), and fills out a personalized questionnaire. Based on his answers, the app generates a weekly meal plan with portion sizes, grocery lists, and nutrition tracking. Dana can review each week, provide feedback, and adjust future plans. Families or couples can join under one account, with portion sizes automatically adjusted for each person.

---

## 🚀 Features
### Authentication
- User signup/login with account info (name, email, age, gender, birthdate, etc.)
- Free plan vs. Paid plan access
- Account types: Individual, Couple, Family (up to 4 people at launch)

### Questionnaire
- Adaptive questionnaire (skips irrelevant questions)
- 50–60 questions per user
- Stores health goals, restrictions, and preferences

### Meal Planner
- Generates weekly meal plans (based on 2,250 recipes in 25 cookbooks)
- Portion sizes adjust automatically per family member
- Tracks nutrition (calories, protein, fats, sugars, etc.)
- Options to repeat, randomize, or choose a theme week (e.g., Keto, Italian)

### Grocery List
- Auto-generated from weekly meal plan
- Categorized by sections (Produce, Meat, Pantry, etc.)

### Cookbooks
- 25 themed cookbooks, each with 90 meals
- Free users: access to 4 cookbooks × 12 meals each (48 meals total)
- Paid users: unlimited access
- Users can preview cookbook tiles and table of contents

### Feedback System
- Rate weekly plans (1–5 stars)
- 1–3 stars: meal is removed from personal cycle
- 4–5 stars: meal stays in personal rotation
- Data collected for analytics and improvement

### Email Automation
- Weekly reminder emails with simple branded header
- Failed payment reminders (3-day retry)
- Welcome email on signup

---

## 📊 Plans
- **Free Plan**:  
  - 7 days of meals per month  
  - Limited cookbooks (48 meals)  
- **Paid Plan**:  
  - Unlimited access to all cookbooks and features  

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + TypeScript  
- **Styling:** CSS Modules with theme file for accessibility (colorblind-friendly palette)  
- **Backend:** Next.js API routes  
- **Database (MVP):** JSON files for meals, cookbooks, and questionnaire  
- **Payments:** Stripe integration  
- **Email:** Basic templates + automation (via external service)  

---

## 📅 Roadmap
### MVP
- Free & Paid login flow
- Adaptive questionnaire
- Weekly meal plan generator
- Grocery list generator
- Basic cookbook browsing
- Email templates (Welcome, Weekly, Failed Payment)

### Phase 2
- Admin dashboard
- Analytics from feedback
- Expanded family plan
- More themes & recipes
- Pro Plus plan (custom cookbook, advanced input)

---

## 📝 Changelog
- **v0.1.0 (MVP)** — Initial release with login, questionnaire, meal planner, cookbooks, and grocery list.
- **Future:** Iterative improvements with feedback-driven updates.
