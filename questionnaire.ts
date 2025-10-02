import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { assignCookbooksBasedOnPreferences, getCookbookDetails } from '../../utils/cookbookAssignment';
import { cookbooksData } from '../../data/cookbooksData';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { primaryResponses, familyMembers } = req.body;

    if (!primaryResponses) {
      return res.status(400).json({ error: 'Missing questionnaire responses' });
    }

    const accountType = primaryResponses.q1 || 'individual';
    const totalPeople = parseInt(primaryResponses.q2 || '1');
    const region = primaryResponses.q10;

    await prisma.$transaction(async (tx) => {
      const questionnaireResponse = await tx.questionnaireResponse.create({
        data: {
          userId: user.id,
          accountType,
          totalPeople,
          region,
          cookingSkillLevel: primaryResponses.q47,
          breakfastTime: primaryResponses.q48,
          lunchTime: primaryResponses.q49,
          dinnerTime: primaryResponses.q50,
          kitchenEquipment: Array.isArray(primaryResponses.q51) ? primaryResponses.q51 : [],
          mealPrepPreference: primaryResponses.q52,
          mealsPerDay: primaryResponses.q53,
          mealSizePreference: primaryResponses.q54,
          lunchPacking: primaryResponses.q55,
          eatingOutFrequency: primaryResponses.q56,
          shoppingPreferences: Array.isArray(primaryResponses.q57) ? primaryResponses.q57 : [],
          weeklyBudget: primaryResponses.q58,
          specialtyIngredients: primaryResponses.q59,
          travelFrequency: primaryResponses.q60,
          responses: primaryResponses
        }
      });

      if (familyMembers && Array.isArray(familyMembers) && familyMembers.length > 0) {
        for (const member of familyMembers) {
          const responses = member.responses || {};
          
          const familyMember = await tx.familyMember.create({
            data: {
              userId: user.id,
              name: member.name,
              age: parseInt(responses.q4) || 0,
              sex: responses.q5 || 'male',
              height: responses.q6 || { feet: 5, inches: 0 },
              currentWeight: parseInt(responses.q7) || 0,
              targetWeight: parseInt(responses.q8) || 0,
              bodyFat: responses.q9 ? parseFloat(responses.q9) : null
            }
          });

          await tx.familyMemberProfile.create({
            data: {
              familyMemberId: familyMember.id,
              healthGoals: Array.isArray(responses.q11) ? responses.q11 : [],
              timeline: responses.q12,
              priority: responses.q13,
              pastDietStruggles: responses.q14,
              motivationLevel: parseInt(responses.q15) || null,
              medicalConditions: Array.isArray(responses.q17) ? responses.q17 : [],
              familyHistory: Array.isArray(responses.q18) ? responses.q18 : [],
              medications: responses.q19 === 'yes',
              hormonalConcerns: Array.isArray(responses.q20) ? responses.q20 : [],
              currentSymptoms: Array.isArray(responses.q21) ? responses.q21 : [],
              allergies: Array.isArray(responses.q23) ? responses.q23 : [],
              intolerances: Array.isArray(responses.q24) ? responses.q24 : [],
              dietType: responses.q25,
              eatsRedMeat: responses.q26,
              eatsPoultry: responses.q27,
              eatsSeafood: responses.q28,
              religiousDietaryRestrictions: Array.isArray(responses.q29) ? responses.q29 : [],
              favoriteCuisines: Array.isArray(responses.q30) ? responses.q30 : [],
              dislikedCuisines: Array.isArray(responses.q31) ? responses.q31 : [],
              spicePreference: responses.q32,
              foodsToAvoid: responses.q33 ? [responses.q33] : [],
              foodsToInclude: responses.q34 ? [responses.q34] : [],
              wantsDesserts: responses.q35,
              coffeeTea: responses.q36,
              alcoholFrequency: responses.q37,
              cravingType: responses.q38,
              sleepHours: responses.q39,
              waterIntake: responses.q40,
              activityLevel: responses.q41,
              hasWorkoutRoutine: responses.q42 === 'yes',
              workoutDaysPerWeek: responses.q43 ? parseInt(responses.q43) : null,
              workoutType: responses.q44,
              workoutDuration: responses.q45,
              syncWithTraining: responses.q46 === 'yes'
            }
          });
        }
      }

      await tx.user.update({
        where: { id: user.id },
        data: {
          questionnaireCompleted: true,
          accountType
        }
      });

      const assignedCookbookSlugs = assignCookbooksBasedOnPreferences(
        primaryResponses,
        familyMembers || []
      );

      for (const cookbookSlug of assignedCookbookSlugs) {
        const cookbookData = cookbooksData.find(cb => cb.slug === cookbookSlug);
        if (!cookbookData) continue;

        let cookbook = await tx.cookbook.findUnique({
          where: { slug: cookbookSlug }
        });

        if (!cookbook) {
          cookbook = await tx.cookbook.create({
            data: {
              name: cookbookData.name,
              slug: cookbookData.slug,
              theme: cookbookData.theme,
              description: cookbookData.description,
              category: cookbookData.category,
              tags: cookbookData.tags,
              isPremium: cookbookData.isPremium,
              featured: cookbookData.featured,
              mealCount: cookbookData.mealCount
            }
          });
        }

        await tx.userCookbookAccess.upsert({
          where: {
            userId_cookbookId: {
              userId: user.id,
              cookbookId: cookbook.id
            }
          },
          update: {},
          create: {
            userId: user.id,
            cookbookId: cookbook.id
          }
        });
      }
    });

    const assignedCookbookSlugs = assignCookbooksBasedOnPreferences(
      primaryResponses,
      familyMembers || []
    );
    const assignedCookbookDetails = getCookbookDetails(assignedCookbookSlugs);

    return res.status(200).json({ 
      success: true, 
      message: 'Questionnaire saved successfully',
      assignedCookbooks: assignedCookbookDetails
    });

  } catch (error) {
    console.error('Error saving questionnaire:', error);
    return res.status(500).json({ 
      error: 'Failed to save questionnaire', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  } finally {
    await prisma.$disconnect();
  }
}
