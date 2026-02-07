'use client';

import { useState, useCallback, useEffect } from 'react';
import { Scenario, Right } from '@/types';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
  scenarioId: string;
}

interface QuizClientProps {
  scenarios: Scenario[];
}

// Generate quiz questions from scenario data
function generateQuestions(scenarios: Scenario[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let id = 0;

  scenarios.forEach((scenario) => {
    scenario.rights.forEach((right: Right) => {
      // Only generate questions for rights with clear true/false or fact-based answers
      const question = createQuestionFromRight(right, scenario, id);
      if (question) {
        questions.push(question);
        id++;
      }
    });
  });

  // Shuffle and return 10 questions max
  return shuffleArray(questions).slice(0, 10);
}

function createQuestionFromRight(right: Right, scenario: Scenario, id: number): QuizQuestion | null {
  const lowerDesc = right.description.toLowerCase();
  const lowerTitle = right.title.toLowerCase();

  // Pattern 1: Right to remain silent questions
  if (lowerTitle.includes('remain silent') || lowerDesc.includes('remain silent')) {
    return {
      id,
      question: `True or False: ${right.title} means you don't have to answer any questions from police, including providing identification.`,
      options: ['True', 'False', 'It depends on the state'],
      correctAnswer: 2,
      explanation: `While you have the right to remain silent about most questions, some states are "stop-and-identify" states where you must provide your name and ID. However, you generally don't have to answer other questions. ${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 2: Search consent questions
  if (lowerTitle.includes('search') || lowerDesc.includes('search')) {
    return {
      id,
      question: `Can police search your property without your consent?`,
      options: [
        'Yes, police can search anytime they want',
        'No, police always need a warrant',
        'Police need a warrant, consent, or probable cause',
        'Only with a warrant'
      ],
      correctAnswer: 2,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 3: Recording police
  if (lowerTitle.includes('record') || lowerDesc.includes('record')) {
    return {
      id,
      question: `Is it legal to record police officers in public?`,
      options: [
        'No, it is illegal everywhere',
        'Yes, but only with their permission',
        'Yes, it is protected by the First Amendment',
        'Only in certain states'
      ],
      correctAnswer: 2,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 4: Discrimination
  if (lowerTitle.includes('discrimination') || lowerDesc.includes('discrimination')) {
    return {
      id,
      question: `Which of the following is NOT a protected class under federal anti-discrimination law?`,
      options: [
        'Race and color',
        'Religion and national origin',
        'Political affiliation',
        'Sex and pregnancy'
      ],
      correctAnswer: 2,
      explanation: `${right.description} Political affiliation is not a federally protected class, though some states may offer additional protections.`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 5: Warrant requirements
  if (lowerDesc.includes('warrant')) {
    return {
      id,
      question: `What type of warrant do federal agents need to enter your home?`,
      options: [
        'An administrative warrant from their agency',
        'A judicial warrant signed by a judge',
        'Any written document that says "warrant"',
        'No warrant needed for federal agents'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 6: Attorney rights
  if (lowerTitle.includes('attorney') || lowerDesc.includes('lawyer')) {
    return {
      id,
      question: `What happens if you request an attorney during police questioning?`,
      options: [
        'Police can continue asking questions',
        'Police must stop questioning you',
        'You must answer basic questions first',
        'It depends on the severity of the crime'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 7: Landlord entry
  if (lowerTitle.includes('entry') || lowerTitle.includes('notice')) {
    return {
      id,
      question: `How much notice must a landlord typically give before entering a rental property?`,
      options: [
        'No notice required',
        '24-48 hours in most states',
        '1 week minimum',
        'Only verbal notice is required'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 8: Security deposits
  if (lowerTitle.includes('security deposit') || lowerDesc.includes('security deposit')) {
    return {
      id,
      question: `How long does a landlord typically have to return a security deposit?`,
      options: [
        'Immediately upon move-out',
        '14-30 days depending on the state',
        'Up to 6 months',
        'There is no legal requirement'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 9: Whistleblower
  if (lowerTitle.includes('whistleblower') || lowerDesc.includes('whistleblower')) {
    return {
      id,
      question: `Are you protected if you report illegal activity by your employer?`,
      options: [
        'No, you can be fired for any reason',
        'Yes, whistleblowers have legal protections',
        'Only if you report to the media first',
        'Only for certain types of violations'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 10: Unemployment
  if (lowerTitle.includes('unemployment')) {
    return {
      id,
      question: `If you are fired without cause, can you apply for unemployment benefits?`,
      options: [
        'No, only if you quit voluntarily',
        'Yes, if fired without cause',
        'Only after 6 months',
        'Only in certain states'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 11: Protesting
  if (lowerTitle.includes('protest') || lowerDesc.includes('protest')) {
    return {
      id,
      question: `Do you need a permit to protest on public sidewalks?`,
      options: [
        'Yes, always',
        'No, permits are never required',
        'Usually not for small groups on sidewalks',
        'Only on weekends'
      ],
      correctAnswer: 2,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 12: Debt collection
  if (lowerTitle.includes('debt') || lowerDesc.includes('debt collector')) {
    return {
      id,
      question: `Can debt collectors call you at any time of day?`,
      options: [
        'Yes, they can call 24/7',
        'No, they cannot call before 8 AM or after 9 PM',
        'Only on weekdays',
        'Only if you owe more than $1,000'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 13: Jury duty retaliation
  if (lowerTitle.includes('jury') && lowerDesc.includes('employer')) {
    return {
      id,
      question: `Can your employer fire you for serving jury duty?`,
      options: [
        'Yes, if you miss too much work',
        'No, employers cannot retaliate for jury service',
        'Only if they give 2 weeks notice',
        'It depends on the state'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 14: COBRA
  if (lowerTitle.includes('cobra') || lowerDesc.includes('health insurance')) {
    return {
      id,
      question: `After being terminated, how long can you continue health insurance under COBRA?`,
      options: [
        '30 days',
        'Up to 18 months',
        '1 year',
        'There is no continuation option'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 15: Retaliation
  if (lowerTitle.includes('retaliation')) {
    return {
      id,
      question: `Is retaliation against employees who report illegal activity illegal?`,
      options: [
        'Yes, retaliation is prohibited',
        'No, employers can retaliate freely',
        'Only in certain industries',
        'Only if the report was proven true'
      ],
      correctAnswer: 0,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  // Pattern 16: Fair housing
  if (lowerTitle.includes('fair housing')) {
    return {
      id,
      question: `Can a landlord refuse to rent to someone based on their familial status?`,
      options: [
        'Yes, landlords have full discretion',
        'No, familial status is a protected class',
        'Only if there are too many children',
        'Only in single-family homes'
      ],
      correctAnswer: 1,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }

  return null;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function QuizClient({ scenarios }: QuizClientProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialize quiz
  useEffect(() => {
    const generatedQuestions = generateQuestions(scenarios);
    setQuestions(generatedQuestions);
  }, [scenarios]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, { questionId: questions[currentQuestion].id, correct: isCorrect }]);
    setShowExplanation(true);
  }, [currentQuestion, questions, selectedAnswer]);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion, questions.length]);

  const handleRestart = useCallback(() => {
    const newQuestions = generateQuestions(scenarios);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  }, [scenarios]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--muted)]">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="animate-fade-in">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center">
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="w-20 h-20 rounded-full bg-[var(--success)]/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : percentage >= 60 ? (
              <div className="w-20 h-20 rounded-full bg-[var(--warning)]/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[var(--danger)]/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[var(--danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-lg text-[var(--muted)] mb-6">
            You scored <span className="font-bold text-[var(--accent)]">{score}</span> out of <span className="font-bold">{questions.length}</span>
          </p>
          
          <div className="text-5xl font-bold gradient-text mb-6">
            {percentage}%
          </div>
          
          <p className="text-[var(--muted)] mb-8">
            {percentage >= 80 
              ? "Excellent! You have a strong understanding of your legal rights." 
              : percentage >= 60 
                ? "Good job! You know the basics, but there's more to learn." 
                : "Keep studying! Understanding your rights is important."}
          </p>

          {/* Question Review */}
          <div className="text-left mb-8 space-y-3">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Question Review:</h3>
            {answers.map((answer, index) => (
              <div 
                key={answer.questionId} 
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  answer.correct ? 'bg-[var(--success)]/10' : 'bg-[var(--danger)]/10'
                }`}
              >
                {answer.correct ? (
                  <svg className="w-5 h-5 text-[var(--success)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[var(--danger)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm text-[var(--foreground)]">Question {index + 1}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-[var(--muted)] mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-2 bg-[var(--card-border)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = selectedAnswer !== null;

              let buttonClass = 'w-full text-left p-4 rounded-xl border transition-all duration-200 ';
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += 'bg-[var(--success)]/10 border-[var(--success)] text-[var(--success)]';
                } else if (isSelected) {
                  buttonClass += 'bg-[var(--danger)]/10 border-[var(--danger)] text-[var(--danger)]';
                } else {
                  buttonClass += 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--muted)]';
                }
              } else {
                buttonClass += 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--foreground)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      showResult 
                        ? isCorrect 
                          ? 'bg-[var(--success)] text-white'
                          : isSelected
                            ? 'bg-[var(--danger)] text-white'
                            : 'bg-[var(--card-border)] text-[var(--muted)]'
                        : isSelected
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--card-border)] text-[var(--foreground)]'
                    }`}>
                      {showResult 
                        ? isCorrect 
                          ? '✓'
                          : isSelected
                            ? '✗'
                            : String.fromCharCode(65 + index)
                        : String.fromCharCode(65 + index)
                      }
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 animate-slide-down">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-[var(--foreground)] leading-relaxed">
                    <span className="font-semibold">Explanation: </span>
                    {question.explanation}
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-2">
                    Source: {question.source}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors flex items-center gap-2"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
