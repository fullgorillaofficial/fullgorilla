import { useState, useEffect } from 'react';
import { questionnaireConfig, Question } from '../data/questionnaireConfig';
import { useSession } from 'next-auth/react';

interface QuestionnaireFormProps {
  onComplete: (data: any) => void;
}

interface FamilyMember {
  id: string;
  name: string;
  responses: Record<string, any>;
}

export default function QuestionnaireForm({ onComplete }: QuestionnaireFormProps) {
  const { data: session } = useSession();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [primaryResponses, setPrimaryResponses] = useState<Record<string, any>>({});
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState<any>('');
  const [error, setError] = useState('');
  
  const getCurrentResponses = () => {
    if (currentMemberIndex >= 0 && familyMembers.length > 0) {
      return familyMembers[currentMemberIndex].responses;
    }
    return primaryResponses;
  };

  const shouldSkipQuestion = (question: Question, responses: Record<string, any>): boolean => {
    if (!question.skipIf) return false;
    return question.skipIf(responses);
  };

  const getVisibleQuestions = (): Question[] => {
    const accountType = primaryResponses.q1 || 'individual';
    const responses = getCurrentResponses();
    
    return questionnaireConfig.filter((q) => {
      if (shouldSkipQuestion(q, responses)) {
        return false;
      }

      if (currentMemberIndex >= 0 && q.appliesTo === 'family-member') {
        return true;
      }
      
      if (currentMemberIndex >= 0 && q.appliesTo === 'all') {
        return true;
      }

      if (currentMemberIndex < 0 && (q.appliesTo === 'primary' || q.appliesTo === 'all')) {
        return true;
      }

      return false;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const totalQuestions = visibleQuestions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    const savedValue = getCurrentResponses()[currentQuestion?.id];
    if (savedValue !== undefined) {
      setCurrentAnswer(savedValue);
    } else {
      setCurrentAnswer(currentQuestion?.type === 'checkbox' ? [] : '');
    }
  }, [currentQuestionIndex, currentMemberIndex]);

  const handleAnswerChange = (value: any) => {
    setCurrentAnswer(value);
    setError('');
  };

  const saveAnswer = () => {
    if (currentMemberIndex >= 0) {
      const updatedMembers = [...familyMembers];
      updatedMembers[currentMemberIndex].responses[currentQuestion.id] = currentAnswer;
      setFamilyMembers(updatedMembers);
    } else {
      setPrimaryResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: currentAnswer
      }));
    }
  };

  const validateAnswer = (): boolean => {
    if (currentQuestion.required) {
      if (currentQuestion.type === 'checkbox') {
        const selectedCount = Array.isArray(currentAnswer) ? currentAnswer.length : 0;
        if (selectedCount === 0) {
          setError('Please select at least one option');
          return false;
        }
        if (currentQuestion.maxSelections && selectedCount > currentQuestion.maxSelections) {
          setError(`Please select no more than ${currentQuestion.maxSelections} options`);
          return false;
        }
      } else if (!currentAnswer && currentAnswer !== 0 && currentAnswer !== false) {
        setError('This question is required');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateAnswer()) {
      return;
    }

    saveAnswer();

    if (currentQuestion.id === 'q3' && primaryResponses.q1 !== 'individual') {
      const numPeople = parseInt(primaryResponses.q2 || '2');
      const names = Array.isArray(currentAnswer) ? currentAnswer : [];
      
      const members: FamilyMember[] = [];
      for (let i = 0; i < numPeople; i++) {
        members.push({
          id: `member-${i}`,
          name: names[i] || `Person ${i + 1}`,
          responses: {}
        });
      }
      setFamilyMembers(members);
      setCurrentMemberIndex(0);
      setCurrentQuestionIndex(0);
      return;
    }

    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentMemberIndex >= 0 && currentMemberIndex < familyMembers.length - 1) {
        setCurrentMemberIndex(currentMemberIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        onComplete({
          primaryResponses,
          familyMembers
        });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      saveAnswer();
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentMemberIndex > 0) {
      setCurrentMemberIndex(currentMemberIndex - 1);
      setCurrentQuestionIndex(visibleQuestions.length - 1);
    } else if (currentMemberIndex === 0) {
      setCurrentMemberIndex(-1);
      const primaryQuestions = questionnaireConfig.filter(q => 
        q.appliesTo === 'primary' || (q.appliesTo === 'all' && q.id.match(/^q[1-3]$/))
      );
      setCurrentQuestionIndex(primaryQuestions.length - 1);
    }
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="option-group" style={{ display: 'block', width: '100%' }}>
            {currentQuestion.options?.map((option) => (
              <label 
                key={option.value} 
                className="option-label"
                style={{ 
                  display: 'flex', 
                  width: '100%', 
                  marginBottom: '20px',
                  alignItems: 'center',
                  padding: '28px 32px',
                  border: '3px solid #e0e0e0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: '#f9f9f9'
                }}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  style={{ 
                    marginRight: '20px', 
                    width: '28px', 
                    height: '28px',
                    accentColor: '#00ff88'
                  }}
                />
                <span style={{ fontSize: '22px', fontWeight: '500' }}>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="option-group" style={{ display: 'block', width: '100%' }}>
            {currentQuestion.maxSelections && (
              <p className="selection-hint">Select up to {currentQuestion.maxSelections} options</p>
            )}
            {currentQuestion.options?.map((option) => (
              <label 
                key={option.value} 
                className="option-label"
                style={{ 
                  display: 'flex', 
                  width: '100%', 
                  marginBottom: '20px',
                  alignItems: 'center',
                  padding: '28px 32px',
                  border: '3px solid #e0e0e0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: '#f9f9f9'
                }}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (e.target.checked) {
                      handleAnswerChange([...current, value]);
                    } else {
                      handleAnswerChange(current.filter((v: string) => v !== value));
                    }
                  }}
                  style={{ 
                    marginRight: '20px', 
                    width: '28px', 
                    height: '28px',
                    accentColor: '#00ff88'
                  }}
                />
                <span style={{ fontSize: '22px', fontWeight: '500' }}>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'text':
        if (currentQuestion.id === 'q3' && primaryResponses.q1 !== 'individual') {
          const numPeople = parseInt(primaryResponses.q2 || '2');
          const names = Array.isArray(currentAnswer) ? currentAnswer : [];
          
          return (
            <div className="name-inputs-container">
              {Array.from({ length: numPeople }, (_, i) => (
                <div key={i} className="name-input-wrapper">
                  <label className="name-label">Person {i + 1}</label>
                  <input
                    type="text"
                    className="text-input"
                    value={names[i] || ''}
                    onChange={(e) => {
                      const newNames = [...names];
                      newNames[i] = e.target.value;
                      handleAnswerChange(newNames);
                    }}
                    placeholder={`Enter name for Person ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          );
        }
        
        return (
          <input
            type="text"
            className="text-input"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className="number-input"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswerChange(e.target.value ? parseInt(e.target.value) : '')}
            min={currentQuestion.min}
            max={currentQuestion.max}
            placeholder={currentQuestion.placeholder}
          />
        );

      case 'height':
        return (
          <div className="height-input-group">
            <div className="height-field">
              <label>Feet</label>
              <select
                value={currentAnswer?.feet || ''}
                onChange={(e) =>
                  handleAnswerChange({ ...currentAnswer, feet: parseInt(e.target.value) || '' })
                }
              >
                <option value="">-</option>
                {[4, 5, 6, 7].map((ft) => (
                  <option key={ft} value={ft}>
                    {ft}
                  </option>
                ))}
              </select>
            </div>
            <div className="height-field">
              <label>Inches</label>
              <select
                value={currentAnswer?.inches || ''}
                onChange={(e) =>
                  handleAnswerChange({ ...currentAnswer, inches: parseInt(e.target.value) || '' })
                }
              >
                <option value="">-</option>
                {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                  <option key={inch} value={inch}>
                    {inch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'slider':
        return (
          <div className="slider-container">
            <input
              type="range"
              className="slider"
              min={currentQuestion.min || 1}
              max={currentQuestion.max || 10}
              value={currentAnswer || currentQuestion.min || 1}
              onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
            />
            <div className="slider-value">{currentAnswer || currentQuestion.min || 1}</div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const currentMemberName =
    currentMemberIndex >= 0 && familyMembers.length > 0
      ? familyMembers[currentMemberIndex].name
      : session?.user?.name || 'you';

  const questionText = currentQuestion.text.replace('[Name]', currentMemberName);

  return (
    <div className="questionnaire-form">
      <div className="progress-section">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="progress-text">
          Question {currentQuestionIndex + 1} of {totalQuestions}
          {currentMemberIndex >= 0 && ` • ${currentMemberName}'s Profile`}
        </p>
      </div>

      <div className="question-content">
        <div className="question-section-label">{currentQuestion.section}</div>
        <h2 className="question-text">{questionText}</h2>

        <div className="answer-section">{renderQuestionInput()}</div>

        {error && <div className="error-message">{error}</div>}

        <div className="navigation-buttons">
          <button
            className="btn-secondary"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 && currentMemberIndex < 0}
          >
            ← Back
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {currentQuestionIndex === visibleQuestions.length - 1 &&
            (currentMemberIndex < 0 || currentMemberIndex === familyMembers.length - 1)
              ? 'Complete'
              : 'Next →'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .questionnaire-form {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .progress-section {
          margin-bottom: 50px;
        }

        .progress-bar-container {
          width: 100%;
          height: 12px;
          background: #2d2d2d;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .progress-bar {
          height: 100%;
          background: #00ff88;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 20px;
          color: #e0e0e0;
          text-align: center;
          font-weight: 600;
        }

        .question-content {
          background: white;
          padding: 60px 50px;
          border-radius: 20px;
          border: 3px solid #00ff88;
          box-shadow: 0 8px 30px rgba(0, 255, 136, 0.2);
        }

        .question-section-label {
          font-size: 16px;
          font-weight: 800;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .question-text {
          font-size: 32px;
          color: #1a1a1a;
          margin-bottom: 45px;
          line-height: 1.5;
          font-weight: 800;
        }

        .answer-section {
          margin-bottom: 40px;
        }

        .option-group {
          display: block !important;
          width: 100%;
        }

        .option-label {
          display: flex !important;
          align-items: center;
          width: 100% !important;
          padding: 28px 32px;
          border: 3px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background: #f9f9f9;
          margin-bottom: 20px;
        }

        .option-label:hover {
          border-color: #00ff88;
          background: #f0fff9;
          transform: translateX(5px);
        }

        .option-label input {
          margin-right: 20px;
          width: 28px;
          height: 28px;
          cursor: pointer;
          accent-color: #00ff88;
          flex-shrink: 0;
        }

        .option-label span {
          font-size: 22px;
          color: #1a1a1a;
          font-weight: 500;
          line-height: 1.6;
        }

        .selection-hint {
          font-size: 18px;
          color: #00ff88;
          margin-bottom: 15px;
          font-weight: 700;
          font-style: italic;
        }

        .text-input,
        .number-input {
          width: 100% !important;
          padding: 32px 36px !important;
          font-size: 26px !important;
          border: 3px solid #e0e0e0;
          border-radius: 12px;
          transition: border-color 0.2s;
          background: #f9f9f9;
          box-sizing: border-box;
        }

        .text-input:focus,
        .number-input:focus {
          outline: none;
          border-color: #00ff88;
          background: white;
        }

        .height-input-group {
          display: flex;
          gap: 30px;
        }

        .height-field {
          flex: 1;
        }

        .height-field label {
          display: block;
          font-size: 20px;
          color: #1a1a1a;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .height-field select {
          width: 100% !important;
          padding: 32px 24px !important;
          font-size: 26px !important;
          border: 3px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          background: #f9f9f9;
          box-sizing: border-box;
        }

        .height-field select:focus {
          outline: none;
          border-color: #00ff88;
          background: white;
        }

        .name-inputs-container {
          width: 100%;
        }

        .name-input-wrapper {
          margin-bottom: 28px;
        }

        .name-label {
          display: block;
          font-size: 22px;
          color: #1a1a1a;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .slider-container {
          text-align: center;
          padding: 30px;
        }

        .slider {
          width: 100%;
          height: 12px;
          border-radius: 5px;
          outline: none;
          margin-bottom: 25px;
          cursor: pointer;
          accent-color: #00ff88;
        }

        .slider-value {
          font-size: 56px;
          font-weight: 900;
          color: #00ff88;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          font-size: 18px;
          border: 2px solid #fcc;
          font-weight: 600;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 50px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 800;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-transform: uppercase;
        }

        .btn-primary {
          background: #00ff88;
          color: #1a1a1a;
          flex: 1;
        }

        .btn-primary:hover {
          background: #00cc6a;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 255, 136, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #1a1a1a;
          border: 3px solid #1a1a1a;
          padding: 17px 40px;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #1a1a1a;
          color: white;
        }

        .btn-secondary:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .question-content {
            padding: 40px 30px;
          }

          .question-text {
            font-size: 26px;
          }

          .option-label span {
            font-size: 18px;
          }

          .navigation-buttons {
            flex-direction: column-reverse;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
