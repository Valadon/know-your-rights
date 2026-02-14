'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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

interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  correct: boolean;
}

interface QuizClientProps {
  scenarios: Scenario[];
}

// Confetti colors
const CONFETTI_COLORS = ['#6366f1', '#a855f7', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6'];

// Generate quiz questions from scenario data
function generateQuestions(scenarios: Scenario[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let id = 0;

  scenarios.forEach((scenario) => {
    scenario.rights.forEach((right: Right) => {
      const question = createQuestionFromRight(right, scenario, id);
      if (question) {
        questions.push(question);
        id++;
      }
    });
  });

  return shuffleArray(questions).slice(0, 10);
}

function createQuestionFromRight(right: Right, scenario: Scenario, id: number): QuizQuestion | null {
  const lowerDesc = right.description.toLowerCase();
  const lowerTitle = right.title.toLowerCase();

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
  
  if (lowerTitle.includes('encrypt')) {
    return {
      id,
      question: `Can the government force you to decrypt your devices or provide passwords?`,
      options: [
        'Yes, always',
        'No, never',
        'Generally requires a warrant',
        'Only for terrorism cases'
      ],
      correctAnswer: 2,
      explanation: `${right.description}`,
      source: right.source,
      scenarioId: scenario.id,
    };
  }
  
  if (lowerDesc.includes('carpenter') || lowerTitle.includes('digital')) {
    return {
      id,
      question: `Under Carpenter v. US, what do police need to access your historical cell phone location data?`,
      options: [
        'Just a subpoena',
        'Your consent only',
        'A warrant based on probable cause',
        'Nothing, this data is always accessible'
      ],
      correctAnswer: 2,
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

function getGradeLetter(percentage: number) {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

function getScoreTone(percentage: number) {
  if (percentage >= 80) return 'var(--success)';
  if (percentage >= 60) return 'var(--warning)';
  return 'var(--danger)';
}

// Confetti component
function Confetti() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (reduce) return;
    }

    const pieces: HTMLDivElement[] = [];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDelay = `${Math.random() * 1.5}s`;
      piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      piece.style.width = `${6 + Math.random() * 6}px`;
      piece.style.height = `${6 + Math.random() * 6}px`;
      document.body.appendChild(piece);
      pieces.push(piece);
    }

    const cleanup = () => {
      pieces.forEach(piece => piece.remove());
    };

    setTimeout(cleanup, 5000);
    return cleanup;
  }, []);

  return null;
}

// Timer component
function QuestionTimer({ isActive }: { isActive: boolean }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-1 text-sm text-[var(--muted)] ${elapsed > 30 ? 'timer-pulse text-[var(--warning)]' : ''}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formatTime(elapsed)}</span>
    </div>
  );
}

