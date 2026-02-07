import { getAllScenarios, getDisclaimer, getAllStates } from "@/data/rightsLoader";
import { ScenarioCard, SearchBar, Disclaimer } from "@/components";
import Link from "next/link";

export default function Home() {
  const scenarios = getAllScenarios();
  const disclaimer = getDisclaimer();
  const states = getAllStates();

  return (
    <div className="min-h-screen"
    >
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden"
    >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-transparent animate-gradient" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 sm:pb-12"
    >
          <div className="text-center max-w-3xl mx-auto animate-fade-in"
    >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6"
    >
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"
    ></span>
              <span className="text-sm font-medium text-[var(--accent-light)]"
    >Legal Rights Guide</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
    >
              <span className="gradient-text"
    >Know Your Rights</span>
              <br />
              <span className="text-[var(--foreground)]"
    >Protect Yourself</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto leading-relaxed"
    >
              An interactive guide to understanding your legal rights in common situations. 
              Knowledge is power — learn what protections you have under the law.
            </p>

            {/* Search bar */}
            <div className="flex justify-center mb-4"
    >
              <SearchBar scenarios={scenarios} />
            </div>
            
            <p className="text-xs text-[var(--muted)]"
    >
              {states.length}+ states with specific variations • {scenarios.length} scenarios covered
            </p>
          </div>
        </div>
      </section>

      {/* Scenarios Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
        <div className="flex items-center justify-between mb-6"
    >
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]"
    >
            Legal Scenarios
          </h2>
          <span className="text-sm text-[var(--muted)]"
    >
            {scenarios.length} topics
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
          {scenarios.map((scenario, index) => (
            <ScenarioCard key={scenario.id} scenario={scenario} index={index} />
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
          {/* Quiz Card */}
          <Link href="/quiz" className="group">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] h-full transition-all duration-300 hover:border-[var(--accent)]/50 card-hover">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">Quiz Yourself</h3>
              <p className="text-sm text-[var(--muted)]">
                Test your knowledge with our interactive quiz on legal rights.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Start Quiz</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] card-hover">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">State-Specific</h3>
            <p className="text-sm text-[var(--muted)]">
              See how your rights vary by state. Select your location for tailored information.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] card-hover">
            <div className="w-12 h-12 rounded-xl bg-[var(--success)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Legally Sourced</h3>
            <p className="text-sm text-[var(--muted)]">
              All rights information includes legal sources: Constitutional amendments, federal and state laws.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] card-hover">
            <div className="w-12 h-12 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Educational Only</h3>
            <p className="text-sm text-[var(--muted)]">
              This is an educational resource. For legal advice, consult a licensed attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <Disclaimer text={disclaimer} />
    </div>
  );
}
