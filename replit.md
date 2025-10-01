# Full Gorilla Meal Planner

## Overview
Full Gorilla Meal Planner is a web application designed to foster healthier eating habits through personalized weekly meal plans and automated grocery lists. It offers 2,250 recipes across 25 themed cookbooks, available through free and paid subscription tiers. Users complete a questionnaire to define health goals, dietary restrictions, and preferences, which the system uses to generate portion-adjusted meal plans and grocery lists. A feedback system allows users to rate meals, influencing future recommendations. The project aims to provide comprehensive meal planning for individuals, couples, and families, supporting a healthier lifestyle.

## User Preferences
**Experience Level**: Complete beginner - no coding, website, or app experience
**Communication Style**: Simple, everyday language with step-by-step instructions
**Support Needed**: Full developer/architect/engineer support
**Question Limit**: Maximum 2 questions at a time for clarification and brainstorming
**Instruction Style**: Detailed, easy-to-follow steps for non-technical users

## System Architecture

### Frontend
The frontend is built with **Next.js 14.1.0**, **TypeScript**, and **React 18.2.0**, utilizing a page-based routing architecture for core functionalities like the landing page, authentication, dashboard, cookbooks, and a comprehensive questionnaire. It employs modular React components for reusability (e.g., `Layout`, `DashboardCalendar`, `MealCard`, `CookbookTile`, `QuestionnaireForm`). State management is handled using React hooks and session management via NextAuth. Styling is implemented with inline styles and CSS modules, prioritizing accessibility with a color-blind friendly palette.

### Backend
The backend utilizes **Next.js API routes** for a RESTful API structure, handling authentication, user preferences, meal plan retrieval, cookbook data, and subscription management. **NextAuth.js** provides session-based authentication with JWT tokens, securing protected routes. Core business logic for meal plan generation and subscription tier management is encapsulated in utility modules.

### Data Storage
Currently, the application uses **file-based JSON storage** for static data like cookbooks and recipes. The system is designed for future migration to a robust database, with an intended schema for user profiles, preferences, meal plans, feedback, and subscription data.

### Subscription & Access Control
The platform offers Free and Pro subscription tiers. The Free Plan provides one weekly meal plan per month from 4 cookbooks, while the Pro Plan offers unlimited weekly plans from all 25 cookbooks. A future Pro Plus plan will introduce manual meal selection and custom recipes. Account types (Individual, Couple, Family) influence portion sizing and meal frequency. Access to features is gated based on the subscription tier, with upgrade prompts for free users.

### Meal Generation Algorithm
The `mealPlanner.ts` utility generates weekly meal plans (Sunday-Saturday) by filtering recipes based on user questionnaire data, matching preferences, balancing nutritional targets, and avoiding repetition. The system autonomously selects meals, and users provide feedback via a 5-star rating system, which influences future recommendations. Meals rated 2 stars or below are permanently removed from the user's rotation.

### Comprehensive Questionnaire System
A **60-question smart branching questionnaire** collects detailed wellness, fitness, and lifestyle data for each household member. This data powers the personalized meal planning algorithm. The questionnaire is structured into sections covering account setup, basic profile, health goals, medical history, dietary preferences, sleep/hydration, fitness, cooking logistics, grocery/budget, and lifestyle. It features smart branching logic to skip irrelevant questions, multi-family member support, various input types (radio, checkbox, text, number, height, slider), real-time validation, and progress tracking. An API endpoint (`/api/questionnaire`) handles data persistence, utilizing a Prisma transaction to save records for household logistics, family members, and profiles.

### Email System
The application integrates **SendGrid** via `@sendgrid/mail` for a comprehensive email system. It supports various HTML-formatted, branded, and personalized email templates for customer onboarding (Welcome), meal planning (Weekly Meal Plan, Meal Rating Reminder), subscription management (Payment Failure, Upgrade/Downgrade Confirmation, Renewal Reminder), and account security (Password Reset). Emails feature dynamic personalization, rich HTML formatting, clear calls-to-action, and responsive design.

## External Dependencies

### Authentication & Session Management
- **NextAuth.js v4.24.7**: Authentication framework, currently configured with credentials provider.

### Payment Processing
- **Stripe v12.18.0**: Payment processing for subscriptions (placeholder endpoints exist).

### HTTP Client
- **Axios v1.6.7**: For API requests.

### Development Tools
- **TypeScript 5.3.3**: For type safety.
- **ESLint 8.56.0**: For code quality.

### Utility Libraries
- **clsx v2.0.0**: Conditional `className` composition.
- **uuid v9.0.1**: Unique identifier generation.

### Infrastructure Notes
- Development server on port 5000.
- No database currently configured; static JSON data used for development.
- Email service (SendGrid) is integrated.