export default function QuizClient({ scenarios }: QuizClientProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const questionRef = useRef<HTMLDivElement>(null);
  const confettiBurst = confettiKey > 0 ? <Confetti key={confettiKey} /> : null;

  // Initialize quiz
  useEffect(() => {
    const generatedQuestions = generateQuestions(scenarios);
    setQuestions(generatedQuestions);
  }, [scenarios]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setConfettiKey(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, { 
      questionId: questions[currentQuestion].id, 
      selectedAnswer: answerIndex,
      correct: isCorrect 
    }]);
    
    // ARIA announcement
    setAnnouncement(isCorrect ? 'Correct! ' + questions[currentQuestion].explanation : 'Incorrect. ' + questions[currentQuestion].explanation);
    
    setShowExplanation(true);
  }, [currentQuestion, questions, selectedAnswer]);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setSlideDirection('left');
      
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setSlideDirection('right');
        
        setTimeout(() => {
          setSlideDirection(null);
        }, 400);
      }, 200);
    } else {
      const percentage = Math.round((score / questions.length) * 100);

      if (percentage >= 80) {
        setConfettiKey(prev => prev + 1);
      }

      setQuizCompleted(true);
    }
  }, [currentQuestion, questions.length, questions, score, selectedAnswer]);

  const handleRestart = useCallback(() => {
    const newQuestions = generateQuestions(scenarios);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setShareStatus('idle');
    setConfettiKey(0);
    setAnnouncement('');
  }, [scenarios]);

  const handleShareScore = useCallback(async () => {
    const percentage = Math.round((score / questions.length) * 100);
    const shareText = `I scored ${score}/${questions.length} (${percentage}%) on Know Your Rights! 🏛️\n\nTest your knowledge: ${window.location.origin}/quiz`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch (err) {
      // Fallback
    }
  }, [score, questions.length]);

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
    const wrongAnswers = answers.filter(a => !a.correct);
    const grade = getGradeLetter(percentage);
    const ringColor = getScoreTone(percentage);
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (percentage / 100) * circumference;
    
    return (
      <>
        {confettiBurst}
        <div className="animate-fade-in">
          {/* Results Summary Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8 mb-6">
            <div className="text-center mb-6">
              <div className="mb-4 flex flex-col items-center gap-3">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="var(--card-border)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke={ringColor}
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      transform="rotate(-90 70 70)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--foreground)]">{grade}</span>
                    <span className="text-xs text-[var(--muted)]">Grade</span>
                  </div>
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  Score Gauge
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
                Quiz Complete!
              </h2>            
              <p className="text-lg text-[var(--muted)]">
                You scored <span className="font-bold text-[var(--accent)]">{score}</span> out of <span className="font-bold">{questions.length}</span>
                <span className="ml-2 text-sm text-[var(--muted)]">(Grade {grade})</span>
              </p>
              
              {percentage >= 80 && (
                <p className="text-[var(--success)] font-medium mt-2 animate-fade-in">
                  🎉 Excellent work! You really know your rights!
                </p>
              )}
            </div>
            
            {/* Score Percentage and Visual Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[var(--muted)]">Your Score</span>
                <span className="font-bold text-[var(--foreground)]">{percentage}%</span>
              </div>            
              <div className="h-4 bg-[var(--card-border)] rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    percentage >= 80 ? 'bg-[var(--success)]' : percentage >= 60 ? 'bg-[var(--warning)]' : 'bg-[var(--danger)]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>            
              <p className="text-center text-[var(--muted)] mt-4">
                {percentage >= 80 
                  ? "Excellent! You have a strong understanding of your legal rights." 
                  : percentage >= 60 
                    ? "Good job! You know the basics, but there's more to learn." 
                    : "Keep studying! Understanding your rights is important."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShareScore}
                className="px-6 py-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl font-medium hover:bg-[var(--accent)]/20 transition-colors flex items-center gap-2"
              >
                {shareStatus === 'copied' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Score
                  </>
                )}
              </button>            
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>

          {/* Wrong Answers Review */}
          {wrongAnswers.length > 0 && (
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Review: Questions You Missed
              </h3>            
              
              <div className="space-y-4">
                {wrongAnswers.map((wrongAnswer, index) => {
                  const question = questions.find(q => q.id === wrongAnswer.questionId);
                  if (!question) return null;
                  
                  return (
                    <div key={index} className="p-4 rounded-xl bg-[var(--danger)]/5 border border-[var(--danger)]/20">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--danger)]/20 flex items-center justify-center text-sm font-bold text-[var(--danger)]">
                          {answers.findIndex(a => a.questionId === wrongAnswer.questionId) + 1}
                        </span>                      
                        <div className="flex-1">
                          <p className="text-[var(--foreground)] font-medium mb-2">{question.question}</p>                        
                          <div className="space-y-1 text-sm">
                            <p className="text-[var(--danger)]">
                              <span className="font-semibold">Your answer:</span> {question.options[wrongAnswer.selectedAnswer]}
                            </p>                          
                            <p className="text-[var(--success)]">
                              <span className="font-semibold">Correct answer:</span> {question.options[question.correctAnswer]}
                            </p>                        </div>                        
                          <div className="mt-3 p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
                            <p className="text-sm text-[var(--muted)]">
                              <span className="font-semibold text-[var(--accent)]">Explanation: </span>
                              {question.explanation}
                            </p>                          
                            <p className="text-xs text-[var(--muted)] mt-2">Source: {question.source}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];

  return (
    <>
      {/* ARIA live region for announcements */}
      <div 
        className="aria-live-region" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcement}
      </div>

      {confettiBurst}

      <div className="animate-fade-in">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[var(--muted)]">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex items-center gap-4">
              <span className="text-[var(--muted)]">Score: <span className="font-medium text-[var(--accent)]">{score}</span></span>
              <QuestionTimer isActive={!showExplanation} />
            </div>
          </div>        
          
          {/* Progress bar container */}
          <div className="h-3 bg-[var(--card-border)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          {/* Question dots */}
          <div className="flex items-center justify-between mt-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < currentQuestion 
                    ? 'bg-[var(--success)]' 
                    : idx === currentQuestion 
                      ? 'bg-[var(--accent)] scale-125' 
                      : 'bg-[var(--card-border)]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card with slide transition */}
        <div 
          ref={questionRef}
          className={`bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all duration-500 ${
            slideDirection === 'left' ? 'quiz-slide-left' : 
            slideDirection === 'right' ? 'quiz-slide-right' : ''
          }`}
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3" role="radiogroup" aria-label="Answer options">
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
                  buttonClass += 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--foreground)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 focus-visible:ring-2 focus-visible:ring-[var(--accent)]';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
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
                  className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  aria-label={currentQuestion < questions.length - 1 ? 'Next question' : 'See results'}
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
    </>
  );
}
