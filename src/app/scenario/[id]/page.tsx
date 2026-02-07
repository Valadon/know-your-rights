import { getScenarioById, getAllScenarios, getDisclaimer, getAllStates } from "@/data/rightsLoader";
import { Disclaimer, ScenarioClient } from "@/components";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ScenarioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const scenarios = getAllScenarios();
  return scenarios.map((scenario) => ({
    id: scenario.id,
  }));
}

export async function generateMetadata({ params }: ScenarioPageProps) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  
  if (!scenario) {
    return {
      title: 'Scenario Not Found',
    };
  }
  
  return {
    title: `${scenario.title} | Know Your Rights`,
    description: scenario.description,
  };
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { id } = await params;
  
  const scenario = getScenarioById(id);
  
  if (!scenario) {
    notFound();
  }
  
  const disclaimer = getDisclaimer();
  const availableStates = getAllStates();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6 animate-fade-in no-print"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all scenarios
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6 animate-slide-up">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center text-5xl sm:text-6xl border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/10">
                {scenario.icon}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <span className="inline-block text-xs font-semibold text-[var(--accent-light)] bg-[var(--accent)]/10 px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {scenario.category}
              </span>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                {scenario.title}
              </h1>
              
              <p className="text-base sm:text-lg text-[var(--muted)] max-w-3xl">
                {scenario.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ScenarioClient 
          scenario={scenario}
          availableStates={availableStates}
        />
      </section>

      {/* Disclaimer */}
      <Disclaimer text={disclaimer} />
    </div>
  );
}
